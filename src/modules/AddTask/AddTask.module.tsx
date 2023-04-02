import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { AddTaskPureForm, AddTaskStoreInstance } from './index';
import { Loader } from 'components/index';

function AddTaskProto() {
  return (
    <>
      <h1>Add Task</h1>
      <Loader isLoading={AddTaskStoreInstance.status === 'loading'}>
        <AddTaskPureForm />
      </Loader>
    </>
  );
}

export const AddTask = observer(AddTaskProto);
