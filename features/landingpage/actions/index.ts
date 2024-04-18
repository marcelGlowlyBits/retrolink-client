"use server"

import { z } from 'zod';
import { Resend } from 'resend';
const resendKey = process.env.RESEND_AUTHORIZATION_BEARER;
const audienceId = process.env.RESEND_AUDIENCE_ID!!;

const resend = new Resend(resendKey);

const subscriptionFormSchema = z.object({
    firstName: z.string(),
    email: z.string().email()
  });

export const handleSubscriptionForm = async (formData: FormData) => {
    try {
    const validatedFields = subscriptionFormSchema.safeParse({
        firstName: formData.get('firstName'),
        email: formData.get('email'),
    });

    if (!validatedFields.success) {
        throw new Error('Invalid form data');
    }

    const createContract = await resend.contacts.create({
        email: validatedFields.data.email,
        firstName: validatedFields.data.firstName,
        audienceId: audienceId,
      });

      return {
        success: true,
        data: createContract
      };

    } catch(error) {
        return {
            success: false,
            message: 'There was an error creating the contact.'
        };
    } 
}