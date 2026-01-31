import type { ToastContentProps } from 'react-toastify';
import { Button } from '../Button';
import { CheckIcon, XIcon } from 'lucide-react';

import styles from './style.module.css';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className={styles.container}>
        <p>{data}</p>
        <div className={styles.buttonsContainer}>
          <Button
            onClick={() => closeToast(true)}
            icon={<CheckIcon />}
            aria-label='Confirmar a ação'
            title='Confirmar a ação'
          />
          <Button
            onClick={() => closeToast(false)}
            color='red'
            icon={<XIcon />}
            aria-label='Cancelar a ação'
            title='Cancelar a ação'
          />
        </div>
      </div>
    </>
  );
}
