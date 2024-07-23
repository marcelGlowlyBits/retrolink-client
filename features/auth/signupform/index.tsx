'use client'
import * as React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { useFormState } from 'react-dom'

import { useZodForm } from '@/common/hooks/useZodForm'
import { Input } from '@/common/form/Input'
import { Callout } from '@/common/ui/callout'

import { signup } from '../actions'
import { SigninSchema as schema } from '../schema'

export const SignupForm = () => {
  const [state, formAction] = useFormState(signup, {
    message: '',
  })

  const formRef = React.useRef<HTMLFormElement>(null)
  const form = useZodForm(schema, {
    defaultValues: {
      email: '',
      password: '',
      ...(state?.fields ?? {}),
    },
  })

  return (
    <Flex gap="6" direction="column">
      {state?.message !== '' && !state.issues && (
        <Callout content={state.message} color="red" />
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
        <Flex gap="6" direction="column">
          <Flex direction="column" gap="4">
            <Input
              errors={form.formState.errors.email}
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...form.register('email')}
            />
            <Input
              errors={form.formState.errors.password}
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...form.register('password')}
            />
            {/* <Input
              errors={form.formState.errors.password}
              label='Username'
              type='text'
              placeholder='Choose a username'
              {...form.register("username")}
            /> */}
          </Flex>
          <Button size="4" type="submit" disabled={!form.formState.isValid}>
            Registreer account
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
