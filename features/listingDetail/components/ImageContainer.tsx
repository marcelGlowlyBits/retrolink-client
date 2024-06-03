import { Box, Flex } from "@radix-ui/themes";
import Image from "next/image";

export const ImageContainer = ({
  imageUrl,
  alt,
}: {
  imageUrl: string;
  alt: string;
}) => {
  return (
    <Box style={{ backgroundColor: "var(--gray-a2)" }}>
      <Box
        p='5'
        style={{
          backgroundColor: "white",
          borderRadius: "var(--radius-3)",
          boxShadow: "var(--shadow-3",
        }}
      >
        <Flex direction='column' gap='6'>
          <Image src={imageUrl} alt={alt} width={350} height={350} />
        </Flex>
      </Box>
    </Box>
  );
};
