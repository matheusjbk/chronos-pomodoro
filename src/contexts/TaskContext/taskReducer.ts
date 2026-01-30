import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { TaskActionTypes, type TaskActionModel } from './taskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const secondsRemaining = newTask.duration * 60;
      const nextCycle = getNextCycle(state.currentCycle);

      return {
        ...state,
        tasks: [...state.tasks, newTask],
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        activeTask: newTask,
        currentCycle: nextCycle,
      };
    }
    case TaskActionTypes.COUNTDOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask?.id === task.id)
            return { ...task, interruptDate: Date.now() };
          return task;
        }),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask?.id === task.id)
            return { ...task, completeDate: Date.now() };
          return task;
        }),
      };
    }
    case TaskActionTypes.RESET_STATE: {
      return state;
    }
    default: {
      return state;
    }
  }
}
