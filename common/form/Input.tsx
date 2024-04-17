import * as React from 'react';
import { Flex, Text, TextField } from '@radix-ui/themes';

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, onBlur, name, placeholder, errors, type, disabled, description, label }, ref) => (
    <Flex
      direction="column"
      gap="2"
      style={{ maxHeight: '150px' }}
    >
      {label && <Text>{label}</Text>}
      <TextField.Root
          variant="surface"
          size="3"
          type={type}
          name={name}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          >
      </TextField.Root>
      {description && (
        <Text
          size="1"
          style={{
            color: 'gray',
            fontStyle: 'italic',
          }}
        >
          {description}
        </Text>
      )}
      {errors && <Text color="red">{errors.message}</Text>}
    </Flex>
  ),
);

type InputProps = {
  description: string;
  label: string;
} & ReturnType<any>;
