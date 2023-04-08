import React from 'react';
import Container from '@mui/material/Container';
import { PageContainerProps } from './PageContainer.types';

export function PageContainer({ children }: PageContainerProps) {
  return <Container maxWidth="md">{children}</Container>;
}
