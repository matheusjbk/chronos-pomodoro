import { Container } from './components/Container';
import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <>
      <Container>
        <Heading>LOGO</Heading>
      </Container>

      <Container>
        <Heading>Menu</Heading>
      </Container>
    </>
  );
}
