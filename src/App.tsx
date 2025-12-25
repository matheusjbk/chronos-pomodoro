import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/global.css';
import { Trash2Icon } from 'lucide-react';

export function App() {
  return (
    <>
      <Heading>
        Olá, mundo!
        <button>
          <Trash2Icon />
        </button>
      </Heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
        neque facere in, nam aperiam mollitia earum quia unde atque cum saepe
        voluptates? Maxime perferendis, magnam quia ipsa nobis dolores veniam.
      </p>
    </>
  );
}
