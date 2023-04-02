import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Task } from '../Task';
import { Loader } from 'components/Loader';
import { TasksStoreInstance } from 'modules/index';
import { Pages } from 'constants/index';

function TasksListProto() {
  return (
    <Loader isLoading={TasksStoreInstance.tasksStatus === 'loading'}>
      {TasksStoreInstance.tasks.map((el) => (
        <Task key={el.taskId} {...el} />
      ))}
      <Link to={Pages.addTaskPage}>
        <button>Add task</button>
      </Link>
    </Loader>
  );
}

export const TasksList = observer(TasksListProto);
