import { Box, Flex, Text, Section, DataList } from '@radix-ui/themes'

import { Heading } from '@/common/typography'

import {
  CategoryMapper,
  PlatformMapper,
  PreferenceOfShippingOptionsMapper,
  ConditionOptionsMapper,
  PayForShippingOptionsMapper,
} from '@/common/utils/mappers'

import { IListing } from '@/common/types/listings'

export const GeneralInformationContainer = ({
  listing,
}: {
  listing: IListing
}) => {
  console.log('listing', listing)
  return (
    <Box
      p="5"
      style={{
        backgroundColor: 'white',
        borderRadius: 'var(--radius-3)',
        boxShadow: 'var(--shadow-3',
      }}
    >
      <Flex direction="column" gap="6">
        <Heading as="h2" size="6">
          Algemene informatie
        </Heading>
        <Section mt="0" p="0">
          <Heading mb="2" as="h3" size="4">
            Beschrijving
          </Heading>
          <Text>{listing.description}</Text>
        </Section>
        <DataList.Root orientation={{ initial: 'vertical', sm: 'horizontal' }}>
          <DataList.Item>
            <DataList.Label>Categorie:</DataList.Label>
            <DataList.Value>{CategoryMapper(listing.category)}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Platform:</DataList.Label>
            <DataList.Value>{PlatformMapper(listing.platform)}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Conditie:</DataList.Label>
            <DataList.Value>
              {ConditionOptionsMapper(listing.condition)}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Voorkeur verzending:</DataList.Label>
            <DataList.Value>
              {PreferenceOfShippingOptionsMapper(listing.preferenceOfShipping)}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Wie betaald verzending:</DataList.Label>
            <DataList.Value>
              {PayForShippingOptionsMapper(listing.payForShipping)}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Heeft het product schade:</DataList.Label>
            <DataList.Value>
              {listing.hasDamage
                ? 'Product heeft schade'
                : 'Product heeft geen schade'}
            </DataList.Value>
          </DataList.Item>
          {listing.hasDamage && (
            <DataList.Item>
              <DataList.Label>Omschrijving productschade:</DataList.Label>
              <DataList.Value>{listing.damageDescription}</DataList.Value>
            </DataList.Item>
          )}
        </DataList.Root>
      </Flex>
    </Box>
  )
}
