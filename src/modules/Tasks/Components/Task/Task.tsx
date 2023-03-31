import { observer } from 'mobx-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskProps } from './Task.types';
import { Pages } from 'constants/index';
import { TasksStoreInstance } from 'modules/index';

function TaskProto(props: TaskProps) {
  const navigate = useNavigate();
  // const [isButtonDisable, setIsButtonDisable] = useState(false);
  const buttonStyle = {
    backgroundColor: `${props.important ? 'red' : 'green'}`,
  };
  const buttonDeleteStyle = {
    backgroundColor: `brown`,
  };
  const buttonCompletedStyle = {
    backgroundColor: `${props.completed ? 'green' : 'gray'}`,
  };
  const onClickImportantHandler = async () => {
    // setIsButtonDisable(true);
    await TasksStoreInstance.updateTask(props.taskId, { important: !props.important });
    // setIsButtonDisable(false);
  };
  const onClickDeleteHandler = async () => {
    // setIsButtonDisable(true);
    await TasksStoreInstance.deleteTask(props.taskId);
    // setIsButtonDisable(false);
  };
  const onClickCompleteHandler = async () => {
    // setIsButtonDisable(true);
    await TasksStoreInstance.updateTask(props.taskId, { completed: !props.completed });
    // setIsButtonDisable(false);
  };
  const onClickEditHandler = () => {
    navigate(`${Pages.editBase}${props.taskId}`);
  };
  return (
    <div>
      {props.title}
      <button onClick={onClickImportantHandler} style={buttonStyle}>
        !
      </button>
      <button onClick={onClickCompleteHandler} style={buttonCompletedStyle}>
        isDone
      </button>
      <button onClick={onClickDeleteHandler} style={buttonDeleteStyle}>
        x
      </button>
      <button onClick={onClickEditHandler}>Edit</button>
    </div>
  );
}

export const Task = observer(TaskProto);
