import { cache } from 'react'
import { createClient } from '@/libs/supabase/server'

export const getListings = cache(async (): Promise<any> => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from('listings').select('*')

    const response = data?.map((listing: any) => {
      if (listing.images !== null && listing.images.length > 0) {
        const firstImage = listing.images[0]

        return {
          ...listing,
          frontImage: getListingCardImage(firstImage),
        }
      } else {
        return listing
      }
    })

    if (error) {
      throw error
    }

    return response
  } catch (error) {
    console.error(error)
  }
})

export const getListingCardImage = cache((imgPath: string) => {
  const supabase = createClient()

  const { data } = supabase.storage.from('listing_images').getPublicUrl(imgPath)

  return data.publicUrl
})

export const getListingsByUserId = cache(
  async (userId: string): Promise<any> => {
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', userId)
      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error(error)
    }
  }
)
