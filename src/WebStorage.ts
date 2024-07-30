import type { GetState } from "@reduxjs/toolkit";
import cookies from "js-cookie";

import { prefix } from "./constants";
import type {
	CookiesOptions,
	LoadState,
	State,
	WebStorageOptions,
} from "./types/WebStorage";

class LocalStorage {
	public loadState(key: string): LoadState {
		try {
			const serializedState: string | null = localStorage.getItem(key);
			if (serializedState === null) {
				return undefined;
			}

			const parsedState = JSON.parse(serializedState);

			delete parsedState.persist; // Remove the persist key

			return parsedState;
		} catch {
			return undefined;
		}
	}

	public saveState(key: string, state: State): void {
		try {
			const serializedState: string = JSON.stringify(state);
			localStorage.setItem(key, serializedState);
		} catch {
			// ignore write errors
		}
	}
}

class SessionStorage {
	public loadState(key: string): LoadState {
		try {
			const serializedState: string | null = sessionStorage.getItem(key);

			if (serializedState === null) {
				return undefined;
			}

			const parsedState = JSON.parse(serializedState);

			delete parsedState.persist; // Remove the persist key

			return parsedState;
		} catch {
			return undefined;
		}
	}

	public saveState(key: string, state: State): void {
		try {
			const serializedState: string = JSON.stringify(state);
			sessionStorage.setItem(key, serializedState);
		} catch {
			// ignore write errors
		}
	}
}

class Cookies {
	public loadState(key: string): LoadState {
		const serializedState: string | undefined = cookies.get(key);
		if (serializedState === undefined) {
			return undefined;
		}

		const parsedState = JSON.parse(serializedState);

		delete parsedState.persist; // Remove the persist key

		return parsedState;
	}

	public saveState(
		key: string,
		state: GetState<unknown>,
		options: CookiesOptions,
	): void {
		cookies.set(key, JSON.stringify(state), options);
	}
}

export default class WebStorage {
	private static readonly localStorage: LocalStorage = new LocalStorage();
	private static readonly sessionStorage: SessionStorage = new SessionStorage();
	private static readonly cookies: Cookies = new Cookies();

	public static loadState(key: string, storage: WebStorageOptions): LoadState {
		switch (storage.type) {
			case "localStorage": {
				return this.localStorage.loadState(prefix + key);
			}
			case "sessionStorage": {
				return this.sessionStorage.loadState(prefix + key);
			}
			case "cookies": {
				return this.cookies.loadState(prefix + key);
			}
		}
	}

	public static saveState(
		key: string,
		state: GetState<unknown>,
		storage: WebStorageOptions,
	): void {
		switch (storage.type) {
			case "localStorage": {
				this.localStorage.saveState(prefix + key, state);
				break;
			}
			case "sessionStorage": {
				this.sessionStorage.saveState(prefix + key, state);
				break;
			}
			case "cookies": {
				this.cookies.saveState(prefix + key, state, storage.options);
				break;
			}
		}
	}
}
