import type { EnhancedStore } from "@reduxjs/toolkit";

import WebStorage from "./WebStorage";
import { rehydrate } from "./persistSlice";
import type { PersistConfig } from "./types/PersistConfig";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function persistStore<S>(store: EnhancedStore<S>, configs: PersistConfig) {
	const { key, storage } = configs;

	store.subscribe(() => {
		WebStorage.saveState(
			key,
			store.getState(),
			storage || {
				type: "localStorage",
			},
		);
	});

	store.dispatch(rehydrate());

	return store;
}

export { persistStore };
