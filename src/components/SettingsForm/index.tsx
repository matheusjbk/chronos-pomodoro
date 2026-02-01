import { SaveIcon } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../Input';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

import styles from './style.module.css';

export function SettingsForm() {
  const { state, dispatch } = useTaskContext();

  const workTimeRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeRef = useRef<HTMLInputElement>(null);
  const longBreakTimeRef = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    showMessage.dismiss();

    const formErrors = [];

    const workTime = Number(workTimeRef.current?.value);
    const shortBreakTime = Number(shortBreakTimeRef.current?.value);
    const longBreakTime = Number(longBreakTimeRef.current?.value);

    if (
      isNaN(Number(workTime)) ||
      isNaN(Number(shortBreakTime)) ||
      isNaN(Number(longBreakTime))
    ) {
      formErrors.push('Digite apenas números em todos os campos.');
    }

    if (workTime < 1 || workTime > 90) {
      formErrors.push('O tempo de foco deve ser entre 1 e 90 minutos.');
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push(
        'O tempo de descanso curto deve ser entre 1 e 30 minutos.',
      );
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push(
        'O tempo de descanso longo deve ser entre 1 e 60 minutos.',
      );
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => showMessage.error(error));
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

    showMessage.success('Configurações salvas');
  }

  return (
    <form action='' className={styles.form} onSubmit={handleSaveSettings}>
      <div className={styles.formRow}>
        <Input
          id='workTime'
          labelText='Foco'
          ref={workTimeRef}
          defaultValue={state.config.workTime}
          type='number'
          min='1'
          max='90'
        />
      </div>
      <div className={styles.formRow}>
        <Input
          id='shortBreakTime'
          labelText='Descanso curto'
          ref={shortBreakTimeRef}
          defaultValue={state.config.shortBreakTime}
          type='number'
          min='1'
          max='30'
        />
      </div>
      <div className={styles.formRow}>
        <Input
          id='longBreakTime'
          labelText='Descanso longo'
          ref={longBreakTimeRef}
          defaultValue={state.config.longBreakTime}
          type='number'
          min='1'
          max='60'
        />
      </div>
      <div className={styles.formRow}>
        <Button
          icon={<SaveIcon />}
          aria-label='Salvar configurações'
          title='Salvar configurações'
        />
      </div>
    </form>
  );
}
