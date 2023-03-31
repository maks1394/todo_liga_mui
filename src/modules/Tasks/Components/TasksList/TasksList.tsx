import { observer } from 'mobx-react';
import { Task } from '../Task';
import { Loader } from 'components/Loader';
import { TasksStoreInstance } from 'modules/index';

function TasksListProto() {
  return (
    <Loader isLoading={TasksStoreInstance.tasksStatus === 'loading'}>
      {TasksStoreInstance.tasks.map((el) => (
        <Task key={el.taskId} {...el} />
      ))}
    </Loader>
  );
}

export const TasksList = observer(TasksListProto);
