"use client";

import * as React from "react";
import WebStorage from "../WebStorage";
import { cookiesOptions, exportedPersistConfig } from "../persistReducer";
import { rehydrate } from "../persistSlice";
export default function PersistGate({ children, store, }) {
    store.subscribe(() => {
        const state = store.getState();
        WebStorage.saveState(exportedPersistConfig.key, state, exportedPersistConfig.storage || { type: "localStorage" }, cookiesOptions);
    });
    store.dispatch(rehydrate(store.getState()));
    return React.createElement(React.Fragment, null, children);
}
//# sourceMappingURL=PersistGate.js.map
