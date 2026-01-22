import { Container } from './components/Container';
import { Menu } from './components/Menu';

import './styles/theme.css';
import './styles/global.css';
import { Logo } from './components/Logo';

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>
    </>
  );
}
