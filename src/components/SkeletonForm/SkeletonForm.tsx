import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { SkeletonFormProps } from './SkeletonForm.types';
import { HiddenText } from './SkeletonForm.styles';

export const SkeletonForm = ({ isLoading, children }: SkeletonFormProps) => {
  return isLoading ? (
    <>
      <Skeleton variant="rounded" width="100%" height={56} />
      <Skeleton variant="rounded" width="100%" height={56} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rounded" width="100%" height={36} />
      <HiddenText>Loading...</HiddenText>
    </>
  ) : (
    <>{children}</>
  );
};
