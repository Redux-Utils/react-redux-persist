"use client";

import type { GetState } from "@reduxjs/toolkit";
import React from "react";

import WebStorage from "./WebStorage";
import { cookiesOptions, exportedPersistConfig } from "./persistReducer";
import { rehydrate } from "./persistSlice";
import type { PersistGateProps } from "./types/PersistGate";

export default function PersistGate({
	children,
	store,
}: PersistGateProps): React.JSX.Element {
	store.subscribe(() => {
		const state: GetState<unknown> = store.getState();

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
