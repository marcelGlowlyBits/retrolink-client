import { cookies } from 'next/headers';

import { Box, Section, Heading, Container, Text, Flex } from '@radix-ui/themes';
import { Fjalla } from '@/common/utils/fonts';
import { TrackView } from '@loglib/tracker/react';

import { SubscriptionForm } from '../subscriptionform';

export const SubscribeBlock = () => {
		const cookieStore = cookies();
		const cookie = cookieStore.get('mailingListRetroLinkStatus');
		const isSubscribed = Boolean(cookie && cookie.value === 'subscribed');

		return (
		<TrackView name="subscribeblock" payload={{ trackedView: "subscribeblock" }}> 
			<Container size="4" minHeight="600px">
				<Box p="4">
					<Section size="4">
						<Flex direction="column">
							<Box mb="6">
								<Heading id="emaillist" className={Fjalla.className} align="center" as="h1" mb="4" size="9">WE WILL KEEP YOU POSTED</Heading>
								<Text weight="medium" align="center" size="5">Schrijf je in voor de nieuwsbrief en wij houden je op de hoogte. De nieuwste ontwikkelingen van Retrolink, zo in je mailbox.</Text>
							</Box>
							<Box>
							<SubscriptionForm isSubscribed={isSubscribed} />
							</Box>    
						</Flex>
					</Section>
				</Box>
			</Container>
		</TrackView>
		)
}