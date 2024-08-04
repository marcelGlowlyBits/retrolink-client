'use client'
import * as React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useFormState } from 'react-dom'

import { Input } from '@/common/form/Input'
import { Callout } from '@/common/ui/callout'
import { useZodForm } from '@/common/hooks/useZodForm'

import { EditUsername } from '../actions'
import { UsernameSchema as schema } from '../schema'

export const UsernameForm = () => {
  const [state, formAction] = useFormState(EditUsername, {
    message: '',
  })

  const formRef = React.useRef<HTMLFormElement>(null)
  const form = useZodForm(schema, {
    defaultValues: {
      username: '',
      ...(state?.fields ?? {}),
    },
  })

  return (
    <Flex gap="6" direction="column">
      {state?.message !== '' && !state.issues && (
        <Callout content={state.message} color="red" />
      )}
      <Flex direction="column" gap="4">
        <Text>
          Kies een unieke gebruikersnaam waarmee jij je kan onderscheiden op
          Retrolink.
        </Text>
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
          <Flex direction="column" gap="6">
            <Input
              errors={form.formState.errors.username}
              label="Username"
              type="text"
              placeholder="Enter your username"
              {...form.register('username')}
            />
            <Button size="4" type="submit" disabled={!form.formState.isValid}>
              Save
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  )
}
