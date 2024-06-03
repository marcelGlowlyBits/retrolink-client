import { Heading as HeadingPrimitive, HeadingProps } from "@radix-ui/themes";

import { Fjalla } from "@/common/utils/fonts";

type ExtendedHeadingProps = HeadingProps & {
  children: React.ReactNode;
};

export const Heading = ({ children, ...props }: ExtendedHeadingProps) => {
  return (
    <HeadingPrimitive {...props} className={Fjalla.className}>
      {children}
    </HeadingPrimitive>
  );
};
