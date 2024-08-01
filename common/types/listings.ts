// @TODO: ADD ENUMSS

export type IListing = {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: string
  frontImage?: string
  images?: string[]
  created_at: string
  createdAt?: string
  platform: string
  preferenceOfShipping: string
}
