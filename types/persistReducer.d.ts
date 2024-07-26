import type { Reducer } from "@reduxjs/toolkit";
import type { PersistConfig, ReducersWithInitialState } from "./types/PersistReducer";
import type { CookiesOptions } from "./types/WebStorage";
declare let exportedPersistConfig: PersistConfig;
declare let cookiesOptions: CookiesOptions;
export declare function persistReducer<R>(configs: PersistConfig, reducers: {
    [K in keyof R]: Reducer<R[K]>;
}): (ReducersWithInitialState<R> & {
    persist: Reducer<import("./types/PersistSlice").PersistState>;
})["persist" | keyof R] extends Reducer<any, any, any> | undefined ? Reducer<import("redux").StateFromReducersMapObject<ReducersWithInitialState<R> & {
    persist: Reducer<import("./types/PersistSlice").PersistState>;
}>, import("redux").ActionFromReducer<import("redux").ReducerFromReducersMapObject<ReducersWithInitialState<R> & {
    persist: Reducer<import("./types/PersistSlice").PersistState>;
}>>, Partial<import("redux").PreloadedStateShapeFromReducersMapObject<ReducersWithInitialState<R> & {
    persist: Reducer<import("./types/PersistSlice").PersistState>;
}>>> : never;
export { exportedPersistConfig, cookiesOptions };
