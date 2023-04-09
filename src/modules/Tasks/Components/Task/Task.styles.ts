import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
  important: 'true' | 'false';
  completed: 'true' | 'false';
};

export const StyledTypography = styled(Typography)<StyledTypographyProps>`
  color: ${(props) =>
    props.important === 'true' ? props.theme.palette.success.main : props.theme.palette.text.primary};
  font-weight: ${(props) =>
    props.important === 'true' ? props.theme.typography.fontWeightBold : props.theme.typography.fontWeightRegular};
  text-decoration: ${({ completed }) => (completed === 'true' ? 'line-through' : 'none')};
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

export const StyledTitle = styled(StyledTypography)`
  max-width: 50%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

export const StyledStack = styled(Stack)`
  width: 100%;
`;
