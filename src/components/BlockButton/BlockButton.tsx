import React from 'react';
import { BlockButtonProps } from './BlockButton.types';
import './BlockButton.css';

export const BlockButton = (props: BlockButtonProps) => {
  const className = 'BlockButton' + (props?.className ? ' ' + props.className : '');
  return <button {...props} className={className}></button>;
};
