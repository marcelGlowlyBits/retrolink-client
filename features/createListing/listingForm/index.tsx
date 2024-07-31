'use client'
import * as React from 'react'
import { Controller } from 'react-hook-form'
import { Button, Flex } from '@radix-ui/themes'

import { MdEuroSymbol, MdClose } from 'react-icons/md'
import { Text, Section } from '@radix-ui/themes'
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

import { useZodForm } from '@/common/hooks/useZodForm'

import { listingFormSchema } from './schema'
import styles from './styles.module.css'

import { createListing } from '@/libs/api/listing'

export const CreateListingForm = () => {
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
    const listingData = new FormData()

    for (const key in data) {
      listingData.append(key, data[key])
    }

    if (images.length > 0) {
      for (const image of images) {
        listingData.append('images', image)
      }
    }

    await createListing(listingData)
      .then((res) => {
        // @TODO: Rond dit mooi af

        alert(' ja manman')
      })
      .catch((e) => {
        // @TODO: Rond dit mooi af
        alert(e)
      })
  }

  console.log('values', form.watch())

  // @TODO voor de pricing:
  // - Prijs wordt gewoon weer strings,
  // - implementeer een regex pattern die checkt of het een geldig bedrag is. Dus geen letters. Alleen cijfers en komma's.
  // - bij het opslaan van de data, zet de prijs om naar een number.
  // - de prijs wordt geconverteerd naar centen.
  // - bij het tonen van de prijs, zet de prijs om naar een volledig bedrag. Dus 1000 wordt 10,00.

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
        <Flex direction="column" gap="5">
          <Flex direction="row" gap="5">
            {images.length > 0 &&
              images.map((image, index) => (
                <Flex direction="row" gap="5" key={index}>
                  <Image
                    src={URL.createObjectURL(image)}
                    width={200}
                    height={200}
                    alt="ja tis goed"
                  />
                  <Button
                    size="2"
                    onClick={() => {
                      const newImages = [...images]
                      newImages.splice(index, 1)
                      setImages(newImages)
                    }}
                  >
                    <MdClose />
                  </Button>
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
            type="number"
            icon={<MdEuroSymbol />}
            placeholder="Vraagprijs van het product in euro's"
            {...form.register('price', {
              setValueAs: (value) => parseInt(value || 0),
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
                defaultValue={form.formState.defaultValues!.payForShipping}
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
            // @TODO: Ga hier verder.
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
