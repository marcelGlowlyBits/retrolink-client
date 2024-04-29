"use client"
import * as React from 'react';
import { Avatar, DataList, Flex, Heading, Spinner, Button } from '@radix-ui/themes';
import { Id } from '@/convex/_generated/dataModel';
import { MdEdit, MdClose } from 'react-icons/md';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { useGetUserProfile } from '@/common/hooks/useGetUserProfile';
import { useGetMyUser } from '@/common/hooks/useGetMyUser';
import { useZodForm } from "@/common/hooks/useZodForm";
import { Input } from '@/common/form/Input';

import { editProfileSchema } from './schema';

export const ProfileAccountData = ({ userId }: { userId: Id<"users">}) => {
    const [editMode, setEditMode] = React.useState(false);
    const { user, isLoading } = useGetUserProfile({ userId: userId });
    const { user: myUser, isAuthenticated, isLoading: isAuthLoading } = useGetMyUser();
    const isOwner = myUser?.userId === userId;
    const updateMyUser = useMutation(api.users.updateMyUser);

    const form = useZodForm(editProfileSchema, {});

    const onSubmit = async (data: { username: string }) => {
        await updateMyUser(data).then(() => {
            alert('Profiel succesvol bijgewerkt.')
            form.reset();
            setEditMode(false)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    return (
        <Flex direction="column" gap="6">
        <Spinner size="3" loading={isAuthLoading || isLoading}>
            {user && (
            <>
             <Heading size="5">Profielfoto</Heading>
             <Avatar radius="medium" fallback="t" size="8" src={user?.image_url} />
                 <Flex direction="column" gap="4">
                     <Heading size="3">Account details</Heading>
                     <form onSubmit={form.handleSubmit(onSubmit)}>
                     <DataList.Root>
                         <DataList.Item>
                             <DataList.Label>Gebruikersnaam</DataList.Label>
                            {isAuthenticated && isOwner ? (
                                <Flex align="center" gap="2">
                                    {editMode ? (
                                        <>
                                        <Input 
                                            errors={form.formState.errors.username}
                                            type="text"
                                            placeholder={user.username}
                                            value={user.username}
                                            {...form.register('username')}
                                        />
                                            <MdClose style={{ cursor: 'pointer' }} onClick={() => setEditMode(!editMode)} />
                                        </>
                                    ) : (
                                        <>
                                            <DataList.Value>{user?.username}</DataList.Value>
                                            <MdEdit style={{ cursor: 'pointer' }} onClick={() => setEditMode(!editMode)} />
                                        </>
                                    )}
                                    
                                </Flex>
                            ) : (
                                <DataList.Value>{user?.username}</DataList.Value>
                            )}
                         </DataList.Item>
                         <DataList.Item>
                             <DataList.Label>Email</DataList.Label>
                             <DataList.Value>{user?.email}</DataList.Value>
                         </DataList.Item>
                        {process.env.NODE_ENV === 'development' && (
                            <DataList.Item>
                                <DataList.Label>user Id</DataList.Label>
                                <DataList.Value>{user?.userId}</DataList.Value>
                            </DataList.Item>
                        )}
                     </DataList.Root>
                        {editMode && isOwner && (
                            <Flex direction="row" gap="5" mt="9">
                                <Button size="2" disabled={!form.formState.isValid || !form.formState.isDirty} type="submit">Wijzingen opslaan</Button>
                                <Button style={{ alignSelf: 'center'}} size="2" variant="ghost" onClick={() => setEditMode(false)}>Annuleren</Button>
                            </Flex>
                        )}
                     </form>
                 </Flex>   
            </>
            )}
        </Spinner>
        </Flex>
    )
}