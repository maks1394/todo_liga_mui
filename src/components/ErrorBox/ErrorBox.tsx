import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ErrorBoxProps } from './ErrorBox.types';

export const ErrorBox = ({ error, onClose, children }: ErrorBoxProps) => {
  return (
    <>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      {children}
    </>
  );
};
