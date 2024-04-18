"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { revalidatePath } from 'next/cache'
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex } from '@radix-ui/themes';
import { TrackClick } from '@loglib/tracker/react';

import { Input } from '@/common/form/Input';

import { handleSubscriptionForm } from '../actions';

export type FormValues = z.infer<typeof subscriptionFormSchema>;

export const subscriptionFormSchema = z.object({
    firstName: z.string(),
    email: z.string().email()
  });

export const SubscriptionForm = () => {
    const { pending } = useFormStatus();
    const [isSubscribed, setIsSubscribed] = useState(false);
    
    const { register, formState: { errors, isValid, isLoading }, } = useForm<FormValues>({
        resolver: zodResolver(subscriptionFormSchema),
        defaultValues: {
          firstName: "",
          email: "",
        },
    });

    const onFormSubmit = async (formData: FormData) => {
       const response = await handleSubscriptionForm(formData);

       if (response.success) {
        alert('Je bent ingeschreven voor de nieuwsbrief!');
        setIsSubscribed(true);
    
       } else {
        alert('There was an error subscribing you to the newsletter. Please try again later.');
       }
      }

    return (
        <form action={onFormSubmit}>
            <Flex direction="column" gap="4" justify="center">
                <Input
                    errors={errors.firstName}
                    label="Voornaam"
                    type="text"
                    placeholder="Je voornaam hier"
                    {...register('firstName')}
                />
                 <Input
                    errors={errors.email}
                    label="Email addres"
                    type="email"
                    placeholder="Je email adres"
                    {...register('email')}
                />
                <TrackClick name="subscriptionformsignup" payload={{ trackedClick: "subscriptionformsignup"}}>
                  <Button size="4" mt="4" disabled={pending || !isValid || isSubscribed} loading={pending || isLoading} type="submit">Schrijf in voor nieuwsbrief</Button>
                </TrackClick>         
            </Flex>
      </form>
    )
};