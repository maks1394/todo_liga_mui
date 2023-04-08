import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const HiddenText = styled(Typography)`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
