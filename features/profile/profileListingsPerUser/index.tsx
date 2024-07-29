'use client'
import { Flex, Text, Table } from '@radix-ui/themes'

import { IListing } from '@/common/types/listings'

import { TableRow } from '../tableRow'

export const ProfileListingsPerUser = ({
  listings,
  isOwner,
}: {
  listings: IListing[]
  isOwner: boolean
}) => {
  return (
    <Flex direction="column" gap="6">
      {listings.length === 0 && (
        <Text>Gebruiker heeft geen lopende advertenties.</Text>
      )}

      {listings.length > 0 && (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Titel</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Categorie</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Platform</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Prijs</Table.ColumnHeaderCell>
              {isOwner && (
                <Table.ColumnHeaderCell>Acties</Table.ColumnHeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {listings?.map((listing: any, index: number) => (
              <TableRow listing={listing} isOwner={isOwner} key={listing.id} />
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Flex>
  )
}
