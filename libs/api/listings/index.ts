import { cache } from 'react';
import { createClient } from '@/libs/supabase/server';

export const getListings = cache(async (): Promise<any> => {
    const supabase = createClient();

    try {
        const { data, error } = await supabase.from('listings').select('*');

        if (error) {
            throw error;
        }

        return data;
        
    } catch(error) {
        console.error(error);
    }

});

export const getListingCardImage = cache((imgPath: string) => {
    const supabase = createClient();

    const { data } = supabase.storage.from('listing_images').getPublicUrl(imgPath)

    return data.publicUrl;

})