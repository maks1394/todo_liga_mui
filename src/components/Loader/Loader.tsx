import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { LoaderProps } from './Loader.types';
import { HiddenText } from './Loader.styles';

export function Loader({ isLoading, children }: LoaderProps) {
  return isLoading ? (
    <>
      <CircularProgress />
      <HiddenText>Loading...</HiddenText>
    </>
  ) : (
    <>{children}</>
  );
}
