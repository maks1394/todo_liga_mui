import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import { styled } from '@mui/material/styles';

export const StyledTypography = styled(Typography)`
  background-color: ${grey[200]};
  border-radius: 4px;
  padding: 4px 8px;
`;

export const StatsText = styled(Typography)`
  color: ${grey[900]};
  text-transform: none;
`;
