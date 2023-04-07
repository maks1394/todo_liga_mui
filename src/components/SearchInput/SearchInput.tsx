import React, { ChangeEventHandler, MouseEvent } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { SearchInputProps } from './SearchInput.types';

export function SearchInput({ onChange, value, onReset, className }: SearchInputProps) {
  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);

  const onResetBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (onReset) onReset();
  };

  return (
    <OutlinedInput
      id=""
      type={'text'}
      className={className}
      value={value}
      onChange={onSearchInputChange}
      placeholder="Search"
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="toggle password visibility" onClick={onResetBtnClick} edge="end">
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      }
      size="small"
      fullWidth
    />
  );
}
