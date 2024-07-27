import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";

import { PersistGate, persistReducer, rehydrate } from "../src";
import WebStorage from "../src/WebStorage";

import "@testing-library/jest-dom";

// Mock das funções e variáveis
jest.mock("../src/WebStorage", () => ({
	saveState: jest.fn(),
	loadState: jest.fn(),
}));

jest.mock("../src/persistReducer", () => ({
	cookiesOptions: {},
	exportedPersistConfig: { key: "test", storage: { type: "localStorage" } },
}));

jest.mock("../src/persistSlice", () => ({
	rehydrate: jest.fn(),
}));

// Reducer mockado para criar o store
const mockReducer = (state = {}, _action: unknown): object => state;

const store = configureStore({
	reducer: persistReducer(
		{ key: "test", whiteList: [], storage: { type: "localStorage" } },
		{ test: mockReducer },
	),
});

describe("PersistGate", () => {
	it("should render children", () => {
		render(
			<Provider store={store}>
				<PersistGate store={store}>
					<div>Test Child</div>
				</PersistGate>
			</Provider>,
		);

		expect(screen.getByText("Test Child")).toBeInTheDocument();
	});

	it("should subscribe to the store and save state on change", () => {
		const saveState = WebStorage.saveState as jest.Mock;

		render(
			<Provider store={store}>
				<PersistGate store={store}>
					<div>Test Child</div>
				</PersistGate>
			</Provider>,
		);

		// Verifica se a função saveState foi chamada
		expect(saveState).toHaveBeenCalledWith(
			"test",
			expect.any(Object), // O estado pode variar, então usamos expect.any(Object)
			{ type: "localStorage" },
			{},
		);
	});

	it("should dispatch rehydrate action on render", () => {
		const dispatch = jest.fn();
		const storeWithMockDispatch = { ...store, dispatch };

		render(
			<Provider store={storeWithMockDispatch}>
				<PersistGate store={storeWithMockDispatch}>
					<div>Test Child</div>
				</PersistGate>
			</Provider>,
		);

		expect(dispatch).toHaveBeenCalledWith(rehydrate());
	});
});
