import type { WebStorageOptions } from "./WebStorage";

export interface PersistConfig {
	key: string;
	storage?: WebStorageOptions;
	whiteList: string[];
}
