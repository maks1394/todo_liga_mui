import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditTask, EditTaskStoreInstance } from './index';
import { Loader } from 'components/index';

function EditTaskFormProto() {
  const params = useParams<'taskId'>();
  useEffect(() => {
    const setTaskForEdit = async () => {
      if (params?.taskId) {
        await EditTaskStoreInstance.setTaskForEdit(params.taskId);
      }
    };
    setTaskForEdit();
  }, []);

  return (
    <>
      <h1>TODO LIST | Edit Task {params?.taskId}</h1>
      <Loader isLoading={EditTaskStoreInstance.status === 'loading'}>
        <EditTask />
      </Loader>
    </>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
