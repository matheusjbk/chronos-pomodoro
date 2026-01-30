import type { TaskModel } from '../../models/TaskModel';

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  COUNTDOWN: 'COUNTDOWN',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
  RESET_STATE: 'RESET_STATE',
} as const;

export type TaskActionModel =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof TaskActionTypes.COUNTDOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
    }
  | {
      type: typeof TaskActionTypes.COMPLETE_TASK;
    }
  | {
      type: typeof TaskActionTypes.RESET_STATE;
    };
