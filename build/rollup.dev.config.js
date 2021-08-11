import { defineConfig } from 'rollup'
import baseConfig from './rollup.config'
import libConfig from './rollup.lib.config'
import cliConfig from './rollup.cli.config'

export default defineConfig([
	{ ...baseConfig(), ...libConfig },
	{ ...baseConfig(), ...cliConfig },
])
