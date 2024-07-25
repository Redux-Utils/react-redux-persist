import cookies from "js-cookie";

import store from "../store";

// COM COOKIES

export function loadState(
	key: string,
): ReturnType<typeof store.getState> | undefined {
	const serializedState = cookies.get(key);
	if (serializedState === undefined) {
		return undefined;
	}
	return JSON.parse(serializedState);
}

export function saveState(
	key: string,
	state: ReturnType<typeof store.getState>,
) {
	cookies.set(key, JSON.stringify(state), { expires: 1 });
}

// COM LOCALSTORAGE

/**
 *
 * export function loadState(
	key: string,
): ReturnType<typeof store.getState> | undefined {
	try {
		const serializedState = localStorage.getItem(key);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch {
		return undefined;
	}
}

export function saveState(
	key: string,
	state: ReturnType<typeof store.getState>,
) {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(key, serializedState);
	} catch {
		// ignore write errors
	}
}
 */
