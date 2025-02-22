export interface ProductSizeProps {
  size: string
  quantity: number
}
export interface ProductColorsProps {
  id: string
  color: string
  imagesUrl: string[]
  sizes: ProductSizeProps[]
}
export interface ReviewProps {
  userId: string
  displayName: string
  reviewText: string
  rating: number
  date: string
}

export type genderType = "men" | "women"
export type sportType = "running" | "training" | "hiking" | "climbing"
export interface ProductProps {
  id: string
  gender: genderType
  sport: sportType
  brand: string
  name: string
  price: number
  colors: string[]
  sizes: string[]
  images: ProductColorsProps[]
  reviews: ReviewProps[]
  details: string[]
  features: string[]
  releaseDate: string
  featured: boolean
  sale: boolean
  salePrice: number
}
