import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import styles from './styles.module.css';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../hooks/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formatSecondsTominutes } from '../../utils/formatSecondsToMinutes';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('divite o nome da tarefa');
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsTominutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleInterruptTask() {
    setState(prevState => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
      };
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} action=''>
      <div className={styles.formRow}>
        <DefaultInput
          id='time'
          type='text'
          labelText='teste'
          placeholder='digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>
      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}
      <div className={styles.formRow}>
        {!state.activeTask ? (
          <DefaultButton
            type='submit'
            icon={<PlayCircleIcon />}
            color='green'
            aria-label='Iniciar nova tarefa'
            title='submit'
            key='submit'
          />
        ) : (
          <DefaultButton
            type='submit'
            icon={<StopCircleIcon />}
            color='red'
            aria-label='Interromper tarefa atual'
            title='button'
            onClick={handleInterruptTask}
            key='interrupt'
          />
        )}
      </div>
    </form>
  );
}
