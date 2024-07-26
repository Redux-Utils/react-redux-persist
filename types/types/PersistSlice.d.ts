import type { Slice, SliceSelectors } from "@reduxjs/toolkit";
import type { WritableDraft } from "immer";
export interface PersistState {
    rehydrated?: boolean;
}
export type PersistSlice = Slice<PersistState, {
    rehydrate(state: WritableDraft<PersistState>): void;
}, "persist", "persist", SliceSelectors<PersistState>>;