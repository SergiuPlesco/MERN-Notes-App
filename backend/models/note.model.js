import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
