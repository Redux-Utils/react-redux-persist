import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
//# sourceMappingURL=persistSlice.js.map