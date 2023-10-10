import type { Module } from '../types'
import fs from 'fs'
import path from 'path'

/**
 * get pkg dependencies version
 * @param name
 * @returns
 */
export const getPkgDependenciesVersion = (name: string): string => {
	const pwd = process.cwd()
	const pkgFile = path.join(pwd, 'package.json')
	if (fs.existsSync(pkgFile)) {
		const pkgJson = JSON.parse(fs.readFileSync(pkgFile, 'utf8'))
		const version = pkgJson?.dependencies?.[name] || ''
		return version.replace(/^\D+/, '')
	}

	return ''
}

/**
 * get script tag
 * @param module modules item
 * @return { String } tag
 */
export const createScriptTag = (module: Module) => {
	const { path, mode = '' } = module || {}

	if (Array.isArray(path)) {
		const scriptStr = path.map((url: string) => `<script src="${url}" ${mode}></script>`).join('\n')
		return scriptStr
	} else {
		return `<script src="${path}" ${mode}></script>` + '\n'
	}
}


/**
 * get link tag
 * @param module modules item
 * @return { String } tag
 */
export const createLinkTag = (module: Module) => {
	const { css } = module || {}

	if (Array.isArray(css)) {
		const styleStr = css.map((href: string) => `<link href="${href}" rel="stylesheet" type="text/css">`).join('\n')
		return styleStr
	} else {
		return `<link href="${css}" rel="stylesheet" type="text/css">` + '\n'
	}
}