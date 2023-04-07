import Button from '@mui/material/Button';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import Stack from '@mui/material/Stack';
import Typography, { TypographyTypeMap } from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export const SmallButton = styled(Button)`
  width: 30px;
  height: 30px;
  padding: 5px;
  min-width: 10px;
`;

export const GreyButton = styled(SmallButton)`
  border-color: ${grey[400]};
  color: ${grey[400]};
  &:hover {
    border-color: ${grey[500]};
    color: ${grey[500]};
  }
`;

export type StyledTypographyProps = {
  important: boolean | undefined;
  completed: boolean | undefined;
};

export const StyledTypography = styled(Typography)<StyledTypographyProps>`
  color: ${(props) => (props.important ? props.theme.palette.success.main : props.theme.palette.text.primary)};
  font-weight: ${(props) =>
    props.important ? props.theme.typography.fontWeightBold : props.theme.typography.fontWeightRegular};
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
`;

export const StyledStack = styled(Stack)`
  width: 100%;
`;
