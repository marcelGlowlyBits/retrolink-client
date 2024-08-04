import { z } from 'zod'

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const UsernameSchema = z.object({
  username: z.string().min(5).trim(),
})
