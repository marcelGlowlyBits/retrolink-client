import { Flex, Text } from '@radix-ui/themes'
import { ProductCard } from '@/common/ui/productCard'

export const ProfileListingsPerUser = ({
  listings,
  isOwner,
}: {
  listings: any
  isOwner: boolean
}) => {
  return (
    <Flex direction="column" gap="6">
      {listings.length === 0 && (
        <Text>Gebruiker heeft geen lopende advertenties.</Text>
      )}
      {listings.length > 0 && (
        <Flex gap="6" wrap="wrap">
          {listings?.map((listing: any, index: number) => (
            <ProductCard key={index} listing={listing} showActions={isOwner} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}
