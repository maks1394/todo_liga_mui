import { observer } from 'mobx-react';
import { useState } from 'react';
import { TaskProps } from './Task.types';
import { rootStoreInstance } from 'modules/RootStore';

function TaskProto(props: TaskProps) {
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const buttonStyle = {
    backgroundColor: `${props.important ? 'red' : 'green'}`,
  };
  const buttonDeleteStyle = {
    backgroundColor: `brown`,
  };
  const onClickImportantHandler = async () => {
    setIsButtonDisable(true);
    await rootStoreInstance.tasksModule.updateTask(props.taskId, { important: !props.important });
    setIsButtonDisable(false);
  };
  const onClickDeleteHandler = async () => {
    setIsButtonDisable(true);
    await rootStoreInstance.tasksModule.deleteTask(props.taskId);
    setIsButtonDisable(false);
  };
  return (
    <div>
      {props.title}
      <button disabled={isButtonDisable} onClick={onClickImportantHandler} style={buttonStyle}>
        !
      </button>
      <button disabled={isButtonDisable} onClick={onClickDeleteHandler} style={buttonDeleteStyle}>
        x
      </button>
    </div>
  );
}

export const Task = observer(TaskProto);
