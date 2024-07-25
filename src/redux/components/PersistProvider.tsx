"use client";

import { useEffect } from "react";

import { useAppDispatch } from "../hooks";
import { persistUserToken } from "../modules/persistSaga/persistSlice";

type PersistProviderProps = Readonly<{
	children: React.ReactNode;
}>;

export default function PersistProvider({ children }: PersistProviderProps) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const userStorage = localStorage.getItem("@@remember-user");

		const token: string | null = userStorage
			? JSON.parse(userStorage).token
			: null;

		if (token) {
			dispatch(persistUserToken({ token }));
		}
	});

	return <>{children}</>;
}
