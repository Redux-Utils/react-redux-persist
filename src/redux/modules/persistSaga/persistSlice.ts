import { createAction, createSlice } from "@reduxjs/toolkit";

interface PersistState {
	isLoading: boolean;
	logger: string;
	value: number;
}

const initialState: PersistState = {
	isLoading: false,
	logger: "",
	value: 0,
};

const persistSlice = createSlice({
	name: "persist",
	initialState,
	reducers: {
		logger(state) {
			state.logger = "logger in slice";
			state.value += 1;
		},
	},
});

export const persistUserToken = createAction<object>("persist/userToken");

export const { logger } = persistSlice.actions;

export default persistSlice.reducer;
