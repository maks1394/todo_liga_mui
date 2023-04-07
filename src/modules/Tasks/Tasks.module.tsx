import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { TasksList } from './Components/TasksList';
import { TasksSearchForm, TasksStats, TasksStoreInstance } from './index';
import { ErrorBox } from 'components/index';

function TasksProto() {
  useEffect(() => {
    TasksStoreInstance.loadTasks(TasksStoreInstance.searchForm);
    return () => {
      TasksStoreInstance.unmountTasks();
    };
  }, []);

  return (
    <>
      <h1>TODO LIST</h1>
      <TasksSearchForm />
      <TasksStats />
      <ErrorBox error={TasksStoreInstance.error} />
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
