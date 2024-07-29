import { z } from 'zod'

export const listingFormSchema = z
  .object({
    title: z
      .string()
      .min(8, 'Naam van het product moet minimaal 8 karakters lang zijn.')
      .max(64, 'Naam van het product mag maximaal 64 karakters lang zijn.'),
    description: z
      .string()
      .min(
        24,
        'Beschrijving van het product moet minimaal 24 karakters lang zijn.'
      )
      .max(
        500,
        'Beschrijving van het product mag maximaal 500 karakters lang zijn.'
      ),
    price: z
      .number()
      .min(1, 'Vraagprijs moet minimaal 1 euro zijn.')
      .max(12500, 'Vraagprijs mag maximaal 12500 euro zijn.'),
    category: z.enum(['GAMES', 'CONSOLES', 'ACCESSORY', 'MERCHANDISE', 'OTHER']),
    condition: z.enum(['NEW', 'USED', 'GOODASNEW']),
    platform: z.enum([
      'PLAYSTATION1',
      'PLAYSTATION2',
      'PLAYSTATION3',
      'PLAYSTATION4',
      'PLAYSTATION5',
      'XBOXCLASSIC',
      'XBOX360',
      'XBOXONE',
      'NES',
      'SNES',
      'GAMEBOYCLASSIC',
      'GAMEBOYADVANCE',
      'NINTENDO64',
      'GAMECUBE',
      'WII',
      'WIIU',
      'SWITCH',
      'PC',
      'OTHER',
    ]),
    hasDamage: z.boolean(),
    preferenceOfShipping: z.enum(['PICKUP', 'SEND', 'BOTH']),
    payForShipping: z.enum(['SELLER', 'BUYER']).optional(),
    damageDescription: z
      .string()
      .min(8, 'Schadebeschrijving moet minimaal 8 karakters lang zijn.')
      .max(500, 'Schadebeschrijving mag maximaal 500 karakters lang zijn.')
      .optional(),
  })
  .refine((input) => {
    // payForShipping is required when preferenceOfShipping is SEND or BOTH

    if (
      (input.preferenceOfShipping === 'SEND' &&
        input.payForShipping === undefined) ||
      (input.preferenceOfShipping === 'BOTH' &&
        input.payForShipping === undefined)
    ) {
      return false
    }

    if (input.hasDamage === true && input.damageDescription === undefined) {
      return false
    }

    return true
  })
