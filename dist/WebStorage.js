import cookies from "js-cookie";
import { prefix } from "./constants";
class LocalStorage {
    loadState(key) {
        try {
            const serializedState = localStorage.getItem(key);
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        }
        catch (_a) {
            return undefined;
        }
    }
    saveState(key, state) {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem(key, serializedState);
        }
        catch (_a) {
        }
    }
}
class SessionStorage {
    loadState(key) {
        try {
            const serializedState = sessionStorage.getItem(key);
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        }
        catch (_a) {
            return undefined;
        }
    }
    saveState(key, state) {
        try {
            const serializedState = JSON.stringify(state);
            sessionStorage.setItem(key, serializedState);
        }
        catch (_a) {
        }
    }
}
class Cookies {
    loadState(key) {
        const serializedState = cookies.get(key);
        if (serializedState === undefined) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    saveState(key, state, options) {
        cookies.set(key, JSON.stringify(state), options);
    }
}
class WebStorage {
    static loadState(key, storage) {
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
    static saveState(key, state, storage, cookiesOptions) {
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
                this.cookies.saveState(prefix + key, state, cookiesOptions);
                break;
            }
        }
    }
}
WebStorage.localStorage = new LocalStorage();
WebStorage.sessionStorage = new SessionStorage();
WebStorage.cookies = new Cookies();
export default WebStorage;
//# sourceMappingURL=WebStorage.js.map