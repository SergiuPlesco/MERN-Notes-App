import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "../reducers/NoteSlice.js";
import UserReducer from "../reducers/UserSlice.js";

const store = configureStore({
	reducer: {
		notes: NotesReducer,
		user: UserReducer,
	},
});

export default store;
