import { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';

export function useTaskContext() {
  return useContext(TaskContext);
}
