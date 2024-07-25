"use client";

import { Provider } from "react-redux";

import PersistGate from "../reduxPersist/PersistGate";
import store from "../store";

type StoreProviderProps = Readonly<{
	children: React.ReactNode;
}>;

export default function StoreProvider({ children }: StoreProviderProps) {
	return (
		<Provider store={store}>
			<PersistGate store={store}>{children}</PersistGate>
		</Provider>
	);
}
