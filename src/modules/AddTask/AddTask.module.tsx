import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { AddTaskPureForm, AddTaskStoreInstance } from './index';
import { ErrorBox, Loader } from 'components/index';

function AddTaskProto() {
  return (
    <>
      <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={1}>
        <Typography component="h1" variant="h3">
          TODO LIST | Add Task
        </Typography>
        <Loader isLoading={AddTaskStoreInstance.status === 'loading'}>
          <AddTaskPureForm />
        </Loader>
        <ErrorBox error={AddTaskStoreInstance.error} />
      </Stack>
    </>
  );
}

export const AddTask = observer(AddTaskProto);
