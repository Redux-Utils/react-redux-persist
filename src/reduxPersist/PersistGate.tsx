"use client";

import { Store } from "@reduxjs/toolkit";

import WebStorage from "./WebStorage";
import { cookiesOptions, exportedPersistConfig } from "./persistReducer";
import { rehydrate } from "./persistSlice";

type PersistGateProps = Readonly<{
	children: React.ReactNode;
	store: Store;
}>;

export default function PersistGate({ children, store }: PersistGateProps) {
	store.subscribe(() => {
		const state = store.getState();

		WebStorage.saveState(
			exportedPersistConfig.key,
			state,
			exportedPersistConfig.storage || { type: "localStorage" },
			cookiesOptions,
		);
	});

	store.dispatch(rehydrate(store.getState()));

	return <>{children}</>;
}
