import { observer } from 'mobx-react';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TasksList } from './Components/TasksList';
import { TasksSearchForm, TasksStats, TasksStoreInstance } from './index';
import { ErrorBox } from 'components/index';

function TasksProto() {
  useEffect(() => {
    TasksStoreInstance.loadTasks(TasksStoreInstance.searchForm);
    return () => {
      TasksStoreInstance.unmountTasks();
    };
  }, []);

  return (
    <>
      <Stack spacing={1} direction="column" justifyContent="flex-start" alignItems="stretch">
        <Typography component="h1" variant="h3">
          TODO LIST
        </Typography>
        <TasksSearchForm />
        <TasksStats />
        <ErrorBox error={TasksStoreInstance.error} />
        <TasksList />
      </Stack>
    </>
  );
}

export const Tasks = observer(TasksProto);
