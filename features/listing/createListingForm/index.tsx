'use client'
import * as React from 'react'
import { Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button, Flex, Text, Section, IconButton } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons'

import { MdEuroSymbol } from 'react-icons/md'
import Image from 'next/image'
import Dropzone from 'react-dropzone'

import { Input } from '@/common/form/Input'
import { Select } from '@/common/form/Select'
import { Textarea } from '@/common/form/TextArea'
import { RadioGroup } from '@/common/form/RadioGroup'
import { PlatformOptions } from '@/common/utils/platformOptions'
import { CategoryOptions } from '@/common/utils/categoryOptions'
import { ConditionOptions } from '@/common/utils/conditionOptions'
import { PreferenceOfShippingOptions } from '@/common/utils/preferenceOfShippingOptions'
import { PayForShippingOptions } from '@/common/utils/payForShippingOptions'
import { toCents } from '@/common/utils/formatPricing'

import { useDialog } from '@/common/hooks/useDialog'
import { useZodForm } from '@/common/hooks/useZodForm'

import { listingFormSchema } from './schema'
import styles from './styles.module.css'

import { createListing } from '@/libs/api/listing'
import useIsSmallScreen from '@/common/hooks/useIsSmallScreen'
import { useToast } from '@/common/hooks/useToast'

export const CreateListingForm = () => {
  const router = useRouter()
  const dialog = useDialog()
  const toast = useToast()
  const isSmallScreen = useIsSmallScreen()
  const [images, setImages] = React.useState<File[]>([])

  const form = useZodForm(listingFormSchema, {
    defaultValues: {
      title: '',
      category: undefined,
      condition: undefined,
      platform: undefined,
      price: undefined,
      description: '',
      hasDamage: undefined,
      preferenceOfShipping: undefined,
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
    dialog.openDialog({
      title: 'Advertentie aanmaken',
      description: 'Even geduld, we zijn je advertentie aan het aanmaken.',
    })

    const listingData = new FormData()

    for (const key in data) {
      listingData.append(key, key === 'price' ? toCents(data[key]) : data[key])
    }

    if (images.length > 0) {
      for (const image of images) {
        listingData.append('images', image)
      }
    }

    await createListing(listingData)
      .then((res) => {
        toast.showToast({
          title: 'Advertentie aangemaakt',
          description: 'Je advertentie is succesvol aangemaakt.',
        })

        router.push(`/advertentie/${res.data.id}`)
      })
      .catch((e) => {
        console.error(e)

        toast.showToast({
          title: 'Er is iets misgegaan',
          description:
            'Er is iets misgegaan bij het aanmaken van de advertentie.',
        })
      })
      .finally(() => {
        dialog.closeDialog()
      })
  }

  return (
    <Flex gap="6" direction="column">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dropzone
          minSize={0}
          maxSize={5242880}
          maxFiles={3}
          accept={{ 'image/jpeg': [], 'image/png': [], 'image/webp': [] }}
          onDrop={(acceptedFiles) => {
            setImages([...images, ...acceptedFiles])
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section className={styles.dropzone}>
              <Section {...getRootProps()}>
                <input {...getInputProps()} />
                <Text>
                  Drag and drop afbeeldingen hier, of klik om afbeeldingen te
                  selecteren.
                </Text>
              </Section>
            </section>
          )}
        </Dropzone>
        <Flex direction="column" gap="5" mt="5">
          <Flex direction="row" wrap="wrap" gap="5">
            {images.length > 0 &&
              images.map((image, index) => (
                <Flex direction="row" gap="2" key={index}>
                  <Image
                    src={URL.createObjectURL(image)}
                    width={isSmallScreen ? 100 : 175}
                    height={isSmallScreen ? 100 : 175}
                    alt="ja tis goed"
                  />
                  <IconButton
                    size="1"
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const newImages = [...images]
                      newImages.splice(index, 1)
                      setImages(newImages)
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Flex>
              ))}
          </Flex>

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
                  const formattedValue = numericValue
                    .toFixed(2)
                    .replace('.', ',')
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

          <Button
            size="4"
            mt="4"
            disabled={!form.formState.isValid}
            type="submit"
          >
            Maak advertentie aan.
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
