import React from 'react';
import { BlockButtonProps } from './BlockButton.types';
import { StyledBlockButton } from './BlockButton.styles';

export const BlockButton = (props: BlockButtonProps) => {
  return <StyledBlockButton {...props}></StyledBlockButton>;
};
