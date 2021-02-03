export interface BaseFormPorps<T> {
  type: string
  title: string
  dataSource?: T
  triggerRender: JSX.Element
  onFinish: (data?: T) => any
  children?: any
}
