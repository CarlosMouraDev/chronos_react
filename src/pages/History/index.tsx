import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { useTaskContext } from '../../hooks/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { useEffect, useState } from 'react';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { toastifyAdapter } from '../../adapters/toastifyAdapter';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);

  const [sortedTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection =
      sortedTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortedTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';

    return () => {
      toastifyAdapter.dismiss();
    };
  }, []);

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);

    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  function handleResetHistory() {
    toastifyAdapter.dismiss();
    toastifyAdapter.confirm(
      'Deseja limpar o histórico de tarefas?',
      confirmation => {
        setConfirmClearHistory(confirmation);
      },
    );
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color='red'
              aria-label='Apagar histórico'
              title='Apagar histórico'
              onClick={handleResetHistory}
            />
          </span>
        </Heading>
      </Container>
      {hasTasks && (
        <Container>
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: 'name' })}
                    className={styles.thSort}
                  >
                    Tarefa ↕
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'duration' })}
                    className={styles.thSort}
                  >
                    Duração ↕
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                    className={styles.thSort}
                  >
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasksOptions.tasks.map(task => {
                  const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo',
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Container>
      )}

      {!hasTasks && (
        <p style={{ textAlign: 'center', fontSize: '20px' }}>
          Ainda não existem tarefas no histórico.
        </p>
      )}
    </MainTemplate>
  );
}

export default History;
