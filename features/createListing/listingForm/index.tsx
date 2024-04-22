"use client";
import { z } from "zod";
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { zodResolver } from "@hookform/resolvers/zod";

// form components
import { Input } from '@/common/form/Input';
import { Select } from '@/common/form/Select';
import { Button, Flex } from '@radix-ui/themes';

import { listingFormSchema } from './schema';

const CategoryOptions = [
    { name: "Games", value: "GAMES" },
    { name: "Consoles", value: "CONSOLES" },
    { name: "Accessoires", value: "ACCESSOIRES" },
    { name: "Overig", value: "OTHER" },
]

const ConditionOptions = [
    { name: "Nieuw", value: "NEW" },
    { name: "Zo goed als nieuw", value: "GOODASNEW" },
    { name: "Gebruikt", value: "USED" },
]

const PlatformOptions = [
    { name: "Playstation 1", value: "PLAYSTATION1" },
    { name: "Playstation 2", value: "PLAYSTATION2" },
    { name: "Playstation 3", value: "PLAYSTATION3" },
    { name: "Playstation 4", value: "PLAYSTATION4" },
    { name: "Playstation 5", value: "PLAYSTATION5" },
    { name: "Xbox classic", value: "XBOXCLASSIC" },
    { name: "Xbox 360", value: "XBOX360" },
    { name: "Xbox One", value: "XBOXONE" },
    { name: "NES", value: "NES" },
    { name: "Super Nintendo", value: "SNES" },
    { name: "Gameboy", value: "GAMEBOYCLASSIC" },
    { name: "Gameboy Advance", value: "GAMEBOYADVANCE" },
    { name: "Nintendo 64", value: "NINTENDO64" },
    { name: "Gamecube", value: "GAMECUBE" },
    { name: "Wii", value: "WII" },
    { name: "Wii U", value: "WIIU" },
    { name: "Switch", value: "SWITCH" },
    { name: "PC", value: "PC" },
    { name: "Overig", value: "OTHER" },
];

export const CreateListingForm = () => {
    const createListing = useMutation(api.listings.createListing);
    type FormValues = z.infer<typeof listingFormSchema>;

    const { watch, register, handleSubmit, control, formState: { errors, isValid }, } = useForm<FormValues>({
        resolver: zodResolver(listingFormSchema),
        defaultValues: {
          title: "",
          description: "",
          price: 10,
          category: 'OTHER',
          condition: 'USED',
          platform: 'OTHER',
        },
    });

    const onSubmit = (data: any) => console.log('data', data);
    const values = watch();

    console.log('values', values);
    console.log('errors', errors);
    console.log('isVLaid', isValid);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="4">
                <Input
                    errors={errors.title}
                    label="Naam van het product."
                    type="text"
                    placeholder="Beschrijf het product met een simpele titel"
                    {...register('title')}
                />
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            defaultValue={field.value}
                            label="Vraagprijs voor het product."
                            type="number"
                            placeholder="Vraagprijs voor het product."
                            onChange={(e: any) => field.onChange(parseInt(e.target.value))}
                        />
                    )}
                />
                <Input
                    errors={errors.description}
                    label="Beschrijving van het product."
                    type="text"
                    placeholder="Geef een korte omschrijving van het product."
                    {...register('description')}
                />
                {/* HOE VOEG IK HIER VALIDATIE AAN TOE? */}
                <Controller
                    name="category"
                    control={control}
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
                    control={control}
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
                    control={control}
                    render={({ field }) => (
                    <Select
                        {...field}
                        label="Platform van het product"
                        defaultValue={"OTHER"}
                        items={PlatformOptions}
                    />
                    )}
                />
                <Button size="4" mt="4" disabled={!isValid} type="submit">Maak advertentie aan.</Button>
            </Flex>
        </form>
    )
}

