import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type ColorModeContextType = {
  toggleColorMode: () => void;
};
export const ColorModeContext = React.createContext({} as ColorModeContextType);

type ThemeProps = {
  children: React.ReactNode;
};

export const Theme = ({ children }: ThemeProps) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
