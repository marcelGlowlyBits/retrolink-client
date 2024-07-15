import { Callout as CalloutPrimitive } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const Callout = ({
  content,
  color,
}: {
  content: string;
  color: "red" | "blue" | "green";
}) => {
  return (
    <CalloutPrimitive.Root size='2' variant='soft' {...{ color }} highContrast>
      <CalloutPrimitive.Icon>
        <ExclamationTriangleIcon />
      </CalloutPrimitive.Icon>
      <CalloutPrimitive.Text>{content}</CalloutPrimitive.Text>
    </CalloutPrimitive.Root>
  );
};
