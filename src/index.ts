import type { UserConfig, Plugin } from 'vite'
import type { Options, Module, ExternalMap } from './types'
import { createScriptTag, createLinkTag } from './utils'
import externalGlobals from 'rollup-plugin-external-globals'

const CdnPlugin = (options: Options): Plugin[] => {
    const { modules = [] } = options

    let pkgNames: string[], globalNames: ExternalMap, tagsStr: string

    if (modules.length > 0) {
		pkgNames = modules.map((m: Module) => m.name)
		tagsStr = modules.reduce((prev, cur) => {
			prev += ((cur?.path && createScriptTag(cur)) || '') + ((cur?.css && createLinkTag(cur)) || '')
			return prev
		}, '')
		globalNames = modules.reduce((prev: ExternalMap, cur) => {
			prev[cur.name] = cur?.var || cur.name
			return prev
		}, {})
	}

	return [
		{
			name: 'vite-plugin-cdn-mode',
			config(_, { command }) {
				const userConfig: UserConfig = {
					build: {
						rollupOptions: {},
					},
				}

				if (command === 'build') {
					userConfig!.build!.rollupOptions = {
						external: [...pkgNames],
						plugins: [externalGlobals(globalNames) as Plugin],
					}
				}

				return userConfig
			},
			transformIndexHtml(html) {
				return html.replace(/<\/title>/i, `</title>${tagsStr}\n`)
			},
		},
	]
}

export { CdnPlugin as Plugin }

export default CdnPlugin