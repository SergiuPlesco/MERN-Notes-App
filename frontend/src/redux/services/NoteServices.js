import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllNotes = createAsyncThunk(
	"notes/notesStatus",
	async (token, { rejectWithValue }) => {
		try {
			const result = await axios.get(`http://localhost:3001/notes`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return result.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const getSingleNote = createAsyncThunk(
	"note/singleNote",
	async (noteData, { rejectWithValue }) => {
		const { token, noteID } = noteData;

		try {
			const result = await axios.get(`http://localhost:3001/notes/${noteID}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return result.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const updateNote = createAsyncThunk(
	"notes/updateNote",
	async (noteData, { rejectWithValue }) => {
		try {
			const result = await axios.patch(
				`http://localhost:3001/notes/${noteData.newNote._id}`,
				noteData.newNote,
				{
					headers: {
						Authorization: `Bearer ${noteData.token}`,
					},
				}
			);
			return result.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const saveNote = createAsyncThunk(
	"notes/saveNote",
	async (noteData, { rejectWithValue }) => {
		try {
			const result = await axios.post("http://localhost:3001/add-note", noteData.newNote, {
				headers: {
					Authorization: `Bearer ${noteData.token}`,
				},
			});
			return result.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const deleteNote = createAsyncThunk(
	"notes/deleteNote",
	async (noteData, { rejectWithValue }) => {
		try {
			const result = await axios.delete(`http://localhost:3001/notes/${noteData.noteID}`, {
				headers: {
					Authorization: `Bearer ${noteData.token}`,
				},
			});
			return result.data;
		} catch (error) {
			console.log("cannot delete note: ", error.message);
			return rejectWithValue(error.response.data.error);
		}
	}
);
