"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Text, Box, Card, Inset, Flex, Button } from "@radix-ui/themes";
import { Heading } from "@/common/typography";
import { truncateText } from "@/common/utils/truncateText";
import { AlertDialog } from "@/common/ui/alertDialog";
import {
  CategoryMapper,
  PlatformMapper,
  PreferenceOfShippingOptionsMapper,
} from "@/common/utils/mappers";

export const ProductCard = ({
  listing,
  variant = "block",
  showActions = false,
  imageUrl,
}: {
  listing: any;
  variant?: "block" | "row";
  showActions?: boolean;
  imageUrl?: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDialog = () => {
    setIsOpen(!isOpen);
  };

  const handleListingDelete = () => {
    // @TODO: implement with supabase
    // deleteListing({ listingId: listing._id })
    //   .then((res) => {
    //     console.log("res", res);
    //     showToast("advertentie verwijderd");
    //   })
    //   .finally(() => {
    //     handleDialog();
    //   });
  };

  return (
    <>
      <Box maxWidth={variant === "block" ? "300px" : "100%"}>
        <Link
          href={`/advertentie/${listing.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Card
            variant='classic'
            size='2'
            style={{
              boxShadow: "var(--shadow-3)",
            }}
          >
            <Flex
              {...(variant === "row" && { gap: "5" })}
              direction={variant === "block" ? "column" : "row"}
            >
              <Inset
                clip='padding-box'
                side={variant === "block" ? "all" : "left"}
                pb={variant === "block" ? "current" : "0"}
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={listing.title}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      backgroundColor: "var(--gray-5)",
                    }}
                    width={600}
                    height={220}
                  />
                )}
              </Inset>
              <Flex direction='column' gap='1' pt='4'>
                <Heading size='4'>{listing.title}</Heading>
                <Flex direction='row' justify='between'>
                  <Heading
                    style={{
                      color: "var(--gray-8)",
                    }}
                    size='1'
                  >
                    {CategoryMapper(listing.category)} |{" "}
                    {PlatformMapper(listing.platform)}
                  </Heading>
                </Flex>
                <Text size='2' mt='2'>
                  {truncateText(listing.description)}
                </Text>
                <Flex mt='2' direction='column' justify='between'>
                  <Text weight='bold' size='5'>
                    €{listing.price}
                  </Text>
                  <Text
                    size='1'
                    weight='medium'
                    style={{ color: "var(--gray-8)" }}
                    mt='2'
                  >
                    {PreferenceOfShippingOptionsMapper(
                      listing.preferenceOfShipping,
                    )}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Link>
        {showActions && (
          <Flex direction='row' mt='4'>
            <AlertDialog
              title='Adverentie verwijderen?'
              description={`Weet je zeker dat je de advertentie "${listing.title}" wilt verwijderen?`}
              canceltext='Annuleer'
              cancelAction={handleDialog}
              confirmtext='Verwijderen'
              confirmAction={handleListingDelete}
              isOpen={isOpen}
              trigger={<Button onClick={handleDialog}>Verwijderen</Button>}
            />
          </Flex>
        )}
      </Box>
    </>
  );
};
