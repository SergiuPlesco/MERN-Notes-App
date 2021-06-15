import express from "express";
const router = express.Router();
import controller from "../controllers/notes.controller.js";
import protect from "../middleware/auth.js";

router.post("/add-note", protect, controller.note_create_post);

router.get("/notes", protect, controller.notes_all);

router.get("/notes/:noteID", protect, controller.note_details);

router.patch("/notes/:noteID", protect, controller.note_update_details);

router.delete("/notes/:noteID", protect, controller.note_delete);

export default router;
