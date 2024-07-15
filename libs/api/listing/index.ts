'use server';
import { createClient } from '@/libs/supabase/server';
import { cache } from 'react';
import { randomUUID } from 'crypto'

export const fetchListing = cache(async(id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
})

export const createListing = async (listingData: FormData): Promise<any> => {
  const supabase = createClient();
  const identify = await supabase.auth.getUser();
  const userId = identify?.data?.user?.id;
  
  if (!identify || !userId) {

    throw new Error('User not authenticated')
  }
    
  const listingImages = listingData.getAll('images');

  const formData = Object.fromEntries(listingData);
  const listingId = randomUUID();

  // @TODO: We should do validation on the data object

  try {
    if (listingImages && listingImages.length > 0) {
      const bucket_name = 'listing_images';

      const imageUrls = await Promise.all(
        listingImages.map(async (image: any) => {

          const { data, error } = await supabase.storage
            .from(bucket_name)
            .upload(`${listingId}/${image.name}`, image, {
              contentType: 'image/jpg',
              upsert: true
          });

          if (error) {
            throw new Error(error.message);
          }

          return data.path;
        })
      );

      const completeListingData = {
        ...formData,
        images: imageUrls,
        id: listingId,
        user_id: userId,
      }
  
      const { error } = await supabase.from('listings').insert(completeListingData);

      if (error) {
        console.log('error', error);
        throw new Error(error.message);
      }

      return {
        response: 'Listing created successfully',
      };


    } else {
      const completeListingData = {
        ...formData,
        id: listingId,
        user_id: userId,
      }

      const { error } = await supabase.from('listings').insert(completeListingData);

      if (error) {
        console.log('error', error);
        throw new Error(error.message);
      }

      return {
        response: 'Listing created successfully',
      };
    }

  } catch(e) {
    throw new Error(e.message);
  }
}