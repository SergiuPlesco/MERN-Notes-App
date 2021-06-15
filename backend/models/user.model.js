import bcrypt from "bcryptjs";
import crypto from "crypto";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: [true, "Please provide a username"],
	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
		unique: true,
		match: [
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide a valid email",
		],
	},
	password: {
		type: String,
		required: [true, "Please add a password"],
		minlength: 6,
		select: false,
	},
	notes: [
		{
			type: Schema.Types.ObjectId,
			ref: "Note",
		},
	],
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});
// encrypt the password before saving to database
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});
// check passwords
UserSchema.methods.matchPasswords = async function (password) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

UserSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");
	this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

	this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // expire in 10 min

	return resetToken;
};

const User = mongoose.model("User", UserSchema);
export default User;
