import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { rootStoreInstance } from 'modules/RootStore';
import { Loader } from 'components/index';

function EditTaskFormProto() {
  const params = useParams<'taskId'>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const setTaskForEdit = async () => {
      if (params?.taskId) {
        await rootStoreInstance.tasksModule.editTaskStore.setTaskForEdit(params.taskId);
      }
      setIsLoading(false);
    };
    setTaskForEdit();
  }, []);

  return (
    <Loader isLoading={isLoading}>{JSON.stringify(rootStoreInstance.tasksModule.editTaskStore.defaultValues)}</Loader>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
