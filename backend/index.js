// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import express from "express";
// const path = require("path");
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import serveStatic from "serve-static";
import NoteRoutes from "./routes/note.routes.js";
import AuthRoutes from "./routes/auth.routes.js";

import connectDB from "./config/db.config.js";
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

// app.use((req, res) => {
// 	res.status(404).send("ppppage not found");
// });

// Error Handler (Should be last piece of middleware)
app.use(errorHandler);

app.use(express.static(path.resolve(__dirname, "../frontend/build")));
console.log("static path", path.resolve(__dirname, "../frontend/build"));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});
console.log("get all path", path.join(__dirname, "frontend", "build", "index.html"));

app.listen(process.env.PORT || 3001, () => {
	console.log(`App listening on PORT: ${PORT}`);
});
