import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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
      <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={1}>
        <Typography component="h1" variant="h3">
          TODO LIST | Edit Task {params?.taskId}
        </Typography>
        <Loader isLoading={EditTaskStoreInstance.status === 'loading'}>
          <EditTask />
        </Loader>
        <ErrorBox error={EditTaskStoreInstance.error} />
      </Stack>
    </>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
