import Note from "../models/note.model.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const note_create_post = async (req, res, next) => {
	let userID = req.user._id;

	// create a note
	Note.create({
		title: req.body.title,
		body: req.body.body,
		user: userID,
	})
		.then((result) => {
			User.findByIdAndUpdate(
				userID,
				{
					$push: { notes: result._id },
				},
				{ new: true }
			)
				.then((result) => {
					res.status(201).json(result);
				})
				.catch((error) => {
					res.status(500).json({
						success: false,
						error: `Some error occured while creating a new note!, ${error}`,
					});
				});
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				error: `Some error occured while creating a new note!, ${error}`,
			});
		});
};

const notes_all = (req, res) => {
	const userID = req.user._id;
	User.findById(userID)
		.populate({ path: "notes", options: { sort: { createdAt: -1 } } })
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((error) => {
			res.status(404).json({ success: false, error: error });
		});
};

const note_details = (req, res) => {
	const id = req.params.noteID;
	Note.findById(id)
		.then((result) => {
			if (!result) {
				res.status(404).json({ succes: false, error: "Note Not found" });
			} else {
				res.status(200).json(result);
			}
		})
		.catch((error) => {
			res
				.status(500)
				.json({ success: false, error: "Error retrieving note with id: " + id + ", " + error });
		});
};

const note_update_details = async (req, res) => {
	const id = req.params.noteID;
	const updatedNote = req.body;
	try {
		const newNote = await Note.findByIdAndUpdate(id, updatedNote, { new: true });
		res.status(200).json(newNote);
	} catch (error) {
		res.status(500).json({ success: false, error: error });
	}
};

const note_delete = (req, res) => {
	const id = req.params.noteID;
	Note.findByIdAndDelete(id)
		.then((data) => {
			if (!data) {
				res.status(404).json({ success: false, error: `Cannot delete note with id=${id}` });
			} else {
				res.status(200).json({ success: true, message: "Note was deleted successfully!" });
			}
		})
		.catch((err) => {
			res.status(500).send({ success: false, error: `Could not delete note with id=${id}` });
		});
};
export default {
	note_create_post,
	notes_all,
	note_details,
	note_delete,
	note_update_details,
};
