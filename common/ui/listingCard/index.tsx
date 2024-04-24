import { Box, Card, Text } from '@radix-ui/themes';

import { IListing } from '@/common/types/listings';

export const ListingCard = ({ title, description, price, key, category, condition }: ListingCardProps) => {
    return (
        <Box key={key}>
            <Card variant="classic" size="1" asChild>
            <a href="#">
                <Text as="div" size="4" weight="bold">
                {title}
                </Text>
                <Text as="div" color="gray" size="3">
                {description}
                </Text>
                <Text as="div" weight="bold" size="2">
                €{price}
                </Text>
                <Text as="div" color="gray" size="3">
                {category}
                </Text>
                <Text as="div" color="gray" size="3">
                {condition}
                </Text>
            </a>
            </Card>
        </Box>
    )
}

type ListingCardProps = IListing & { key: number };