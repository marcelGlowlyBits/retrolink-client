import { isEmpty } from "@/common/utils/isEmpty";

import { CategoryOptions } from "./categoryOptions";
import { PlatformOptions } from "./platformOptions";
import { PreferenceOfShippingOptions } from "./preferenceOfShippingOptions";

export const CategoryMapper = (category: string) => {
  if (isEmpty(category)) return;

  return CategoryOptions.find((option) => option.value === category)?.name;
};

export const PlatformMapper = (platform: string) => {
  if (isEmpty(platform)) return;

  return PlatformOptions.find((option) => option.value === platform)?.name;
};

export const PreferenceOfShippingOptionsMapper = (
  preferenceOfShipping: string,
) => {
  if (isEmpty(preferenceOfShipping)) return;

  return PreferenceOfShippingOptions.find(
    (option) => option.value === preferenceOfShipping,
  )?.label;
};
