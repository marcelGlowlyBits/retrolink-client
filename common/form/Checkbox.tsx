import * as React from "react";
import { Flex, Checkbox as PrimitiveCheckbox, Text } from "@radix-ui/themes";

// eslint-disable-next-line react/display-name
export const Checkbox = React.forwardRef<HTMLButtonElement, any>(
  ({ label, disabled, onChange, defaultValue }, ref) => (
    <Text as='label'>
      <Flex gap='2' align='center'>
        <PrimitiveCheckbox
          disabled={disabled}
          onCheckedChange={onChange}
          ref={ref}
          defaultChecked={defaultValue}
        />
        {label}
      </Flex>
    </Text>
  ),
);
