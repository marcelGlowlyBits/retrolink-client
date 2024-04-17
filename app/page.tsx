import { Container } from '@radix-ui/themes';

import { HeroHeader, Values, ProductBlock, SubscribeBlock } from '@/features/landingpage';

export default function Home() {


  return (
    <>
      <Container size="4">
        <HeroHeader />
        <Values />
      </Container>
      <ProductBlock />
      <Container size="4"> 
        <SubscribeBlock />
      </Container>
    </>
  );
}
