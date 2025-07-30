import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../hooks/useTaskContext';
import { toastifyAdapter } from '../../adapters/toastifyAdapter';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

function Settings() {
  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);

  const { state, dispatch } = useTaskContext();

  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSendSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toastifyAdapter.dismiss();

    const formErrors = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push('Digite apenas números.');
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push('Digite somente valores entre 1 e 99 para foco.');
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push(
        'Digite somente valores entre 1 e 30 para descanso descanso curto.',
      );
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push(
        'Digite somente valores entre 1 e 60 para descanso longo.',
      );
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => {
        toastifyAdapter.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    toastifyAdapter.success('Configurações salvas');
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>configurações</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curto e
          descanso longo.
        </p>
      </Container>
      <Container>
        <form onSubmit={handleSendSettings} className={styles.form}>
          <div className={styles.formRow}>
            <DefaultInput
              id='workTime'
              labelText='Foco'
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              type='number'
            />
          </div>
          <div className={styles.formRow}>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
              type='number'
            />
          </div>
          <div className={styles.formRow}>
            <DefaultInput
              id='longBreakTime'
              labelText='Descanso longo'
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
              type='number'
            />
          </div>
          <div className={styles.formRow}>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}

export default Settings;
