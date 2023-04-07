import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Task } from '../Task';
import { StyledList, StyledListItem, StyledStack } from './TasksList.styles';
import { Loader } from 'components/Loader';
import { TasksStoreInstance } from 'modules/index';
import { Pages } from 'constants/index';
import { BlockButton } from 'components/index';

function TasksListProto() {
  return (
    <>
      <StyledStack direction="column" justifyContent="center" alignItems="center" spacing={0}>
        <Loader isLoading={TasksStoreInstance.tasksStatus === 'loading'}>
          {TasksStoreInstance.tasksStatus === 'succeed' ? (
            TasksStoreInstance.tasks.length > 0 ? (
              <StyledList>
                {TasksStoreInstance.tasks.map((el) => {
                  return (
                    <StyledListItem key={el.taskId}>
                      <Task {...el} />
                    </StyledListItem>
                  );
                })}
              </StyledList>
            ) : (
              <Typography variant="body1">Tasks list is empty</Typography>
            )
          ) : (
            <Typography variant="body1">Some error occurred</Typography>
          )}
        </Loader>
      </StyledStack>
      <Link underline="none" component={NavLink} to={Pages.addTaskPage}>
        <BlockButton>Add task</BlockButton>
      </Link>
    </>
  );
}

export const TasksList = observer(TasksListProto);
