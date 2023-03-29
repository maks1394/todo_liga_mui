import { observer } from 'mobx-react';
import { Task } from '../Task';
import { Loader } from 'components/Loader';
import { rootStoreInstance } from 'modules/RootStore';

function TasksListProto() {
  return (
    <Loader isLoading={rootStoreInstance.tasksModule.tasksStatus === 'loading'}>
      {rootStoreInstance.tasksModule.tasks.map((el) => (
        <Task key={el.taskId} {...el} />
      ))}
    </Loader>
  );
}

export const TasksList = observer(TasksListProto);
