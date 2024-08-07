'use client'
import * as React from 'react'
import { useFormState } from 'react-dom'
import { Avatar, DataList, Flex, Button } from '@radix-ui/themes'
import { Callout } from '@/common/ui/callout'

import { MdEdit, MdClose } from 'react-icons/md'

import { Heading } from '@/common/typography'
import { useZodForm } from '@/common/hooks/useZodForm'
import { Input } from '@/common/form/Input'
import { useToast } from '@/common/hooks/useToast'
import { editUsername } from '../../actions'

import { editProfileSchema as schema } from './schema'

type ProfileAccountDataProps = {
  user: any
  isOwner: boolean
}

export const ProfileAccountData = ({
  user,
  isOwner,
}: ProfileAccountDataProps) => {
  const toast = useToast()
  const [state, formAction] = useFormState(editUsername, {
    message: '',
    success: false,
  })
  const [editMode, setEditMode] = React.useState(false)

  const formRef = React.useRef<HTMLFormElement>(null)
  const form = useZodForm(schema, {
    defaultValues: {
      username: user?.username,
      ...(state?.fields ?? {}),
    },
  })

  React.useEffect(() => {
    if (state.success) {
      toast.showToast({ description: 'Username updated' })
      setEditMode(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success])

  return (
    <Flex direction="column" gap="6">
      {user && (
        <>
          <Heading size="5">Avatar</Heading>
          <Avatar
            radius="medium"
            fallback={
              user?.username?.charAt(0)?.toUpperCase() ||
              user.email.charAt(0).toUpperCase()
            }
            size="8"
            src={user?.image_url}
          />
          <Flex direction="column" gap="4">
            <Heading size="3">Account details</Heading>
            {state?.message !== '' && !state?.issues && state.error && (
              <Callout content={state?.message || ''} color="red" />
            )}
            <form
              ref={formRef}
              action={formAction}
              onSubmit={(evt) => {
                evt.preventDefault()
                form.handleSubmit(() => {
                  formAction(new FormData(formRef.current!))
                })(evt)
              }}
            >
              <DataList.Root
                orientation={{ initial: 'vertical', sm: 'horizontal' }}
              >
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
                            {user?.username || (
                              <i>Geen gebruikersnaam toegevoegd</i>
                            )}
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
                      {user?.username || <i>Geen gebruikersnaam toegevoegd</i>}
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
