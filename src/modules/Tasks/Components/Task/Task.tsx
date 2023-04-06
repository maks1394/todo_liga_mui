import { observer } from 'mobx-react';
import { CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskProps } from './Task.types';
import { Pages } from 'constants/index';
import { TasksStoreInstance } from 'modules/index';
import './Task.css';

function TaskProto(props: TaskProps) {
  const navigate = useNavigate();
  const onClickImportantHandler = async () => {
    await TasksStoreInstance.updateTask(props.taskId, { important: !props.important });
  };
  const onClickDeleteHandler = async () => {
    await TasksStoreInstance.deleteTask(props.taskId);
  };
  const onClickCompleteHandler = async () => {
    await TasksStoreInstance.updateTask(props.taskId, { completed: !props.completed });
  };
  const onClickEditHandler = () => {
    navigate(`${Pages.editBase}${props.taskId}`);
  };
  const classNameForText =
    'task__text' +
    (props.completed ? ' ' + 'task__text_completed' : '') +
    (props.important ? ' ' + 'task__text_important' : '');
  return (
    <div className="taskList__task task">
      <div className="task__top">
        <p className={classNameForText}>{props.title}</p>
        <div className="task__buttons">
          <button
            className={
              'task__button task__button_type_important' + (props.important ? ' ' + 'task__button_active' : '')
            }
            disabled={props.completed}
            onClick={onClickImportantHandler}>
            <i className="fa fa-exclamation"></i>
          </button>
          <button
            className={
              'task__button task__button_type_completed' + (props.completed ? ' ' + 'task__button_active' : '')
            }
            onClick={onClickCompleteHandler}>
            <i className="fa fa-check"></i>
          </button>
          <button className={'task__button task__button_type_delete'} onClick={onClickDeleteHandler}>
            <i className="fa fa-trash-o"></i>
          </button>
          <button className="task__button task__button_type_edit" onClick={onClickEditHandler}>
            <i className="fa fa-pencil"></i>
          </button>
        </div>
      </div>
      <p className={classNameForText}>{props.info}</p>
    </div>
  );
}

export const Task = observer(TaskProto);
