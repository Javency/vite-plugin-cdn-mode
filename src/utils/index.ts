import type { Module } from '@/types/index'

/**
 * get script tag
 * @param module modules item
 * @return { String } tag
 */
export const createScriptTag = (module: Module): string => {
  const { path, mode = '' } = module

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
export const createLinkTag = (module: Module): string => {
  const { css } = module

  if (Array.isArray(css)) {
    const styleStr = css.map((href: string) => `<link href="${href}" rel="stylesheet" type="text/css">`).join('\n')
    return styleStr
  } else {
    return `<link href="${css}" rel="stylesheet" type="text/css">` + '\n'
  }
}
