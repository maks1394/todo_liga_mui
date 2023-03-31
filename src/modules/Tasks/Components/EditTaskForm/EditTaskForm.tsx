import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'components/index';
import { EditTaskStoreInstance } from 'modules/index';

function EditTaskFormProto() {
  const params = useParams<'taskId'>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const setTaskForEdit = async () => {
      if (params?.taskId) {
        await EditTaskStoreInstance.setTaskForEdit(params.taskId);
      }
      setIsLoading(false);
    };
    setTaskForEdit();
  }, []);

  return <Loader isLoading={isLoading}>{JSON.stringify(EditTaskStoreInstance.defaultValues)}</Loader>;
}

export const EditTaskForm = observer(EditTaskFormProto);
