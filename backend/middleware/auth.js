import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const protect = async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return res
			.status(401)
			.json({ success: false, error: "Not authorized to access this route. Log in or Register." });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);
		if (!user) {
			return res
				.status(401)
				.json({ success: false, error: "No user was found with this id. Log in or Register." });
		}
		req.user = user;
		next();
	} catch (error) {
		return res
			.status(401)
			.json({ success: false, error: "Not authorized to access this route. Log in or Register." });
	}
};

export default protect;
