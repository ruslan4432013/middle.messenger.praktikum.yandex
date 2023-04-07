declare module '*.hbs' {
  const tpl: (param?: any) => string
  export default tpl
}

declare module '*.module.scss' {
  const content: Record<string, string>
  export default content
}


declare module '*.svg' {
  const svg: string
  export default svg
}
