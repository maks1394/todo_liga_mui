import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EditTask, EditTaskStoreInstance } from './index';
import { ErrorBox, Loader } from 'components/index';

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
      <ErrorBox error={EditTaskStoreInstance.error} />
    </>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
