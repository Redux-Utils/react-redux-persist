import { persistActionType } from "./constants";
import { persistReducer } from "./persistReducer";
import { rehydrate } from "./persistSlice";
import type { PersistConfig } from "./types/PersistConfig";
import type { CookiesOptions } from "./types/WebStorage";

export type { PersistConfig, CookiesOptions };
export { persistReducer, rehydrate, persistActionType };
