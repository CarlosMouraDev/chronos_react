import { Container } from './components/Container';
import { Logo } from './components/Logo';
import './styles/theme.css';
import './styles/global.css';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycles } from './components/Cycles';
import { DefaultButton } from './components/DefaultButton';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

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
          disabled
          defaultValue='valor preenchido'
        />
        <Cycles />

        <DefaultButton icon={<PlayCircleIcon />} color='green' />
      </Container>
    </>
  );
}

export default App;
