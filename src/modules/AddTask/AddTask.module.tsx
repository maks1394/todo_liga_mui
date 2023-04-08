import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { AddTaskPureForm, AddTaskStoreInstance } from './index';
import { ErrorBox, SkeletonForm } from 'components/index';

function AddTaskProto() {
  return (
    <>
      <ErrorBox error={AddTaskStoreInstance.error} onClose={() => AddTaskStoreInstance.closeAlert()}>
        <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={1}>
          <Typography component="h1" variant="h3">
            TODO LIST | Add Task
          </Typography>
          <SkeletonForm isLoading={AddTaskStoreInstance.status === 'loading'}>
            <AddTaskPureForm />
          </SkeletonForm>
        </Stack>
      </ErrorBox>
    </>
  );
}

export const AddTask = observer(AddTaskProto);
