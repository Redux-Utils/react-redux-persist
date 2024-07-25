import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { persistUserToken } from "./modules/persistSaga/persistSlice";
import userSlice from "./modules/user/userSlice";
import { PersistConfig } from "./reduxPersist";
import { saveState } from "./reduxPersist/localstorage";
import { persistReducer } from "./reduxPersist/persistReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const rememberedKeys = ["user"];

const persistConfig: PersistConfig = {
	key: "root",
	whiteList: rememberedKeys,
};

const reducers = {
	user: userSlice,
};

const persistedReducer = persistReducer(persistConfig, reducers);

function makeStore() {
	return configureStore({
		reducer: persistedReducer,

		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(sagaMiddleware),
	});
}

const store = makeStore();

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
	const state = store.getState();

	saveState(persistConfig.key, state);
});

store.dispatch(persistUserToken(store.getState()));

export default store;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
