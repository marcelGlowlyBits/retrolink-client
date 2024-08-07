import { Heading } from "@/common/typography";

import { Box, Section, Container, Text, Flex } from "@radix-ui/themes";
import { TrackView } from "@loglib/tracker/react";

import { SubscriptionForm } from "../subscriptionform";

export const SubscribeBlock = () => {
  return (
    <TrackView
      name='subscribeblock'
      payload={{ trackedView: "subscribeblock" }}
    >
      <Container size='4' minHeight='600px'>
        <Box p='4'>
          <Section size='4'>
            <Flex direction='column'>
              <Box mb='6'>
                <Heading id='emaillist' align='center' as='h1' mb='4' size='9'>
                  WE WILL KEEP YOU POSTED
                </Heading>
                <Text weight='medium' align='center' size='5'>
                  Schrijf je in voor de nieuwsbrief en wij houden je op de
                  hoogte. De nieuwste ontwikkelingen van Retrolink, zo in je
                  mailbox.
                </Text>
              </Box>
              <Box>
                <SubscriptionForm />
              </Box>
            </Flex>
          </Section>
        </Box>
      </Container>
    </TrackView>
  );
};
