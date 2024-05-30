import { Id } from "@/convex/_generated/dataModel";
import {
  Avatar,
  DataList,
  Flex,
  Heading,
  Spinner,
  Button,
} from "@radix-ui/themes";

import { useGetListingsPerUser } from "@/common/hooks/useGetListingsPerUser";
import { ProductCard } from "@/common/ui";

export const ProfileListingsPerUser = ({ userId }: { userId: Id<"users"> }) => {
  const { listings, isLoading } = useGetListingsPerUser({ userId });

  return (
    <Flex direction='column' gap='6'>
      <Spinner size='3' loading={isLoading}>
        <Flex gap='4' wrap='wrap'>
          {listings?.map((listing: any, index: number) => (
            <ProductCard key={index} listing={listing} />
          ))}
        </Flex>
      </Spinner>
    </Flex>
  );
};
