import { defineConfig } from 'rollup'

//--- Import plugin definitions.
import rollupCommonJs from '@rollup/plugin-commonjs'
import rollupAnalyzer from 'rollup-plugin-analyzer'
import rollupTypescript from '@rollup/plugin-typescript'
import rollupBabel from '@rollup/plugin-babel'
import { nodeResolve as rollupNodeResolve } from '@rollup/plugin-node-resolve'

export default defineConfig({

	plugins: [
		rollupTypescript(),
		rollupNodeResolve(),
		rollupCommonJs(),
		// rollupBabel({ 
		// 	// minified: true,
		// 	babelHelpers: 'bundled',
		// 	// compact: true,
		// }),
		rollupAnalyzer({
			summaryOnly: true,
			limit: 0
		}),
	],

	external: [
		// 'lodash-es',
		'chalk',
		'yargs',
		'xml-js',
		'yaml'
	],

	input: {
		lib: 'src/entry-lib.ts',
		cli: 'src/entry-cli.ts'
	},

	output: {
		// compact: true,
		// sourcemap: true,
		// preserveModules: true,
		dir: 'dist',
		format: 'cjs',
		exports: 'named',
		entryFileNames: '[name].[format].js',
		chunkFileNames: '[name].[format].js'
	}
})
