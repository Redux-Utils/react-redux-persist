import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { call, delay, put, throttle } from "redux-saga/effects";

import {
	loginFailure,
	loginFetch,
	loginRequest,
	loginSuccess,
	User,
} from "./userSlice";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser({ payload }: PayloadAction<User>) {
	const { id } = payload;

	yield put(loginRequest());
	yield delay(2000);

	try {
		const response: AxiosResponse<User> = yield call(
			axios.get,
			`https://jsonplaceholder.typicode.com/users/${id}`,
		);

		const { data } = response;

		const user = {
			id: data.id,
			username: data.username,
		};

		yield put(
			loginSuccess({
				id: user.id,
				username: user.username,
				token: btoa(`${user.id}:${user.username}`),
			}),
		);
	} catch (e) {
		if (isAxiosError(e)) {
			// eslint-disable-next-line no-console
			console.log(e.response);
		}
		yield put(loginFailure());
	}
}

export default throttle(2000, loginFetch.type, fetchUser);
