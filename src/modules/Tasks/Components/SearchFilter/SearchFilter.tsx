import React from 'react';
import { SearchFilterProps } from './SearchFilter.types';
import { CLASS_NAMES } from './SearchFilter.constants';
import { FilterType } from 'domains/index';
import { FILTER_TYPES } from 'constants/index';
import './SearchFilter.css';

export const SearchFilter = (props: SearchFilterProps) => {
  const onClickHandler = (filter: FilterType) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onChange(filter);
  };
  return (
    <div className={CLASS_NAMES.search}>
      <button
        className={CLASS_NAMES.button + (props.filter === FILTER_TYPES.all ? ' ' + CLASS_NAMES.buttonActive : '')}
        onClick={onClickHandler(FILTER_TYPES.all)}>
        all
      </button>
      <button
        className={CLASS_NAMES.button + (props.filter === FILTER_TYPES.active ? ' ' + CLASS_NAMES.buttonActive : '')}
        onClick={onClickHandler(FILTER_TYPES.active)}>
        active
      </button>
      <button
        className={CLASS_NAMES.button + (props.filter === FILTER_TYPES.done ? ' ' + CLASS_NAMES.buttonActive : '')}
        onClick={onClickHandler(FILTER_TYPES.done)}>
        done
      </button>
      <button
        className={CLASS_NAMES.button + (props.filter === FILTER_TYPES.important ? ' ' + CLASS_NAMES.buttonActive : '')}
        onClick={onClickHandler(FILTER_TYPES.important)}>
        important
      </button>
    </div>
  );
};
