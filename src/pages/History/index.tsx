import { TrashIcon } from 'lucide-react';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useMemo, useState } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

import styles from './style.module.css';
import { showMessage } from '../../adapters/showMessage';

export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
      };
    },
  );

  function handleSortTasksOptions({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTasksOptions({
      tasks: sortTasks({
        tasks: state.tasks,
        direction: newDirection,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    showMessage.dismiss();

    showMessage.confirm(
      'Tem certeza que deseja apagar todo o histórico?',
      confirmation => {
        setConfirmClearHistory(confirmation);
      },
    );
  }

  const hasTasks = state.tasks.length > 0;

  useEffect(() => {
    if (!confirmClearHistory) return;

    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';

    return () => {
      showMessage.dismiss();
    };
  }, []);

  const sortedTasks = useMemo(() => {
    return sortTasks({
      tasks: state.tasks,
      direction: sortTasksOptions.direction,
      field: sortTasksOptions.field,
    });
  }, [state.tasks, sortTasksOptions.direction, sortTasksOptions.field]);

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <Button
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar histórico'
                title='Apagar histórico'
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasksOptions({ field: 'name' })}
                    className={styles.thSort}
                  >
                    Tarefa
                  </th>
                  <th
                    onClick={() =>
                      handleSortTasksOptions({ field: 'duration' })
                    }
                    className={styles.thSort}
                  >
                    Duração
                  </th>
                  <th
                    onClick={() =>
                      handleSortTasksOptions({ field: 'startDate' })
                    }
                    className={styles.thSort}
                  >
                    Data
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortedTasks.map(task => {
                  const taskTypeDict = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo',
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration} min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDict[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (
          <p className={styles.noTasksMessage}>
            Não há tarefas registradas no histórico.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}
