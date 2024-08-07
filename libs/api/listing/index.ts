'use server'
import { createClient } from '@/libs/supabase/server'
import { cache } from 'react'
import { randomUUID } from 'crypto'

import { getListingCardImage } from '@/libs/api/listings'

export const fetchListing = cache(async (id: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (data.images && data.images.length > 0) {
    const fetchedImages = await Promise.all(
      data.images.map(async (image: any) => {
        const imageUrl = getListingCardImage(image)
        return imageUrl
      })
    )

    return { ...data, fetchedImages: fetchedImages }
  } else {
    return data
  }
})

export const editListing = async (
  listingData: FormData,
  metaData: {
    listingId: string
    owner: string
  }
) => {
  const supabase = createClient()
  const identify = await supabase.auth.getUser()
  const userId = identify?.data?.user?.id
  const isOwner = Boolean(userId === metaData.owner)
  const formData = Object.fromEntries(listingData)

  // @TODO: Refactor this to be a proper response

  if (!identify || !userId) {
    throw new Error('User not authenticated')
  }

  if (!isOwner) {
    throw new Error('User is not authorized to edit this listing')
  }

  try {
    const { data: listingResponse, error } = await supabase
      .from('listings')
      .update(formData)
      .eq('id', metaData.listingId)
      .select('*')
      .single()

    if (error) {
      console.log('error', error)
      throw new Error(error.message)
    }

    return {
      response: 'Listing edited successfully',
      data: listingResponse,
    }
  } catch (e) {
    console.log('error', e)
    throw new Error()
  }
}

export const createListing = async (listingData: FormData): Promise<any> => {
  const supabase = createClient()
  const identify = await supabase.auth.getUser()
  const userId = identify?.data?.user?.id

  if (!identify || !userId) {
    throw new Error('User not authenticated')
  }

  const listingImages = listingData.getAll('images')

  const formData = Object.fromEntries(listingData)
  const listingId = randomUUID()

  // @TODO: We should do validation on the data object with ZOD

  try {
    if (listingImages && listingImages.length > 0) {
      const bucket_name = 'listing_images'

      const imageUrls = await Promise.all(
        listingImages.map(async (image: any) => {
          const { data, error } = await supabase.storage
            .from(bucket_name)
            .upload(`${listingId}/${image.name}`, image, {
              contentType: 'image/jpg',
              upsert: true,
            })

          if (error) {
            throw new Error(error.message)
          }

          return data.path
        })
      )

      const completeListingData = {
        ...formData,
        images: imageUrls,
        id: listingId,
        user_id: userId,
      }

      const { data: listingResponse, error } = await supabase
        .from('listings')
        .insert(completeListingData)
        .select('*')
        .single()

      if (error) {
        console.log('error', error)
        throw new Error(error.message)
      }

      return {
        response: 'Listing created successfully',
        data: listingResponse,
      }
    } else {
      const completeListingData = {
        ...formData,
        id: listingId,
        user_id: userId,
      }

      const { data: listingResponse, error } = await supabase
        .from('listings')
        .insert(completeListingData)
        .select('*')
        .single()

      if (error) {
        console.log('error', error)
        throw new Error(error.message)
      }

      return {
        response: 'Listing created successfully',
        data: listingResponse,
      }
    }
  } catch (e) {
    console.log('error', e)
    throw new Error()
  }
}
