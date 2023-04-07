import React from 'react';
import { ErrorBoxProps } from './ErrorBox.types';
import './ErrorBox.css';

export const ErrorBox = ({ error }: ErrorBoxProps) => {
  return <div className={`error-box${error ? ' error-box--visible' : ''}`}>{error}</div>;
};
