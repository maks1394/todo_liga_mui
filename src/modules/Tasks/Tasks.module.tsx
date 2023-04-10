import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { TasksList } from './Components/TasksList';
import { TasksSearchForm, TasksStats, TasksStoreInstance } from './index';
import { ErrorBox } from 'components/index';
import { ColorModeContext } from 'app/index';

function TasksProto() {
  useEffect(() => {
    TasksStoreInstance.loadTasks(TasksStoreInstance.searchForm);
    return () => {
      TasksStoreInstance.unmountTasks();
    };
  }, []);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <ErrorBox error={TasksStoreInstance.error} onClose={() => TasksStoreInstance.closeAlert()}>
        <Stack spacing={1} direction="column" justifyContent="flex-start" alignItems="stretch">
          <Stack spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
            <Typography component="h1" variant="h3">
              TODO LIST
            </Typography>
            <IconButton size="large" onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Stack>
          <TasksSearchForm />
          <TasksStats />
          <TasksList />
        </Stack>
      </ErrorBox>
    </>
  );
}

export const Tasks = observer(TasksProto);
