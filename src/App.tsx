import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <>
      <Heading attribute={123} attribute2='string'>
        Olá, mundo!
      </Heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
        neque facere in, nam aperiam mollitia earum quia unde atque cum saepe
        voluptates? Maxime perferendis, magnam quia ipsa nobis dolores veniam.
      </p>
    </>
  );
}
