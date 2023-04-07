import { observer } from 'mobx-react';
import { Link, NavLink } from 'react-router-dom';
import { Task } from '../Task';
import { Loader } from 'components/Loader';
import { TasksStoreInstance } from 'modules/index';
import { Pages } from 'constants/index';
import './TaskList.css';
import { BlockButton } from 'components/index';

function TasksListProto() {
  return (
    <>
      <div className="taskList">
        <Loader isLoading={TasksStoreInstance.tasksStatus === 'loading'}>
          {TasksStoreInstance.tasksStatus === 'succeed' ? (
            TasksStoreInstance.tasks.length > 0 ? (
              TasksStoreInstance.tasks.map((el) => <Task key={el.taskId} {...el} />)
            ) : (
              <div>Tasks list is empty</div>
            )
          ) : (
            <div>Some error occurred</div>
          )}
        </Loader>
      </div>
      <NavLink className="taskList__link" to={Pages.addTaskPage}>
        <BlockButton className="taskList__BlockButton">Add task</BlockButton>
      </NavLink>
    </>
  );
}

export const TasksList = observer(TasksListProto);
