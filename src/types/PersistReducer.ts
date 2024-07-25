import type { Reducer } from "@reduxjs/toolkit";

import type { WebStorageOptions } from "./WebStorage";

export interface PersistConfig {
	key: string;
	storage?: WebStorageOptions;
	whiteList: string[];
}

export type ReducersWithInitialState<R> = { [K in keyof R]: Reducer<R[K]> };

export type InitialState<R> = Partial<R> | undefined;
