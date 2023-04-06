import { observer } from 'mobx-react';
import { Link, NavLink } from 'react-router-dom';
import { Task } from '../Task';
import { Loader } from 'components/Loader';
import { TasksStoreInstance } from 'modules/index';
import { Pages } from 'constants/index';
import './TaskList.css';

function TasksListProto() {
  return (
    <Loader isLoading={TasksStoreInstance.tasksStatus === 'loading'}>
      <div className="taskList">
        {TasksStoreInstance.tasks.map((el) => (
          <Task key={el.taskId} {...el} />
        ))}
      </div>
      <NavLink className="taskList__link" to={Pages.addTaskPage}>
        <button className="taskList__button">Add task</button>
      </NavLink>
    </Loader>
  );
}

export const TasksList = observer(TasksListProto);
