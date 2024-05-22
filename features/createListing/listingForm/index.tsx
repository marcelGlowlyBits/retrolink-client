"use client";
import * as React from "react";
import { Controller } from "react-hook-form";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MdEuroSymbol, MdClose } from "react-icons/md";
import { Text, Section } from "@radix-ui/themes";
import Image from "next/image";
import Dropzone from "react-dropzone";

import { Input } from "@/common/form/Input";
import { Select } from "@/common/form/Select";
import { Textarea } from "@/common/form/TextArea";
import { RadioGroup } from "@/common/form/RadioGroup";
import { Button, Flex } from "@radix-ui/themes";
import { PlatformOptions } from "@/common/utils/platformOptions";
import { CategoryOptions } from "@/common/utils/categoryOptions";
import { ConditionOptions } from "@/common/utils/conditionOptions";
import { useZodForm } from "@/common/hooks/useZodForm";

import { listingFormSchema } from "./schema";
import styles from "./styles.module.css";

export const CreateListingForm = () => {
  const createListing = useMutation(api.listings.createListing);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [images, setImages] = React.useState<File[]>([]);

  const form = useZodForm(listingFormSchema, {
    defaultValues: {
      title: "",
      category: undefined,
      condition: undefined,
      platform: undefined,
      price: 0,
      description: "",
      hasDamage: false,
      preferenceOfShipping: "PICKUP",
    },
  });

  const hasDamageCheck = form.watch("hasDamage");
  const canBeShipped = form.watch("preferenceOfShipping");

  React.useEffect(() => {
    if (hasDamageCheck) {
      form.register("damageDescription");
    } else {
      form.unregister("damageDescription");
    }
  }, [form, form.register, form.unregister, hasDamageCheck]);

  React.useEffect(() => {
    if (canBeShipped === "SEND" || canBeShipped === "BOTH") {
      form.register("payForShipping");
    } else {
      form.unregister("payForShipping");
    }
  }, [form, form.register, form.unregister, canBeShipped]);

  const uploadImages = async () => {
    const promises = images.map(async (image) => {
      const uploadUrl = await generateUploadUrl();

      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": image!.type },
        body: image,
      });

      const data = await response.json();
      console.log(data);
      return data.storageId;
    });

    return await Promise.all(promises);
  };

  const onSubmit = async (data: any) => {
    console.log("halo", data);
    await uploadImages()
      .then((storageIds) => {
        data.images = storageIds;

        return createListing(data);
      })
      .then(() => {
        alert("Advertentie succesvol aangemaakt.");
        form.reset();
      });
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex direction='column' gap='5'>
          <Dropzone
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length >= 3) {
                return null;
              }

              setImages([...images, ...acceptedFiles]);
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
          <Flex direction='row' gap='5'>
            {images.length > 0 &&
              images.map((image, index) => (
                <Flex direction='row' gap='5' key={index}>
                  <Image
                    src={URL.createObjectURL(image)}
                    width={200}
                    height={200}
                    alt='ja tis goed'
                  />
                  <Button
                    size='2'
                    onClick={() => {
                      const newImages = [...images];
                      newImages.splice(index, 1);
                      setImages(newImages);
                    }}
                  >
                    <MdClose />
                  </Button>
                </Flex>
              ))}
          </Flex>

          <Input
            errors={form.formState.errors.title}
            label='Naam van het product.'
            type='text'
            placeholder='Beschrijf het product met een simpele titel'
            {...form.register("title")}
          />
          <Controller
            name='category'
            control={form.control}
            render={({ field }) => (
              <Select
                {...field}
                label='Categorie'
                defaultValue={form.formState.defaultValues!.category}
                items={CategoryOptions}
              />
            )}
          />
          <Controller
            name='condition'
            control={form.control}
            render={({ field }) => (
              <Select
                {...field}
                label='Staat van het product'
                defaultValue={form.formState.defaultValues!.condition}
                items={ConditionOptions}
              />
            )}
          />
          <Controller
            name='platform'
            control={form.control}
            render={({ field }) => (
              <Select
                {...field}
                label='Platform van het product'
                defaultValue={form.formState.defaultValues!.platform}
                items={PlatformOptions}
              />
            )}
          />
          <Input
            errors={form.formState.errors.price}
            label='Vraagprijs van het product'
            type='number'
            icon={<MdEuroSymbol />}
            placeholder="Vraagprijs van het product in euro's"
            {...form.register("price", {
              setValueAs: (value) => parseInt(value || 0),
            })}
          />
          <Textarea
            errors={form.formState.errors.description}
            label='Beschrijving van het product.'
            type='text'
            placeholder='Geef een korte omschrijving van het product.'
            {...form.register("description")}
          />
          <Controller
            name='hasDamage'
            control={form.control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                label='Heeft het product schade?'
                defaultValue={form.formState.defaultValues!.hasDamage}
                items={[
                  { label: "Ja", value: true },
                  { label: "Nee", value: false },
                ]}
              />
            )}
          />
          {hasDamageCheck ? (
            <Textarea
              errors={form.formState.errors.damageDescription}
              label='Beschrijf de schade.'
              type='text'
              placeholder='Beschrijf de schade van het product.'
              {...form.register("damageDescription")}
            />
          ) : null}

          <Controller
            name='preferenceOfShipping'
            control={form.control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                label='Voorkeur van verzending/afhalen'
                defaultValue={form.formState.defaultValues!.payForShipping}
                items={[
                  {
                    label: "Koper moet het product komen ophalen.",
                    value: "PICKUP",
                  },
                  {
                    label: "Product wordt verzonden naar de koper.",
                    value: "SEND",
                  },
                  {
                    label: "Ophalen en verzenden is beide mogelijk.",
                    value: "BOTH",
                  },
                ]}
              />
            )}
          />

          {canBeShipped === "SEND" || canBeShipped === "BOTH" ? (
            <Controller
              name='payForShipping'
              control={form.control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  label='Wie betaalt de verzendkosten?'
                  defaultValue={form.formState.defaultValues!.payForShipping}
                  items={[
                    { label: "Verkoper", value: "SELLER" },
                    { label: "Koper", value: "BUYER" },
                  ]}
                />
              )}
            />
          ) : null}

          <Button
            size='4'
            mt='4'
            disabled={!form.formState.isValid}
            type='submit'
          >
            Maak advertentie aan.
          </Button>
        </Flex>
      </form>
    </>
  );
};
