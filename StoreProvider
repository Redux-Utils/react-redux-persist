"use client";

import React from "react";
import { Provider } from "react-redux";

import PersistGate from "./PersistGate";

type StoreProviderProps = Readonly<{
	children: React.ReactNode;
}>;

export default function StoreProvider({
	children,
}: StoreProviderProps): React.JSX.Element {
	return (
		<Provider store={store}>
			<PersistGate store={store}>{children}</PersistGate>
		</Provider>
	);
}
