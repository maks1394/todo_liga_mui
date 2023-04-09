import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import { GreyButton, SmallButton, StyledStack, StyledTitle, StyledTypography } from './Task.styles';
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
        <StyledTitle
          completed={props.completed ? 'true' : 'false'}
          important={props.important ? 'true' : 'false'}
          variant="body1">
          {props.title}
        </StyledTitle>
        <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
          <SmallButton
            variant={`${props.important ? 'contained' : 'outlined'}`}
            disabled={props.completed}
            onClick={onClickImportantHandler}
            disableElevation
            color="success">
            <PriorityHighIcon fontSize="small" />
          </SmallButton>
          <SmallButton
            variant={`${props.completed ? 'contained' : 'outlined'}`}
            onClick={onClickCompleteHandler}
            disableElevation
            color={'error'}>
            <DoneIcon fontSize="small" />
          </SmallButton>
          <SmallButton variant="outlined" disableElevation onClick={onClickDeleteHandler} color={'error'}>
            <DeleteIcon fontSize="small" />
          </SmallButton>
          <GreyButton variant="outlined" disableElevation onClick={onClickEditHandler}>
            <EditIcon fontSize="small" />
          </GreyButton>
        </Stack>
      </Stack>
      <StyledTypography
        completed={props.completed ? 'true' : 'false'}
        important={props.important ? 'true' : 'false'}
        variant="body1">
        {props.info}
      </StyledTypography>
    </StyledStack>
  );
}

export const Task = observer(TaskProto);
