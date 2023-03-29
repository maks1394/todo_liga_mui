import { observer } from 'mobx-react';
import { useState } from 'react';
import { TaskProps } from './Task.types';
import { rootStoreInstance } from 'modules/RootStore';

function TaskProto(props: TaskProps) {
  const [isImportantButtonDisable, setIsImportantButtonDisable] = useState(false);
  const buttonStyle = {
    backgroundColor: `${props.important ? 'red' : 'green'}`,
  };
  const onClickHandler = async () => {
    setIsImportantButtonDisable(true);
    await rootStoreInstance.tasksModule.updateTask(props.taskId, { important: !props.important });
    setIsImportantButtonDisable(false);
  };
  return (
    <div>
      {props.title}
      <button disabled={isImportantButtonDisable} onClick={onClickHandler} style={buttonStyle}>
        !
      </button>
    </div>
  );
}

export const Task = observer(TaskProto);
