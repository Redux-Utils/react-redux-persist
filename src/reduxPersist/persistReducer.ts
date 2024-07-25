import { Action, combineReducers, Reducer } from "@reduxjs/toolkit";

import WebStorage from "./WebStorage";
import persistSlice from "./persistSlice";

type StorageTypes = "cookies" | "sessionStorage" | "localStorage";

interface CookiesOptions {
	exprires?: number | Date;
	secure?: boolean;
	sameSite?: "strict" | "lax" | "none";
	domain?: string;
	path?: string;
}

interface BaseStorageOptions {
	type: StorageTypes;
}

interface CookiesStorageOptions extends BaseStorageOptions {
	type: "cookies";
	options: CookiesOptions; // Inclui as opções específicas para cookies aqui
}

interface SessionStorageOptions extends BaseStorageOptions {
	type: "sessionStorage";
}

interface LocalStorageOptions extends BaseStorageOptions {
	type: "localStorage";
}

// União discriminada para WebStorageOptions
export type WebStorageOptions =
	| CookiesStorageOptions
	| SessionStorageOptions
	| LocalStorageOptions;

export interface PersistConfig {
	key: string;
	storage?: WebStorageOptions;
	whiteList: string[];
}

let exportedPersistConfig: PersistConfig;
let cookiesOptions: CookiesOptions;

function returnStorageType(
	storage: WebStorageOptions | undefined,
): WebStorageOptions {
	if (!storage) {
		return { type: "localStorage" };
	}

	return storage;
}

export function persistReducer<R>(
	configs: PersistConfig,
	reducers: { [K in keyof R]: Reducer<R[K]> },
) {
	const { key, whiteList, storage } = configs;

	const storageType = returnStorageType(storage);

	// Export the persist config to be used in the PersistGate
	exportedPersistConfig = configs;
	if (storageType.type === "cookies") {
		cookiesOptions = storageType.options;
	}

	const mixedWhiteList = [...whiteList, "persist"];

	const initialState = WebStorage.loadState(key, storageType) as
		| Partial<R>
		| undefined;

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

// Export the persist config to be used in the PersistGate
export { exportedPersistConfig, cookiesOptions };
