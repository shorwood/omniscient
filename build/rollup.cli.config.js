import { defineConfig } from 'rollup'
import baseConfig from './rollup.config'

export default defineConfig({

	...baseConfig(),

	input: 'src/entry-cli.ts',

	output: {
		file: 'bin/index.js',
		format: 'cjs',
		exports: 'named',
        banner: '#! /usr/bin/env node\n',
        strict: false,
		compact: false,
		sourcemap: true,
		preserveModules: false,
	}
})
