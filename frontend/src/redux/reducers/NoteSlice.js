import { createSlice } from "@reduxjs/toolkit";
import { fetchAllNotes, getSingleNote, updateNote, saveNote } from "../services/NoteServices";

export const NoteSlice = createSlice({
	name: "notes",
	initialState: {
		notes: [],
		note: {},
		error: null,
		isLoading: null,
	},

	reducers: {},
	extraReducers: {
		// all notes
		[fetchAllNotes.pending]: (state) => {
			state.isLoading = true;
			state.notes = [];
			state.error = null;
		},
		[fetchAllNotes.fulfilled]: (state, action) => {
			state.notes = action.payload;
			state.isLoading = false;
			state.error = null;
		},

		[fetchAllNotes.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			state.notes = [];
		},
		// single note
		[getSingleNote.fulfilled]: (state, action) => {
			state.note = action.payload;
			state.isLoading = false;
			state.error = null;
		},
		[getSingleNote.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
			state.note = null;
		},
		[getSingleNote.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			state.note = null;
		},
		// update note
		[updateNote.fulfilled]: (state, action) => {
			state.note = action.payload;
			state.isLoading = false;
			state.error = null;
		},
		[updateNote.rejected]: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
			state.note = null;
		},
		[updateNote.pending]: (state) => {
			state.error = null;
			state.isLoading = true;
			state.note = null;
		},
		// save new note
		[saveNote.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.note = action.payload;
		},
		[saveNote.rejected]: (state, action) => {
			state.isLoading = null;
			state.error = action.payload;
			state.note = null;
		},
		[saveNote.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
			state.note = null;
		},
	},
});

export const allNotes = (state) => state.notes.notes.notes; // state/notes-reducer/notes-array/notes-user' notes
export const singleNote = (state) => state.notes.note;

export const error = (state) => state.notes.error;
export const isLoading = (state) => state.notes.isLoading;

export default NoteSlice.reducer;
