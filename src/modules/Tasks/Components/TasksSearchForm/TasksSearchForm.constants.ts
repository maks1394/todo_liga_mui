import { FILTER_TYPES } from 'constants/index';
import { SearchFormEntity } from 'domains/index';

export const DEFAULT_VALUES: SearchFormEntity = {
  searchValue: '',
  filter: FILTER_TYPES.all,
};
