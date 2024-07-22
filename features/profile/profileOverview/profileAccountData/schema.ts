import { z } from 'zod';

export const editProfileSchema = z.object({
    username: z.string().min(6, 'Gebruikersnaam moet minimaal 6 karakters lang zijn.').max(32, 'Gebruikersnaam mag maximaal 32 karakters lang zijn.'),
})