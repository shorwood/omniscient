import { defineConfig } from 'rollup'
import baseConfig from './rollup.config'

export default defineConfig({
	...baseConfig(),
	input: 'src/entry-lib.ts',
	output: [
		{ format: 'es', file: 'lib/index.esm.js' },
		{ format: 'cjs', file: 'lib/index.cjs.js' },
	],
})

