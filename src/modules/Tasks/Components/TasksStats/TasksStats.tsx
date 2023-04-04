import { observer } from 'mobx-react';
import { TasksStoreInstance } from 'modules/index';
import './TasksStats.css';

function TasksStatsProto() {
  const loader = (
    <div className="stats__loader">
      <div className="stats__circle"></div>
    </div>
  );

  return (
    <div className="stats">
      <div className="stats__infoWrapper">
        <div className="stats__infoItem">
          Total:{' '}
          {TasksStoreInstance.tasksStatus === 'loading' ? (
            loader
          ) : (
            <span className="stats__number">{TasksStoreInstance.stats.total}</span>
          )}
        </div>
        <div className="stats__infoItem">
          Important:{' '}
          {TasksStoreInstance.tasksStatus === 'loading' ? (
            loader
          ) : (
            <span className="stats__number">{TasksStoreInstance.stats.important}</span>
          )}
        </div>
        <div className="stats__infoItem">
          Done:{' '}
          {TasksStoreInstance.tasksStatus === 'loading' ? (
            loader
          ) : (
            <span className="stats__number">{TasksStoreInstance.stats.done}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export const TasksStats = observer(TasksStatsProto);
