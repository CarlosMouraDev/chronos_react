import { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext/TaskContex';

export function useTaskContext() {
  return useContext(TaskContext);
}
