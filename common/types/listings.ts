// @TODO: ADD ENUMSS

export type IListing = {
  title: string
  description: string
  price: number
  category: ICategory
  condition: ICondition
  platform: IPlatform
  preferenceOfShipping: IPreferenceOfShipping
  hasDamage: boolean
  damageDescription?: string
  id: string
  frontImage?: string
  images?: string[]
  created_at: string
  createdAt?: string
  payForShipping: IPayForShipping
  user_id: string
}

export type IPreferenceOfShipping = 'PICKUP' | 'SEND' | 'BOTH'
export type IPayForShipping = 'SELLER' | 'BUYER'
export type ICategory =
  | 'GAMES'
  | 'CONSOLES'
  | 'ACCESSORIES'
  | 'MERCHANDISE'
  | 'OTHER'

export type ICondition = 'NEW' | 'USED' | 'GOODASNEW'
export type IPlatform =
  | 'PLAYSTATION1'
  | 'PLAYSTATION2'
  | 'PLAYSTATION3'
  | 'PLAYSTATION4'
  | 'PLAYSTATION5'
  | 'XBOXCLASSIC'
  | 'XBOX360'
  | 'XBOXONE'
  | 'NES'
  | 'SNES'
  | 'GAMEBOYCLASSIC'
  | 'GAMEBOYADVANCE'
  | 'NINTENDO64'
  | 'GAMECUBE'
  | 'WII'
  | 'WIIU'
  | 'SWITCH'
  | 'PC'
  | 'OTHER'
