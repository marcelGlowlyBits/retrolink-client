import { z } from "zod";

export const listingFormSchema = z.object({
    title: z.
        string({ 
            required_error: 'Naam van het product is verplicht.'})
        .min(8, {
            message: 'Naam van het product moet minimaal 8 karakters lang zijn.'
        })
        .max(64, {
            message: 'Naam van het product mag maximaal 64 karakters lang zijn.'
        }),
    description: z.
        string({
            required_error: 'Beschrijving van het product is verplicht.'
        })
        .min(24, {
            message: 'Beschrijving van het product moet minimaal 24 karakters lang zijn.'
        })
        .max(500, {
            message: 'Beschrijving van het product mag maximaal 500 karakters lang zijn.'
        }),
    price: z.
        number({
            required_error: 'Vraagprijs is verplicht'
        })
        .min(1, {
            message: 'Vraagprijs moet minimaal 1 euro zijn.'
        })
        .max(12500, {
            message: 'Vraagprijs mag maximaal 12500 euro zijn.'
        }),
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
        'OTHER'
    ]),
});