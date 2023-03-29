import { observer } from 'mobx-react';
import { TaskProps } from './Task.types';
import { rootStoreInstance } from 'modules/RootStore';

function TaskProto(props: TaskProps) {
  const buttonStyle = {
    backgroundColor: `${props.important ? 'red' : 'green'}`,
  };
  const onClickHandler = () => {
    console.log('handler');
    rootStoreInstance.tasksModule.updateTask(props.taskId, { important: !props.important });
  };
  return (
    <div>
      {props.title}
      <button onClick={onClickHandler} style={buttonStyle}>
        !
      </button>
    </div>
  );
}

export const Task = observer(TaskProto);
