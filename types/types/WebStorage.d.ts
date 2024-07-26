import type { GetState } from "@reduxjs/toolkit";
type SameSite = "strict" | "Strict" | "lax" | "Lax" | "none" | "None";
export interface CookiesOptions {
    expires?: number | Date;
    secure?: boolean;
    sameSite?: SameSite;
    domain?: string;
    path?: string;
}
export type State = GetState<unknown>;
export type LoadState = State | undefined;
export type StorageTypes = "cookies" | "sessionStorage" | "localStorage";
interface BaseStorageOptions {
    type: StorageTypes;
}
interface CookiesStorageOptions extends BaseStorageOptions {
    type: "cookies";
    options: CookiesOptions;
}
interface SessionStorageOptions extends BaseStorageOptions {
    type: "sessionStorage";
}
interface LocalStorageOptions extends BaseStorageOptions {
    type: "localStorage";
}
export type WebStorageOptions = CookiesStorageOptions | SessionStorageOptions | LocalStorageOptions;
export {};
