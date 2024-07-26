import type { GetState } from "@reduxjs/toolkit";
import type { CookiesOptions, LoadState, WebStorageOptions } from "./types/WebStorage";
export default class WebStorage {
    private static readonly localStorage;
    private static readonly sessionStorage;
    private static readonly cookies;
    static loadState(key: string, storage: WebStorageOptions): LoadState;
    static saveState(key: string, state: GetState<unknown>, storage: WebStorageOptions, cookiesOptions: CookiesOptions): void;
}
