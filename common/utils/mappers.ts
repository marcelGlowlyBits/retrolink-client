import { isEmpty } from '@/common/utils/isEmpty'

import { CategoryOptions } from './categoryOptions'
import { PlatformOptions } from './platformOptions'
import { PreferenceOfShippingOptions } from './preferenceOfShippingOptions'
import { ConditionOptions } from './conditionOptions'
import { PayForShippingOptions } from './payForShippingOptions'

import { ICategory } from '@/common/types/listings'

export const CategoryMapper = (category: ICategory) => {
  if (isEmpty(category)) return

  return CategoryOptions.find((option) => option.value === category)?.name
}

export const PlatformMapper = (platform: string) => {
  if (isEmpty(platform)) return

  return PlatformOptions.find((option) => option.value === platform)?.name
}

export const PreferenceOfShippingOptionsMapper = (
  preferenceOfShipping: string
) => {
  if (isEmpty(preferenceOfShipping)) return

  return PreferenceOfShippingOptions.find(
    (option) => option.value === preferenceOfShipping
  )?.label
}

export const ConditionOptionsMapper = (condition: string) => {
  if (isEmpty(condition)) return

  return ConditionOptions.find((option) => option.value === condition)?.name
}

export const PayForShippingOptionsMapper = (payForShipping: string) => {
  if (isEmpty(payForShipping)) return

  return PayForShippingOptions.find((option) => option.value === payForShipping)
    ?.label
}
