export const toCents = (value: string): string => {
  const numericValue = parseFloat(value.replace(',', '.'))

  const cents = Math.round(numericValue * 100)
  return cents.toString()
}

export const toEuros = (value: number, withIcon?: boolean): string => {
  const numericValue = value / 100
  const formattedValue = numericValue.toFixed(2).replace('.', ',')

  if (!withIcon) {
    return formattedValue
  }

  return `€${formattedValue}`
}
