import { defineConfig } from 'rollup'
import baseConfig from './rollup.config'

export default defineConfig({

	...baseConfig(),

	input: 'src/entry-lib.ts',
	
	output: {
		dir: 'lib',
		format: 'es',
		exports: 'named',
		entryFileNames: 'index.js',
		compact: true,
		sourcemap: true,
		preserveModules: true,
	},
})

