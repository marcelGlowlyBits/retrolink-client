'use client'
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Text, Box, Card, Inset, Flex, Button } from '@radix-ui/themes'

import { Heading } from '@/common/typography'
import { AlertDialog } from '@/common/ui/alertDialog'
import placeholderImage from '../../../public/images/placeholder.png'

import { useListingCard } from './hooks'

export const ProductCard = ({
  listing,
  variant = 'block',
  showActions = false,
  imageUrl,
}: {
  listing: any
  variant?: 'block' | 'row'
  showActions?: boolean
  imageUrl: string | undefined
}) => {
  const { fn, content, isDialogOpen } = useListingCard({ listing })

  const image = imageUrl ? imageUrl : placeholderImage

  return (
    <>
      <Box>
        <Link
          href={`/advertentie/${listing.id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Card
            variant="classic"
            size="2"
            style={{
              boxShadow: 'var(--shadow-3)',
            }}
          >
            <Flex
              {...(variant === 'row' && { gap: '5' })}
              direction={variant === 'block' ? 'column' : 'row'}
            >
              <Inset
                clip="padding-box"
                side={variant === 'block' ? 'all' : 'left'}
                pb={variant === 'block' ? 'current' : '0'}
              >
                <Image
                  src={image}
                  alt={content.title}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    backgroundColor: 'var(--gray-5)',
                  }}
                  width={600}
                  height={220}
                />
              </Inset>
              <Flex direction="column" gap="1" pt="4">
                <Heading size="6">{content.title}</Heading>
                <Flex direction="row" justify="between">
                  <Heading
                    style={{
                      color: 'var(--gray-8)',
                    }}
                    size="2"
                  >
                    {content.category} | {content.platform}
                  </Heading>
                </Flex>
                <Text size="2" mt="2">
                  {content.description}
                </Text>
                <Flex mt="2" direction="column" justify="between">
                  <Text weight="bold" size="4">
                    {content.price}
                  </Text>
                  <Text
                    size="1"
                    weight="medium"
                    style={{ color: 'var(--gray-8)' }}
                    mt="2"
                  >
                    {content.preferenceOfShipping}
                  </Text>
                  <Text size="1" mt="2" style={{ color: 'var(--gray-8)' }}>
                    aangemaakt op: {content.createdAt}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Link>
        {showActions && (
          <Flex direction="row" mt="4">
            <AlertDialog
              title="Adverentie verwijderen?"
              description={`Weet je zeker dat je de advertentie "${content.title}" wilt verwijderen?`}
              canceltext="Annuleer"
              cancelAction={fn.handleDialog}
              confirmtext="Verwijderen"
              confirmAction={fn.handleListingDelete}
              isOpen={isDialogOpen}
              trigger={<Button onClick={fn.handleDialog}>Verwijderen</Button>}
            />
          </Flex>
        )}
      </Box>
    </>
  )
}
