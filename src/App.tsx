import { TimerIcon } from 'lucide-react';
import { Heading } from './components/Heading/Heading';
import './styles/theme.css';
import './styles/global.css';

function App() {
  return (
    <>
      <Heading>
        <button>
          <TimerIcon />
        </button>
      </Heading>
    </>
  );
}

export default App;
