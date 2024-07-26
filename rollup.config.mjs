import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import clear from "rollup-plugin-clear";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
	input: "src/index.ts",
	output: [
		{
			file: "dist/esm/index.mjs",
			format: "esm",
			sourcemap: true,
		},
		{
			file: "dist/cjs/index.js",
			format: "cjs",
			sourcemap: true,
		},
	],
	plugins: [
		typescript(),
		clear({
			targets: ["dist", "types"],
		}),
		nodeResolve(),
		commonjs(),
	],
});
