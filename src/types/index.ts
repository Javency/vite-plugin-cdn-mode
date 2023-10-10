export type Options = {
    modules: Module[]
}

export type Module = {
    name: string
    var: string
    mode?: string
    path?: string | string[]
    css?: string | string[]
}
