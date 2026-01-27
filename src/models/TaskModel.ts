import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number; // quando o timer chegar ao final
  interruptDate: number; // quando a tarefa for interrompida
  type: keyof TaskStateModel['config'];
};
