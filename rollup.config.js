import { defineConfig } from 'rollup'
import { resolve } from 'path'

//--- Import plugin definitions.
import rollupAlias from '@rollup/plugin-alias'
import rollupGlob from 'rollup-plugin-glob-import'
import rollupCommonJs from '@rollup/plugin-commonjs'
import { nodeResolve as rollupNodeResolve } from '@rollup/plugin-node-resolve'

export default defineConfig({

	plugins: [
		rollupAlias({
			entries: {
				'@cli': resolve(__dirname, './src/cli'),
				'@utils': resolve(__dirname, './src/utils'),
			}
		}),
		rollupGlob(),
		rollupNodeResolve(),
		rollupCommonJs(),
	],

	input: {
		lib: 'src/entry-lib.js',
		cli: 'src/entry-cli.js'
	},

	output: {
		dir: 'dist',
		format: 'cjs',
		exports: 'auto',
		entryFileNames: '[name].js'
	}
})
