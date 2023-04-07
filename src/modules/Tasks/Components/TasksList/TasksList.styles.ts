import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import grey from '@mui/material/colors/grey';
import { styled } from '@mui/material/styles';

export const StyledList = styled(List)`
  width: 100%;
`;

export const StyledListItem = styled(ListItem)`
  border: 1px solid ${grey[400]};
  &:not(:first-child) {
    margin-top: -1px;
  }
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const StyledStack = styled(Stack)`
  min-height: 400px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;