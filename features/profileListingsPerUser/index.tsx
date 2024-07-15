import { Flex, Spinner } from "@radix-ui/themes";

import { useGetListingsPerUser } from "@/common/hooks/useGetListingsPerUser";
import { useGetMyUser } from "@/common/hooks/useGetMyUser";
import { ProductCard } from "@/common/ui";

export const ProfileListingsPerUser = ({ userId }: { userId: any }) => {
  // const { user, isLoading: isAuthLoading } = useGetMyUser();
  // const { listings, isLoading } = useGetListingsPerUser({ userId });
  // @TODO: Implement this with supabase

  return (
    <Flex direction='column' gap='6'>
      {/* <Spinner size='3' loading={isLoading}>
        <Flex gap='4' wrap='wrap'>
          {listings?.map((listing: any, index: number) => (
            <ProductCard
              key={index}
              listing={listing}
              showActions={Boolean(user?.userId === userId)}
            />
          ))}
        </Flex>
      </Spinner> */}
    </Flex>
  );
};
