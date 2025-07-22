import { PlayCircleIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import styles from './styles.module.css';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';

export function MainForm() {
  return (
    <form className={styles.form} action=''>
      <div className={styles.formRow}>
        <DefaultInput
          id='selecione'
          type='text'
          labelText='teste'
          placeholder='digite algo'
        />
      </div>
      <div className={styles.formRow}>
        <Cycles />
      </div>
      <div className={styles.formRow}>
        <DefaultButton icon={<PlayCircleIcon />} color='green' />
      </div>
    </form>
  );
}
