import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

export const StyledButtonGroup = styled(ButtonGroup)`
  height: 100%;
  & .MuiButtonBase-root {
    min-width: auto;
    padding: 5px;
  }
`;
