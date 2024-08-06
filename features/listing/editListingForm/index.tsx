'use client'
import * as React from 'react'
import { Controller } from 'react-hook-form'
import { Button, Flex } from '@radix-ui/themes'
import { MdEuroSymbol } from 'react-icons/md'

// Image Edit will be picked up in the future.
import { Link } from '@/common/ui/link'
import { IListing } from '@/common/types/listings'
import { Input } from '@/common/form/Input'
import { Select } from '@/common/form/Select'
import { Textarea } from '@/common/form/TextArea'
import { RadioGroup } from '@/common/form/RadioGroup'
import { PlatformOptions } from '@/common/utils/platformOptions'
import { CategoryOptions } from '@/common/utils/categoryOptions'
import { ConditionOptions } from '@/common/utils/conditionOptions'
import { PreferenceOfShippingOptions } from '@/common/utils/preferenceOfShippingOptions'
import { PayForShippingOptions } from '@/common/utils/payForShippingOptions'
import { toEuros } from '@/common/utils/formatPricing'
import { toCents } from '@/common/utils/formatPricing'

import { useZodForm } from '@/common/hooks/useZodForm'
import { listingFormSchema } from './schema'

import { editListing } from '@/libs/api/listing'

export const ListingEditForm = ({ listing }: { listing: IListing }) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useZodForm(listingFormSchema, {
    defaultValues: {
      title: listing.title,
      category: listing.category,
      condition: listing.condition,
      platform: listing.platform,
      price: toEuros(listing.price),
      description: listing.description,
      hasDamage: listing.hasDamage,
      damageDescription: listing.damageDescription,
      preferenceOfShipping: listing.preferenceOfShipping,
      payForShipping: listing.payForShipping,
    },
  })

  const hasDamageCheck = form.watch('hasDamage')
  const canBeShipped = form.watch('preferenceOfShipping')

  React.useEffect(() => {
    if (hasDamageCheck) {
      form.register('damageDescription')
    } else {
      form.unregister('damageDescription')
    }
  }, [form, form.register, form.unregister, hasDamageCheck])

  React.useEffect(() => {
    if (canBeShipped === 'SEND' || canBeShipped === 'BOTH') {
      form.register('payForShipping')
    } else {
      form.unregister('payForShipping')
    }
  }, [form, form.register, form.unregister, canBeShipped])

  const onSubmit = async (data: any) => {
    const listingMetaData = {
      listingId: listing.id,
      owner: listing.user_id,
    }

    const updatedListingData = new FormData()

    for (const key in data) {
      updatedListingData.append(
        key,
        key === 'price' ? toCents(data[key]) : data[key]
      )
    }

    setIsLoading(true)

    await editListing(updatedListingData, listingMetaData)
      .then((res) => {
        // @TODO: Show dialog with loading spinner and eventually the success message.
        // @TODO: After user presses confirm, redirect to the listing page.
        console.log('res', res)
      })
      .catch((e) => {
        // @TODO: Show dialog with error message.
        alert(e)
      })

    return
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Flex direction="column" gap="5">
        <Input
          errors={form.formState.errors.title}
          label="Naam van het product."
          type="text"
          placeholder="Beschrijf het product met een simpele titel"
          {...form.register('title')}
        />
        <Controller
          name="category"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              label="Categorie"
              defaultValue={form.formState.defaultValues!.category}
              items={CategoryOptions}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="condition"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              label="Staat van het product"
              defaultValue={form.formState.defaultValues!.condition}
              items={ConditionOptions}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="platform"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              label="Platform van het product"
              defaultValue={form.formState.defaultValues!.platform}
              items={PlatformOptions}
              onChange={onChange}
            />
          )}
        />
        <Input
          errors={form.formState.errors.price}
          label="Vraagprijs van het product"
          icon={<MdEuroSymbol />}
          placeholder="Vraagprijs van het product in euro's"
          {...form.register('price', {
            onBlur: (e) => {
              if (e.target.value.length === 0) {
                return form.setValue('price', '0,00')
              }

              const formatPrice = (value: string): string => {
                const numericValue = parseFloat(value.replace(',', '.'))
                const formattedValue = numericValue.toFixed(2).replace('.', ',')
                return formattedValue
              }

              const formattedValue = formatPrice(e.target.value)

              e.target.value = formattedValue

              form.setValue('price', formattedValue)
            },
          })}
        />
        <Textarea
          errors={form.formState.errors.description}
          label="Beschrijving van het product."
          type="text"
          placeholder="Geef een korte omschrijving van het product."
          {...form.register('description')}
        />
        <Controller
          name="hasDamage"
          control={form.control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              label="Heeft het product schade?"
              defaultValue={form.formState.defaultValues!.hasDamage}
              items={[
                { label: 'Ja', value: true },
                { label: 'Nee', value: false },
              ]}
            />
          )}
        />
        {hasDamageCheck ? (
          <Textarea
            errors={form.formState.errors.damageDescription}
            label="Beschrijf de schade."
            type="text"
            placeholder="Beschrijf de schade van het product."
            {...form.register('damageDescription')}
          />
        ) : null}
        <Controller
          name="preferenceOfShipping"
          control={form.control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              label="Voorkeur van verzending/afhalen"
              defaultValue={form.formState.defaultValues!.preferenceOfShipping}
              items={PreferenceOfShippingOptions}
            />
          )}
        />
        {canBeShipped === 'SEND' || canBeShipped === 'BOTH' ? (
          <Controller
            name="payForShipping"
            control={form.control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                label="Wie betaalt de verzendkosten?"
                defaultValue={form.formState.defaultValues!.payForShipping}
                items={PayForShippingOptions}
              />
            )}
          />
        ) : null}
        <Flex direction="row" gap="4" mt="4">
          <Button
            size="4"
            disabled={
              (!form.formState.isValid && !form.formState.isDirty) ||
              !form.formState.isDirty ||
              isLoading
            }
            type="submit"
          >
            Wijzig advertentie
          </Button>
          <Link
            href={`/profile/${listing.user_id}`}
            label="Annuleer"
            as="button"
            buttonVariant="outline"
          />
        </Flex>
      </Flex>
    </form>
  )
}
