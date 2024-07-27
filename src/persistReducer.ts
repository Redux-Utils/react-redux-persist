import type { Action, Reducer } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import WebStorage from "./WebStorage";
import persistSlice from "./persistSlice";
import returnStorageType from "./returnStorageType";
import type {
	InitialState,
	PersistConfig,
	ReducersWithInitialState,
} from "./types/PersistReducer";
import type { CookiesOptions, WebStorageOptions } from "./types/WebStorage";

let exportedPersistConfig: PersistConfig;
let cookiesOptions: CookiesOptions;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function persistReducer<R>(
	configs: PersistConfig,
	reducers: { [K in keyof R]: Reducer<R[K]> },
) {
	const { key, whiteList, storage } = configs;

	const storageType: WebStorageOptions = returnStorageType(storage);

	// Export the persist config to be used in the PersistGate
	exportedPersistConfig = configs;
	if (storageType.type === "cookies") {
		cookiesOptions = storageType.options;
	}

	const mixedWhiteList: string[] = [...whiteList, "persist"];

	const initialState = WebStorage.loadState(
		key,
		storageType,
	) as InitialState<R>;

	// Modificar os reducers para aceitar um estado inicial
	const reducersWithInitialState: ReducersWithInitialState<R> = Object.keys(
		reducers,
	).reduce((acc, reducerKey) => {
		const key = reducerKey as keyof R;

		if (initialState && mixedWhiteList.includes(reducerKey)) {
			const modifiedReducer: Reducer<R[keyof R]> = (
				state = initialState[key as keyof R],
				action: Action<string>,
			) => {
				const reducer = reducers[key](state, action);

				return reducer;
			};

			acc[key] = modifiedReducer;
		} else {
			acc[key] = reducers[key];
		}

		return acc;
	}, {} as ReducersWithInitialState<R>);

	const rootReducer = combineReducers({
		...reducersWithInitialState,
		persist: persistSlice,
	});

	return rootReducer;
}

// Export the persist config to be used in the PersistGate
export { exportedPersistConfig, cookiesOptions };
