import { Flex, Text, Table, IconButton } from '@radix-ui/themes'
import {
  Pencil1Icon,
  TrashIcon,
  ArrowBottomLeftIcon,
} from '@radix-ui/react-icons'

import { AlertDialog } from '@/common/ui/alertDialog'
import { IListing } from '@/common/types/listings'

import { useProfileListing } from '../hooks/useProfileListing'

export const TableRow = ({
  listing,
  isOwner,
}: {
  listing: IListing
  isOwner: boolean
}) => {
  const { content, fn, isDialogOpen } = useProfileListing({ listing })

  return (
    <Table.Row key={listing.id}>
      <Table.Cell style={{ alignContent: 'center' }}>{content.title}</Table.Cell>
      <Table.Cell style={{ alignContent: 'center' }}>
        {content.category}
      </Table.Cell>
      <Table.Cell style={{ alignContent: 'center' }}>
        {content.platform}
      </Table.Cell>
      <Table.Cell style={{ alignContent: 'center' }}>{content.price}</Table.Cell>
      <Table.Cell style={{ alignContent: 'center' }}>
        {content.createdAt}
      </Table.Cell>

      {isOwner && (
        <Table.Cell>
          <Flex direction="row" gap="2">
            <IconButton>
              <Pencil1Icon />
            </IconButton>

            <AlertDialog
              title="Adverentie verwijderen?"
              description={`Weet je zeker dat je de advertentie "${content.title}" wilt verwijderen?`}
              canceltext="Annuleer"
              cancelAction={fn.handleDialog}
              confirmtext="Verwijderen"
              confirmAction={fn.handleListingDelete}
              isOpen={isDialogOpen}
              trigger={
                <IconButton onClick={fn.handleDialog}>
                  <TrashIcon />
                </IconButton>
              }
            />
          </Flex>
        </Table.Cell>
      )}
    </Table.Row>
  )
}
