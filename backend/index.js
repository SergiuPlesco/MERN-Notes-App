import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import express from "express";
import path from "path";
import NoteRoutes from "./routes/note.routes.js";
import AuthRoutes from "./routes/auth.routes.js";

import connectDB from "../backend/config/db.config.js";
import errorHandler from "./middleware/error.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors());

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(AuthRoutes);
app.use(NoteRoutes);

app.use((req, res) => {
	res.status(404).send("page not found");
});

// Error Handler (Should be lat piece of middleware)
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("api running");
	});
}

app.listen(PORT, () => {
	console.log(`App listen on PORT: ${PORT}`);
});
