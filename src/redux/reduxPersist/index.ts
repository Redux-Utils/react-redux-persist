import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserState } from "../modules/user/userSlice";
import { Store } from "../store";

interface PersistState {
	rehydrate: boolean;
}

const initialState: PersistState = {
	rehydrate: false,
};

const persistSlice = createSlice({
	name: "persist",
	initialState,
	reducers: {
		rehydrate(state, action?: PayloadAction<UserState>) {
			state.rehydrate = true;
			console.log(action);
		},
	},
});

export interface PersistConfig {
	key: string;
	whiteList: string[];
}

export function persistStore(store: Store, configs: PersistConfig) {
	return {
		store,
		configs,
	};
}

export const { rehydrate } = persistSlice.actions;

export const persistReducer = persistSlice.reducer;
