import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const TipsForActiveTask = {
    workTime: <span>Foco</span>,
    shortBreakTime: <span>Descanso</span>,
    longBreakTime: <span>Descanso longo</span>,
  };

  const TipsForNoActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de <b>{state.config.workTime} minutos</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Próximo ciclo é de <b>{state.config.shortBreakTime} minutos</b>
      </span>
    ),
    longBreakTime: (
      <span>
        Próximo ciclo é de <b>{state.config.longBreakTime} minutos</b>
      </span>
    ),
  };

  return (
    <>
      {state.activeTask && TipsForActiveTask[state.activeTask.type]}
      {!state.activeTask && TipsForNoActiveTask[nextCycleType]}
    </>
  );
}
