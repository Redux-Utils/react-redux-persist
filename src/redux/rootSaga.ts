import { all } from "redux-saga/effects";

import persistSaga from "./modules/persistSaga";
import userSaga from "./modules/user/userSaga";

function* rootSaga() {
	yield all([persistSaga, userSaga]);
}

export default rootSaga;
