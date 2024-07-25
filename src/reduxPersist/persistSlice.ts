import type { Slice, SliceSelectors } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { WritableDraft } from "immer"; // Add this line

export interface PersistState {
	rehydrated?: boolean;
}

const initialState: PersistState = {
	rehydrated: false,
};

type PersistSlice = Slice<
	PersistState,
	{
		rehydrate(state: WritableDraft<PersistState>): void;
	},
	"persist",
	"persist",
	SliceSelectors<PersistState>
>;

const persistSlice: PersistSlice = createSlice({
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
