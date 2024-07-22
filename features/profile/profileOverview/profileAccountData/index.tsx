'use client'
import * as React from 'react'
import { Avatar, DataList, Flex, Spinner, Button } from '@radix-ui/themes'

import { MdEdit, MdClose } from 'react-icons/md'

import { useGetUserProfile } from '@/common/hooks/useGetUserProfile'
import { Heading } from '@/common/typography'
import { useGetMyUser } from '@/common/hooks/useGetMyUser'
import { useZodForm } from '@/common/hooks/useZodForm'
import { Input } from '@/common/form/Input'

import { editProfileSchema } from './schema'

type ProfileAccountDataProps = {
  user: any
  isOwner: boolean
}

export const ProfileAccountData = ({
  user,
  isOwner,
}: ProfileAccountDataProps) => {
  const [editMode, setEditMode] = React.useState(false)

  const form = useZodForm(editProfileSchema, {
    defaultValues: {
      username: user?.username,
    },
  })

  const onSubmit = async (data: { username: string }) => {
    // @TODO: Implement this with supabase
    return null
  }

  return (
    <Flex direction="column" gap="6">
      {user && (
        <>
          <Heading size="5">Avatar</Heading>
          <Avatar radius="medium" fallback="t" size="8" src={user?.image_url} />
          <Flex direction="column" gap="4">
            <Heading size="3">Account details</Heading>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DataList.Root>
                <DataList.Item>
                  <DataList.Label>Gebruikersnaam</DataList.Label>
                  {isOwner ? (
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
                          <MdClose
                            style={{ cursor: 'pointer' }}
                            onClick={() => setEditMode(!editMode)}
                          />
                        </>
                      ) : (
                        <>
                          <DataList.Value>
                            {user?.username || 'Geen gebruikersnaam toegevoegd'}
                          </DataList.Value>
                          <MdEdit
                            style={{ cursor: 'pointer' }}
                            onClick={() => setEditMode(!editMode)}
                          />
                        </>
                      )}
                    </Flex>
                  ) : (
                    <DataList.Value>
                      {user?.username || 'Geen gebruikersnaam toegevoegd'}
                    </DataList.Value>
                  )}
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label>Email</DataList.Label>
                  <DataList.Value>{user?.email}</DataList.Value>
                </DataList.Item>
                {process.env.NODE_ENV === 'development' && (
                  <DataList.Item>
                    <DataList.Label>user Id</DataList.Label>
                    <DataList.Value>{user?.id}</DataList.Value>
                  </DataList.Item>
                )}
              </DataList.Root>
              {editMode && isOwner && (
                <Flex direction="row" gap="5" mt="9">
                  <Button
                    size="2"
                    disabled={!form.formState.isValid || !form.formState.isDirty}
                    type="submit"
                  >
                    Wijzingen opslaan
                  </Button>
                  <Button
                    style={{ alignSelf: 'center' }}
                    size="2"
                    variant="ghost"
                    onClick={() => setEditMode(false)}
                  >
                    Annuleren
                  </Button>
                </Flex>
              )}
            </form>
          </Flex>
        </>
      )}
    </Flex>
  )
}
