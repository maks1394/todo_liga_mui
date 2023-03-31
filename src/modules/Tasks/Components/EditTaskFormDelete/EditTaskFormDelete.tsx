import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'components/index';

function EditTaskFormProto() {
  const params = useParams<'taskId'>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const setTaskForEdit = async () => {
      setIsLoading(false);
    };
    setTaskForEdit();
  }, []);

  return <Loader isLoading={isLoading}>{}</Loader>;
}

export const EditTaskFormDelete = observer(EditTaskFormProto);
