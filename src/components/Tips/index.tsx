import { useTaskContext } from '../../hooks/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Foque por <strong>{state.config.workTime}</strong> minutos.
      </span>
    ),
    shortBreakTime: (
      <span>
        Descanse por <strong>{state.config.shortBreakTime}</strong> minutos.
      </span>
    ),
    longBreakTime: (
      <span>
        Descanse por <strong>{state.config.longBreakTime}</strong> minutos.
      </span>
    ),
  };

  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de <strong>trabalho</strong>,{' '}
        <strong>{state.config.workTime}</strong> minutos.
      </span>
    ),
    shortBreakTime: (
      <span>
        Próximo ciclo é de <strong>descanso</strong>,{' '}
        <strong>{state.config.shortBreakTime}</strong> minutos.
      </span>
    ),
    longBreakTime: (
      <span>
        Próximo ciclo é de <strong>descanso longo</strong>,{' '}
        <strong>{state.config.longBreakTime}</strong> minutos.
      </span>
    ),
  };

  return (
    <>
      {!!state.activeTask && tipsForNoActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForWhenActiveTask[nextCycleType]}
    </>
  );
}
