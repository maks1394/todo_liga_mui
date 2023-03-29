import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { rootStoreInstance } from '..';
import { TasksList } from './Components/TasksList';

function TasksProto() {
  useEffect(() => {
    rootStoreInstance.tasksModule.loadTasks();
  }, []);

  return (
    <>
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
