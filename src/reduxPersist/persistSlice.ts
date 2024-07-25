import { createSlice } from "@reduxjs/toolkit";

interface PersistState {
	rehydrated?: boolean;
}

const initialState: PersistState = {
	rehydrated: false,
};

const persistSlice = createSlice({
	name: "persist",
	initialState,
	reducers: {
		rehydrate(state) {
			state.rehydrated = true;
		},
	},
});

export const { rehydrate } = persistSlice.actions;

export default persistSlice.reducer;
