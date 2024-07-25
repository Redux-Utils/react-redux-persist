import PersistGate from "./PersistGate";
import { persistReducer } from "./persistReducer";
import { rehydrate } from "./persistSlice";
import type { PersistConfig } from "./types/PersistReducer";
import type { CookiesOptions } from "./types/WebStorage";

export type { PersistConfig, CookiesOptions };
export { PersistGate, persistReducer, rehydrate };
