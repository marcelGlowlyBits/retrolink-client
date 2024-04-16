import { Box, Section, Heading, Container, Text, Flex, TextField, Button } from '@radix-ui/themes';
import { Fjalla } from '@/common/utils/fonts';

export const SubscribeBlock = () => {
		return (
		<Container size="4" minHeight="600px">
			<Box py="9">
				<Section size="4">
					<Flex direction="column">
						<Box mb="6">
							<Heading id="emaillist" className={Fjalla.className} align="center" as="h1" mb="4" size="9">WE WILL KEEP YOU POSTED</Heading>
							<Text weight="medium" align="center" size="5">Schrijf je in voor de nieuwsbrief en wij houden je op de hoogte. De nieuwste ontwikkelingen van Retrolink, zo in je mailbox.</Text>
						</Box>
						<Box>
							<form name="emaillist" method="POST" data-netlify="true">
								<Flex direction="column" gap="4">
									<label>Je voornaam: <input required type="text" name="name" /></label>
									<label>Je email adres: <input required type="email" name="email" /></label>
									<Button mt="4" type="submit" variant="solid" size="4" style={{ maxWidth: "fit-content"}}>Meld je aan</Button>
								</Flex>
							</form>
						</Box>    
					</Flex>
				</Section>
			</Box>
		</Container>
		)
}