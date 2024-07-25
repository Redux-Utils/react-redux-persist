import {
	createSlice,
	type PayloadAction,
	createAction,
} from "@reduxjs/toolkit";

export interface User {
	id: number;
	username: string;
}

export interface UserState {
	user: User;
	token: string;
	isLoading: boolean;
}

const initialState: UserState = {
	user: {
		id: 0,
		username: "",
	},
	token: "",
	isLoading: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginRequest(state) {
			state.isLoading = true;
		},

		loginSuccess(state, action: PayloadAction<User & { token: string }>) {
			state.user = action.payload;
			state.isLoading = false;
			state.token = action.payload.token;
		},

		loginFailure(state) {
			state.isLoading = false;
			state.token = "";
			state.user = {
				id: 0,
				username: "",
			};
		},

		persistToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},
	},
});

export const loginFetch = createAction<User>("user/loginFetch");

export const { loginRequest, loginSuccess, loginFailure } = userSlice.actions;

export default userSlice.reducer;
