import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Loader } from 'components/Loader';
import { rootStoreInstance } from 'modules/RootStore';

function TasksListProto() {
  return (
    <Loader isLoading={rootStoreInstance.tasksModule.tasksStatus === 'loading'}>
      {rootStoreInstance.tasksModule.tasks.map((el) => el.title)}
    </Loader>
  );
}

export const TasksList = observer(TasksListProto);
