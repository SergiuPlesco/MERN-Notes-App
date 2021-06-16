// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import express from "express";
// const path = require("path");
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.resolve("frontend/build")));
console.log("static path", path.resolve("frontend/build"));

app.get("*", (req, res) => {
	res.sendFile(path.resolve("frontend", "build", "index.html"));
});
console.log("get all path", path.resolve("frontend", "build", "index.html"));
// } else {
// 	app.get("/", (req, res) => {
// 		res.send("api running.");
// 	});
// }

app.listen(process.env.PORT || 3001, () => {
	console.log(`App listening on PORT: ${PORT}`);
});
