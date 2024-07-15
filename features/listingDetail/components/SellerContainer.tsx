"use client";
import { Box, Flex, DataList, Avatar } from "@radix-ui/themes";
import { Heading } from "@/common/typography";

import { useGetUserProfile } from "@/common/hooks/useGetUserProfile";

export const SellerContainer = ({ sellerId }: { sellerId: any }) => {
  // @TODO: Implement this with supabase
  // @TODO: MAKE THIS COMPONENT STATELESS
  // const { user, isLoading } = useGetUserProfile({ userId: sellerId });

  return (
    <Box
      p='5'
      style={{
        backgroundColor: "white",
        borderRadius: "var(--radius-3)",
        boxShadow: "var(--shadow-3",
      }}
    >
      {/* <Flex direction='column' gap='6'>
        <Heading as='h2' size='6'>
          Verkoper
        </Heading>
        <Avatar
          radius='full'
          fallback={user?.username?.charAt(0).toUpperCase() || ""}
          size='5'
          src={user.image_url}
          alt={user.username}
        />
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>Gebruikersnaam:</DataList.Label>
            <DataList.Value>{user.username}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Flex> */}
    </Box>
  );
};
