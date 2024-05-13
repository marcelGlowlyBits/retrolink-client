import * as React from "react";
import {
  Flex,
  RadioGroup as PrimitiveRadioGroup,
  Text,
} from "@radix-ui/themes";

// eslint-disable-next-line react/display-name
export const RadioGroup = React.forwardRef<any, any>(
  ({ disabled, defaultValue, items, onChange, label }, ref) => (
    <Flex direction='column' gap='2'>
      {label && <Text>{label}</Text>}
      <PrimitiveRadioGroup.Root
        defaultValue={defaultValue}
        onValueChange={onChange}
        ref={ref}
      >
        <Flex gap='3' direction='column'>
          {items.map((item: any) => (
            <PrimitiveRadioGroup.Item value={item.value} key={item.value}>
              {item.label}
            </PrimitiveRadioGroup.Item>
          ))}
        </Flex>
      </PrimitiveRadioGroup.Root>
    </Flex>
  ),
);
