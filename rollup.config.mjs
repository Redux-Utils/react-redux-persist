import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import clear from "rollup-plugin-clear";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import packageJson from "./package.json" assert { type: "json" };

export default defineConfig({
	input: "src/index.ts",
	output: [
		{
			file: packageJson.module,
			format: "esm",
			sourcemap: false,
		},
		{
			file: packageJson.main,
			format: "cjs",
			sourcemap: false,
		},
	],
	external: [
		"react",
		"react-dom",
		"@reduxjs/toolkit",
		"react-redux",
	],
	plugins: [
		clear({
			targets: ["dist", "types"],
		}),
		nodeResolve(),
		commonjs(),
		typescript({
			declaration: false
		}),
	],
});
