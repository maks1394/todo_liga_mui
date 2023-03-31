import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { TasksList } from './Components/TasksList';
import { TasksStoreInstance } from '.';

function TasksProto() {
  useEffect(() => {
    if (TasksStoreInstance.tasks.length === 0) {
      TasksStoreInstance.loadTasks();
    }
  }, []);

  return (
    <>
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
