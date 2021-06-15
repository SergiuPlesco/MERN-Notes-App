import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import mongoose from "mongoose";

const dbURL = process.env.dbURL;

const connectDB = async () => {
	await mongoose.connect(dbURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});
	console.log("Connected to db");
};

export default connectDB;
