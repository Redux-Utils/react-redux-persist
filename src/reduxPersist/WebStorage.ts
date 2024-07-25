import cookies from "js-cookie";

import { WebStorageOptions } from "./persistReducer";
import store from "../store";

interface CookiesOptions {
	expires?: number | Date;
	secure?: boolean;
	sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None";
	domain?: string;
	path?: string;
}

class LocalStorage {
	loadState(key: string): ReturnType<typeof store.getState> | undefined {
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

	saveState(key: string, state: ReturnType<typeof store.getState>) {
		try {
			const serializedState = JSON.stringify(state);
			localStorage.setItem(key, serializedState);
		} catch {
			// ignore write errors
		}
	}
}

class SessionStorage {
	loadState(key: string): ReturnType<typeof store.getState> | undefined {
		try {
			const serializedState = sessionStorage.getItem(key);
			if (serializedState === null) {
				return undefined;
			}
			return JSON.parse(serializedState);
		} catch {
			return undefined;
		}
	}

	saveState(key: string, state: ReturnType<typeof store.getState>) {
		try {
			const serializedState = JSON.stringify(state);
			sessionStorage.setItem(key, serializedState);
		} catch {
			// ignore write errors
		}
	}
}

class Cookies {
	loadState(key: string): ReturnType<typeof store.getState> | undefined {
		const serializedState = cookies.get(key);
		if (serializedState === undefined) {
			return undefined;
		}
		return JSON.parse(serializedState);
	}

	saveState(
		key: string,
		state: ReturnType<typeof store.getState>,
		options: CookiesOptions,
	) {
		cookies.set(key, JSON.stringify(state), options);
	}
}

export default class WebStorage {
	private static readonly prefix = "react/redux/persist:";
	private static readonly localStorage = new LocalStorage();
	private static readonly sessionStorage = new SessionStorage();
	private static readonly cookies = new Cookies();

	public static loadState(
		key: string,
		storage: WebStorageOptions,
	): ReturnType<typeof store.getState> | undefined {
		switch (storage.type) {
			case "localStorage":
				return this.localStorage.loadState(this.prefix + key);
			case "sessionStorage":
				return this.sessionStorage.loadState(this.prefix + key);
			case "cookies":
				return this.cookies.loadState(this.prefix + key);
		}
	}

	public static saveState(
		key: string,
		state: ReturnType<typeof store.getState>,
		storage: WebStorageOptions,
		cookiesOptions: CookiesOptions,
	) {
		switch (storage.type) {
			case "localStorage":
				this.localStorage.saveState(this.prefix + key, state);
				break;
			case "sessionStorage":
				this.sessionStorage.saveState(this.prefix + key, state);
				break;
			case "cookies":
				this.cookies.saveState(this.prefix + key, state, cookiesOptions);
				break;
		}
	}
}
