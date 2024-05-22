import { ProductCard } from "@/common/ui";
import { Id } from "@/convex/_generated/dataModel";

export const ProfileListingsPerUser = ({ userId }: { userId: Id<"users"> }) => {
  return <ProductCard />;
};
