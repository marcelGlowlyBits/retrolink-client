'use client';
import * as React from 'react';
import { Select as RadixSelect, Flex, Text } from '@radix-ui/themes';

type RadixSelectProps = {
  defaultValue: string;
  items: any[];
  disabled?: boolean;
  onChange: (value: string) => void;
  label?: string;
};

// eslint-disable-next-line react/display-name
export const Select = React.forwardRef<HTMLInputElement, RadixSelectProps>(({
    defaultValue, disabled, items, onChange, label }, ref) => (
            <Flex direction="column" gap="2" style={{ maxHeight: '150px' }}>
        {label && <Text>{label}</Text>}
        <RadixSelect.Root
            onValueChange={onChange}
            defaultValue={defaultValue}
            disabled={disabled}
        >
        <RadixSelect.Trigger />
        <RadixSelect.Content >
            {items.map((item) => (
            <RadixSelect.Item
                key={`${item.id}_${item.value}`}
                value={item.value}
            >
                {item.name}
            </RadixSelect.Item>
            ))}
        </RadixSelect.Content>
        </RadixSelect.Root>
    </Flex>
    )
);
