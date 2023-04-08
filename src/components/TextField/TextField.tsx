/* eslint-disable import/order */
import React from 'react';
import { TextFieldProps } from './TextField.types';
import './TextField.css';
import OutlinedInput from '@mui/material/OutlinedInput';

export function TextField({
  label,
  placeholder,
  containerClassName = '',
  inputType,
  value,
  onChange,
  errorText,
}: TextFieldProps) {
  return (
    <div className={`mb-3 ${containerClassName}`}>
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        type={inputType}
        className="form-control"
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errorText && <div className="invalid">{errorText}</div>}
    </div>
  );
}
