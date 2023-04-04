import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { TasksList } from './Components/TasksList';
import { TasksStats, TasksStoreInstance } from './index';

function TasksProto() {
  useEffect(() => {
    TasksStoreInstance.loadTasks();
    return () => {
      TasksStoreInstance.unmountTasks();
    };
  }, []);

  return (
    <>
      <h1>TODO LIST</h1>
      <TasksStats />
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
