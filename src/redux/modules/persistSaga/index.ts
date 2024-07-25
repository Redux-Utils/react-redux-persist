import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import axiosInstance from "@/services/fetcher";

import { logger, persistUserToken } from "./persistSlice";

function* persistFunction(action: PayloadAction<{ user: { token: string } }>) {
	const { token } = action.payload.user;

	axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

	yield call(axiosInstance.get, "/todos/");

	// eslint-disable-next-line no-console
	console.log("persistFunction");

	yield put(logger());
}

export default takeLatest(persistUserToken.type, persistFunction);
