import Button from '@mui/material/Button';
import grey from '@mui/material/colors/grey';
import { styled } from '@mui/material/styles';

export const StyledBlockButton = styled(Button)`
  width: 100%;
  display: block;
  background-color: ${grey[600]};
  color: rgb(255, 255, 255);
  &:hover {
    background-color: ${grey[700]};
  }
`;
