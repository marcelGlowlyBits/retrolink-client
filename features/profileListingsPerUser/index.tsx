import { Id } from "@/convex/_generated/dataModel";
import { Flex, Spinner } from "@radix-ui/themes";

import { useGetListingsPerUser } from "@/common/hooks/useGetListingsPerUser";
import { useGetMyUser } from "@/common/hooks/useGetMyUser";
import { ProductCard } from "@/common/ui";

export const ProfileListingsPerUser = ({ userId }: { userId: Id<"users"> }) => {
  const { user, isLoading: isAuthLoading } = useGetMyUser();
  const { listings, isLoading } = useGetListingsPerUser({ userId });

  return (
    <Flex direction='column' gap='6'>
      <Spinner size='3' loading={isLoading}>
        <Flex gap='4' wrap='wrap'>
          {listings?.map((listing: any, index: number) => (
            <ProductCard
              key={index}
              listing={listing}
              showActions={Boolean(user?.userId === userId)}
            />
          ))}
        </Flex>
      </Spinner>
    </Flex>
  );
};
