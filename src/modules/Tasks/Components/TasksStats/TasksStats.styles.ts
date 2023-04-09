import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import { styled } from '@mui/material/styles';

export const StyledTypography = styled(Typography)`
  ${({
    theme: {
      palette: { mode },
    },
  }) => `
  background-color: ${mode === 'light' ? grey[200] : grey[700]};
  border-radius: 4px;
  padding: 4px 8px;
`}
`;

export const StatsText = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
  text-transform: none;
`;
