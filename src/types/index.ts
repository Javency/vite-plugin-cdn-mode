export interface Options{
    modules: Module[]
}

export interface Module {
    name: string
    var: string
    mode?: string
    path?: string | string[]
    css?: string | string[]
}

export type ExternalMap = {
    [key: string]: string
}