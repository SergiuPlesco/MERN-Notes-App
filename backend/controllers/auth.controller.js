import crypto from "crypto";
import User from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js";

const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const emailExist = await User.findOne({ email });
		if (emailExist)
			return res.status(409).json({ success: "false", error: "Email already exists." });

		const usernameExist = await User.findOne({ username });
		if (usernameExist)
			return res.status(409).json({ success: "false", error: "Username already exists." });

		const user = await User.create({
			username,
			email,
			password,
		});

		sendToken(user, 201, res);
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ success: false, error: "Please provide email and password" });
	}
	try {
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(401).json({ success: false, error: "Invalid credentials." });
		}

		const isMatch = await user.matchPasswords(password);
		if (!isMatch) {
			return res.status(401).send({ success: false, error: "Invalid credentianls." });
		}

		sendToken(user, 200, res);
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

const forgotpassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ success: false, error: "Email could not be sent" });
		}
		const resetToken = user.getResetPasswordToken();
		await user.save();
		const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
		const message = `
			<h1>You have requested a password reset</h1>
			<p>Please go to this link to reset your password</p>
			<a href=${resetUrl} clicktracking=off>${resetUrl}</a>
		`;
		try {
			await sendEmail({
				to: user.email,
				subject: "Password Reset Request",
				text: message,
			});
			res.status(200).json({ success: true, data: "Email Sent" });
		} catch (error) {
			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;
			await user.save();
			return res.status(500).json({ success: false, error: `Email could not be sent, ${error}` });
		}
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

const resetpassword = async (req, res, next) => {
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.resetToken)
		.digest("hex");
	try {
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});
		if (!user) {
			return res.status(400).json({ success: false, error: "Invalid reset token." });
		}

		user.password = req.body.password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save();
		res.status(201).json({
			success: true,
			data: "Password Reset Success",
		});
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
};

const sendToken = (userWithPassword, statusCode, res) => {
	const token = userWithPassword.getSignedToken();
	const user = {
		notes: userWithPassword.notes,
		_id: userWithPassword._id,
		username: userWithPassword.username,
		email: userWithPassword.email,
	};
	res.status(statusCode).json({ success: true, token, user });
};

export default { register, login, forgotpassword, resetpassword };
