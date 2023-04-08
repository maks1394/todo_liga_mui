import React from 'react';
import Button from '@mui/material/Button';
import { SearchFilterProps } from './SearchFilter.types';
import { StyledButtonGroup } from './SearchFilter.styles';
import { FilterType } from 'domains/index';
import { FILTER_TYPES } from 'constants/index';

export const SearchFilter = (props: SearchFilterProps) => {
  const onClickHandler = (filter: FilterType) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onChange(filter);
  };
  return (
    <StyledButtonGroup fullWidth color="secondary">
      <Button
        disableElevation
        onClick={onClickHandler(FILTER_TYPES.all)}
        variant={props.filter === FILTER_TYPES.all ? 'contained' : 'outlined'}>
        all
      </Button>
      <Button
        onClick={onClickHandler(FILTER_TYPES.active)}
        variant={props.filter === FILTER_TYPES.active ? 'contained' : 'outlined'}>
        active
      </Button>
      <Button
        onClick={onClickHandler(FILTER_TYPES.done)}
        variant={props.filter === FILTER_TYPES.done ? 'contained' : 'outlined'}>
        done
      </Button>
      <Button
        onClick={onClickHandler(FILTER_TYPES.important)}
        variant={props.filter === FILTER_TYPES.important ? 'contained' : 'outlined'}>
        important
      </Button>
    </StyledButtonGroup>
  );
};
