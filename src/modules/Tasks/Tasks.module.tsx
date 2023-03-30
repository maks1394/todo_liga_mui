import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { rootStoreInstance } from '..';
import { TasksList } from './Components/TasksList';

function TasksProto() {
  useEffect(() => {
    if (rootStoreInstance.tasksModule.tasks.length === 0) {
      rootStoreInstance.tasksModule.loadTasks();
    }
  }, []);

  return (
    <>
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
