import { observer } from 'mobx-react';
import { AddTaskPureForm, AddTaskStoreInstance } from './index';
import { ErrorBox, Loader } from 'components/index';

function AddTaskProto() {
  return (
    <>
      <h1>TODO LIST | Add Task</h1>
      <Loader isLoading={AddTaskStoreInstance.status === 'loading'}>
        <AddTaskPureForm />
      </Loader>
      <ErrorBox error={AddTaskStoreInstance.error} />
    </>
  );
}

export const AddTask = observer(AddTaskProto);
