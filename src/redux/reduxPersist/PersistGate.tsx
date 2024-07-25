"use client";

import { useEffect } from "react";

import { rehydrate } from ".";
import { provider } from "../store";

type PersistGateProps = Readonly<{
	children: React.ReactNode;
	provider: typeof provider;
}>;

export default function PersistGate({ children, provider }: PersistGateProps) {
	const { store, configs } = provider;

	const states = store.getState();

	const { key, whiteList } = configs;

	const dispatch = store.dispatch;

	useEffect(() => {
		const data = localStorage.getItem(key);

		if (data) {
			const parsed = JSON.parse(data);

			if (parsed) {
				whiteList.forEach((item) => {
					const state = parsed[item];

					if (state) {
						// Disparar a ação de reidratação para cada item na whitelist
						dispatch(rehydrate(state));
					}
				});
			}
		} else {
			whiteList.forEach((item) => {
				const state = states[item];

				if (state) {
					dispatch(rehydrate(state));
				}

				localStorage.setItem(key, JSON.stringify(states));
			});
		}
	}, []);

	return <>{children}</>;
}
