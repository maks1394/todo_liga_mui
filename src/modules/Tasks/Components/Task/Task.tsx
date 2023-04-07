import { observer } from 'mobx-react';
import { CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { GreyButton, SmallButton, StyledStack, StyledTypography } from './Task.styles';
import { TaskProps } from './Task.types';
import { Pages } from 'constants/index';
import { TasksStoreInstance } from 'modules/index';

function TaskProto(props: TaskProps) {
  const navigate = useNavigate();
  const onClickImportantHandler = async () => {
    await TasksStoreInstance.updateTask(props.taskId, { important: !props.important });
  };
  const onClickDeleteHandler = async () => {
    await TasksStoreInstance.deleteTask(props.taskId);
  };
  const onClickCompleteHandler = async () => {
    await TasksStoreInstance.updateTask(props.taskId, { completed: !props.completed });
  };
  const onClickEditHandler = () => {
    navigate(`${Pages.editBase}${props.taskId}`);
  };
  return (
    <StyledStack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <StyledTypography completed={props.completed} important={props.important} variant="body1">
          {props.title}
        </StyledTypography>
        <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
          <SmallButton
            variant={`${props.important ? 'contained' : 'outlined'}`}
            disabled={props.completed}
            onClick={onClickImportantHandler}
            color="success">
            <PriorityHighIcon fontSize="small" />
          </SmallButton>
          <SmallButton
            variant={`${props.completed ? 'contained' : 'outlined'}`}
            onClick={onClickCompleteHandler}
            color={'error'}>
            <DoneIcon fontSize="small" />
          </SmallButton>
          <SmallButton variant="outlined" onClick={onClickDeleteHandler} color={'error'}>
            <DeleteIcon fontSize="small" />
          </SmallButton>
          <GreyButton variant="outlined" onClick={onClickEditHandler}>
            <EditIcon fontSize="small" />
          </GreyButton>
        </Stack>
      </Stack>
      <StyledTypography completed={props.completed} important={props.important} variant="body1">
        {props.info}
      </StyledTypography>
    </StyledStack>
  );
}

export const Task = observer(TaskProto);
