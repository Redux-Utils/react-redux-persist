import React$1 from "react";
import * as _reduxjs_toolkit from "@reduxjs/toolkit";
import { Store, Reducer } from "@reduxjs/toolkit";
import * as redux from "redux";

type PersistGateProps = Readonly<{
	children: React.ReactNode;
	store: Store;
}>;

declare function PersistGate({
	children,
	store,
}: PersistGateProps): React$1.JSX.Element;

interface PersistState {
	rehydrated?: boolean;
}

type SameSite = "strict" | "Strict" | "lax" | "Lax" | "none" | "None";
interface CookiesOptions {
	expires?: number | Date;
	secure?: boolean;
	sameSite?: SameSite;
	domain?: string;
	path?: string;
}
type StorageTypes = "cookies" | "sessionStorage" | "localStorage";
interface BaseStorageOptions {
	type: StorageTypes;
}
interface CookiesStorageOptions extends BaseStorageOptions {
	type: "cookies";
	options: CookiesOptions;
}
interface SessionStorageOptions extends BaseStorageOptions {
	type: "sessionStorage";
}
interface LocalStorageOptions extends BaseStorageOptions {
	type: "localStorage";
}
type WebStorageOptions =
	| CookiesStorageOptions
	| SessionStorageOptions
	| LocalStorageOptions;

interface PersistConfig {
	key: string;
	storage?: WebStorageOptions;
	whiteList: string[];
}
type ReducersWithInitialState<R> = {
	[K in keyof R]: Reducer<R[K]>;
};

declare function persistReducer<R>(
	configs: PersistConfig,
	reducers: {
		[K in keyof R]: Reducer<R[K]>;
	},
): (ReducersWithInitialState<R> & {
	persist: Reducer<PersistState>;
})["persist" | keyof R] extends Reducer<any, any, any> | undefined
	? Reducer<
			redux.StateFromReducersMapObject<
				ReducersWithInitialState<R> & {
					persist: Reducer<PersistState>;
				}
			>,
			redux.ActionFromReducer<
				redux.ReducerFromReducersMapObject<
					ReducersWithInitialState<R> & {
						persist: Reducer<PersistState>;
					}
				>
			>,
			Partial<
				redux.PreloadedStateShapeFromReducersMapObject<
					ReducersWithInitialState<R> & {
						persist: Reducer<PersistState>;
					}
				>
			>
		>
	: never;

declare const rehydrate: _reduxjs_toolkit.ActionCreatorWithoutPayload<"persist/rehydrate">;

export {
	type CookiesOptions,
	type PersistConfig,
	PersistGate,
	persistReducer,
	rehydrate,
};
