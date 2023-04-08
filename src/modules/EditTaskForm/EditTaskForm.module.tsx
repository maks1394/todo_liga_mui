import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { EditTask, EditTaskStoreInstance } from './index';
import { ErrorBox, SkeletonForm } from 'components/index';

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
      <ErrorBox error={EditTaskStoreInstance.error} onClose={() => EditTaskStoreInstance.closeAlert()}>
        <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={1}>
          <Typography component="h1" variant="h3">
            TODO LIST | Edit Task {params?.taskId}
          </Typography>
          <SkeletonForm isLoading={EditTaskStoreInstance.status === 'loading'}>
            <EditTask />
          </SkeletonForm>
        </Stack>
      </ErrorBox>
    </>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
