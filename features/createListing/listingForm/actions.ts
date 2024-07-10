'use server'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'

import { listingFormSchema } from './schema';

import { createClient } from '@/libs/supabase/server';

import { getMe } from '@/libs/api/me';

export type FormState = { 
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
}

export async function createListing(prevState: FormState, data: FormData): Promise<FormState> {
    const identify = await getMe();
    const supabase = createClient();

    if (!identify) {
        return {
            message: 'user not authenticated',
        
        }
    }

    const formData = Object.fromEntries(data);
    const parsed = listingFormSchema.safeParse(formData);

    if (!parsed.success) {
        const fields: Record<string, string> = {};

        for (const key of Object.keys(formData)) {
            fields[key] = formData[key].toString();
        }

        return {
            message: 'Invalid formdata',
            fields,
            issues: parsed.error.issues.map((issue) => issue.message),
        };
    }

    const listingId = randomUUID();
    const userId = identify.id;

    const { error: supabaseError } = await supabase
        .from('listings')
        .insert([
            {
            ...formData,
            id: listingId,
            user_id: userId,
            },
        ])
        
            
    if (supabaseError) {
        return {
            message: supabaseError.message
        }
    }

    revalidatePath('/');
    redirect('/');
}