export interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
}

export type LayoutMode = "list" | "2col" | "4col"

export interface LayoutConfig {
  mode: LayoutMode
  className: string
  label: string
}
