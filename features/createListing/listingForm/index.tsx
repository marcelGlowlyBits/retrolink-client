"use client";
import { Controller } from 'react-hook-form';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { MdEuroSymbol } from "react-icons/md";

import { Input } from '@/common/form/Input';
import { Select } from '@/common/form/Select';
import { Textarea } from '@/common/form/TextArea';
import { Button, Flex } from '@radix-ui/themes';
import { PlatformOptions } from "@/common/utils/platformOptions";
import { CategoryOptions } from "@/common/utils/categoryOptions";
import { ConditionOptions } from '@/common/utils/conditionOptions';
import { useZodForm } from "@/common/hooks/useZodForm";

import { listingFormSchema } from './schema';

export const CreateListingForm = () => {
    const createListing = useMutation(api.listings.createListing);

    const form = useZodForm(listingFormSchema, {});

    const onSubmit = async (data: any) => {
        await createListing(data)
            .then(() => {
                alert('Advertentie succesvol aangemaakt.')
                form.reset();
            })
            .catch((error) => {
                console.error(error)
            })
    }

    // For now, we show an html alert when the creation of a listing is successful.
    // In the future, we will redirect the user to the newly created listing. With a seperate callout component.

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex direction="column" gap="4">
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
                    render={({ field }) => (
                        <Select
                        {...field}
                        label="Categorie"
                        defaultValue={"OTHER"}
                        items={CategoryOptions}
                    />
                    )}
                    />
                <Controller
                    name="condition"
                    control={form.control}
                    render={({ field }) => (
                    <Select
                        {...field}
                        label="Staat van het product"
                        defaultValue={"NEW"}
                        items={ConditionOptions}
                    />
                    )}
                />
                   <Controller
                    name="platform"
                    control={form.control}
                    render={({ field }) => (
                    <Select
                        {...field}
                        label="Platform van het product"
                        defaultValue={"OTHER"}
                        items={PlatformOptions}
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
                        setValueAs: (value) => parseInt(value || 0)
                    })}
                />
                <Textarea
                    errors={form.formState.errors.description}
                    label="Beschrijving van het product."
                    type="text"
                    placeholder="Geef een korte omschrijving van het product."
                    {...form.register('description')}
                />
             
            
                <Button size="4" mt="4" disabled={!form.formState.isValid} type="submit">Maak advertentie aan.</Button>
            </Flex>
        </form>
    )
}

