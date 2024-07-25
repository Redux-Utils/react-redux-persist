import { Action, combineReducers, Reducer } from "@reduxjs/toolkit";

import { loadState } from "./localstorage";
import persistSlice from "../modules/persistSaga/persistSlice";

export interface PersistConfig {
	key: string;
	whiteList: string[];
}

export function persistReducer<R>(
	configs: PersistConfig,
	reducers: { [K in keyof R]: Reducer<R[K]> },
) {
	const { key, whiteList } = configs;

	const mixedWhiteList = [...whiteList, "persist"];

	const initialState = loadState(key) as Partial<R> | undefined;

	// Modificar os reducers para aceitar um estado inicial
	const reducersWithInitialState = Object.keys(reducers).reduce(
		(acc, reducerKey) => {
			const key = reducerKey as keyof R;

			if (initialState && mixedWhiteList.includes(reducerKey)) {
				const modifiedReducer: Reducer<R[keyof R]> = (
					state = initialState[key as keyof R],
					action: Action<string>,
				) => {
					return reducers[key](state, action);
				};

				acc[key] = modifiedReducer;
			} else {
				acc[key] = reducers[key];
			}

			return acc;
		},
		{} as { [K in keyof R]: Reducer<R[K]> },
	);

	const rootReducer = combineReducers({
		...reducersWithInitialState,
		persist: persistSlice,
	});

	return rootReducer;
}
