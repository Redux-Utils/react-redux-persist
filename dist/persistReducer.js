import { combineReducers } from "@reduxjs/toolkit";
import WebStorage from "./WebStorage";
import persistSlice from "./persistSlice";
import returnStorageType from "./returnStorageType";
let exportedPersistConfig;
let cookiesOptions;
export function persistReducer(configs, reducers) {
    const { key, whiteList, storage } = configs;
    const storageType = returnStorageType(storage);
    exportedPersistConfig = configs;
    if (storageType.type === "cookies") {
        cookiesOptions = storageType.options;
    }
    const mixedWhiteList = [...whiteList, "persist"];
    const initialState = WebStorage.loadState(key, storageType);
    const reducersWithInitialState = Object.keys(reducers).reduce((acc, reducerKey) => {
        const key = reducerKey;
        if (initialState && mixedWhiteList.includes(reducerKey)) {
            const modifiedReducer = (state = initialState[key], action) => {
                return reducers[key](state, action);
            };
            acc[key] = modifiedReducer;
        }
        else {
            acc[key] = reducers[key];
        }
        return acc;
    }, {});
    const rootReducer = combineReducers(Object.assign(Object.assign({}, reducersWithInitialState), { persist: persistSlice }));
    return rootReducer;
}
export { exportedPersistConfig, cookiesOptions };
//# sourceMappingURL=persistReducer.js.map