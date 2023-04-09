import Button from '@mui/material/Button';
import grey from '@mui/material/colors/grey';
import { styled } from '@mui/material/styles';

export const StyledBlockButton = styled(Button)`
  width: 100%;
  display: block;
  background-color: ${({
    theme: {
      palette: { mode },
    },
  }) => (mode === 'light' ? grey[600] : grey[700])};
  color: ${({
    theme: {
      palette: { mode },
    },
  }) => (mode === 'light' ? grey[200] : grey[50])};
  &:hover {
    background-color: ${({
      theme: {
        palette: { mode },
      },
    }) => (mode === 'light' ? grey[700] : grey[800])};
  }
`;
