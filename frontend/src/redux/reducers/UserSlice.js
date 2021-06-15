import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../services/UserServices";

const UserSlice = createSlice({
	name: "user",
	initialState: {
		isAuthenticated: false,
		user: {},
		token: "",
		error: null,
		isLoading: false,
	},
	reducers: {
		unauthenticate(state) {
			state.isAuthenticated = false;
			state.user = {};
		},
	},
	extraReducers: {
		[registerUser.pending]: (state) => {
			state.isAuthenticated = false;
			state.isLoading = true;
		},
		[registerUser.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.isLoading = false;
		},
		[registerUser.rejected]: (state, action) => {
			state.error = action.payload;
			state.isAuthenticated = false;
			state.isLoading = false;
		},
		// login user
		[loginUser.pending]: (state) => {
			state.isAuthenticated = false;
			state.isLoading = true;
		},
		[loginUser.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.isLoading = false;
		},
		[loginUser.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			state.isAuthenticated = false;
		},
	},
});

export const { unauthenticate } = UserSlice.actions;
export const { registerError } = (state) => state.user.error;
export const { isLoading } = (state) => state.user.isLoading;
export default UserSlice.reducer;
