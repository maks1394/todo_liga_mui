import { observer } from 'mobx-react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { StatsText, StyledTypography } from './TasksStats.styles';
import { TasksStoreInstance } from 'modules/index';

function TasksStatsProto() {
  const loader = <Skeleton variant="circular" width={30} height={30} />;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0.5}>
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
        <StatsText variant="button">Total:</StatsText>
        {TasksStoreInstance.tasksStatus === 'loading' ? (
          loader
        ) : (
          <StyledTypography variant="button">{TasksStoreInstance.stats.total}</StyledTypography>
        )}
      </Stack>
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
        <StatsText variant="button">Important:</StatsText>
        {TasksStoreInstance.tasksStatus === 'loading' ? (
          loader
        ) : (
          <StyledTypography variant="button">{TasksStoreInstance.stats.important}</StyledTypography>
        )}
      </Stack>
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
        <StatsText variant="button">Done:</StatsText>
        {TasksStoreInstance.tasksStatus === 'loading' ? (
          loader
        ) : (
          <StyledTypography variant="button">{TasksStoreInstance.stats.done}</StyledTypography>
        )}
      </Stack>
    </Stack>
  );
}

export const TasksStats = observer(TasksStatsProto);
