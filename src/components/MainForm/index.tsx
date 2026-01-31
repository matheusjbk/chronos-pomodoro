import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

import styles from './style.module.css';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';
import { toast } from 'react-toastify';

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useTaskContext();
  const currentTaskName = state.activeTask?.name || '';

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    const taskName = taskNameInput.current?.value;

    if (!taskName) {
      toast.warn('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      duration: state.config[nextCycleType],
      startDate: Date.now(),
      completeDate: 0,
      interruptDate: 0,
      type: nextCycleType,
    };

    dispatch({ type: 'START_TASK', payload: newTask });
    showMessage.success('Tarefa iniciada');
  }

  function handleInterruptTask() {
    dispatch({ type: 'INTERRUPT_TASK' });
    showMessage.dismiss();
    showMessage.error('Tarefa interrompida');
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action=''>
      <div className={styles.formRow}>
        <Input
          labelText='Tarefa'
          id='input'
          type='text'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={currentTaskName}
        />
      </div>

      <div className={styles.formRow}>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}

      <div className={styles.formRow}>
        {!state.activeTask && (
          <Button
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
            key='submit_button'
          />
        )}

        {!!state.activeTask && (
          <Button
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key='not_submit_button'
          />
        )}
      </div>
    </form>
  );
}
