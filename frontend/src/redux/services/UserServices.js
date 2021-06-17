import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const registerUser = createAsyncThunk(
	"user/register",
	async ({ username, email, password }, { rejectWithValue }) => {
		const config = {
			header: {
				"Content-Type": "application/json",
			},
		};
		try {
			const { data } = await axios.post("/register", { username, email, password }, config);
			// localStorage.setItem("authToken", data.token);
			return data.user;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

const loginUser = createAsyncThunk(
	"user/login",
	async ({ email, password }, { rejectWithValue }) => {
		const config = {
			header: {
				"Content-Type": "application/json",
			},
		};

		try {
			const { data } = await axios.post("/login", { email, password }, config);
			localStorage.setItem("authToken", data.token);
			return data.user;
		} catch (error) {
			return rejectWithValue(error.response.data.error);
		}
	}
);

export { registerUser, loginUser };
