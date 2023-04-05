import { FilterType } from 'domains/index';

export type SearchFilterProps = {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
};
