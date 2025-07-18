import './styles/theme.css';
import './styles/global.css';
import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycles } from './components/Cycles';
import { DefaultButton } from './components/DefaultButton';
import { PlayCircleIcon } from 'lucide-react';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <CountDown />
      </Container>

      <Container>
        <DefaultInput
          id='selecione'
          type='text'
          labelText='teste'
          placeholder='digite algo'
        />
        <Cycles />

        <DefaultButton icon={<PlayCircleIcon />} color='green' />
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}

export default App;
