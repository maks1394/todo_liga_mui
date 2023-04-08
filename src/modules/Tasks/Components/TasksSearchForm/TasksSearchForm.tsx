import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { SearchFilter } from '../SearchFilter';
import { FindButton } from './TasksSearchForm.styles';
import { DEFAULT_VALUES } from './TasksSearchForm.constants';
import { FilterType, SearchFormEntity } from 'domains/index';
import { SearchInput } from 'components/index';
import { TasksStoreInstance } from 'modules/index';

function TasksSearchFormProto() {
  const { handleSubmit, reset, control, setValue } = useForm<SearchFormEntity>({
    defaultValues: DEFAULT_VALUES,
  });
  useEffect(() => {
    reset(TasksStoreInstance.searchForm);
  }, []);
  const onSubmit = async (data: SearchFormEntity) => {
    await TasksStoreInstance.loadTasks(data);
  };
  const onSearchInputChange = (text: string) => {
    setValue('searchValue', text);
  };

  const onResetHandler = () => {
    setValue('searchValue', '');
  };

  const onChangeFilterHandler = (filter: FilterType) => {
    setValue('filter', filter);
  };

  return (
    <>
      <Box>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          component="form"
          spacing={{ xs: 1 }}
          columns={{ xs: 10, md: 12 }}
          onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="searchValue"
            render={({ field, fieldState: { error } }) => (
              <Grid p={0} item xs={10} md={4}>
                <SearchInput value={field.value} onChange={onSearchInputChange} onReset={onResetHandler} />
              </Grid>
            )}
          />
          <Controller
            control={control}
            name="filter"
            render={({ field, fieldState: { error } }) => (
              <Grid item xs={8} md={6}>
                <SearchFilter filter={field.value} onChange={onChangeFilterHandler} />
              </Grid>
            )}
          />
          <Grid item xs={2} md={2}>
            <FindButton disableElevation fullWidth type="submit" variant="contained" size="small">
              Find
            </FindButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export const TasksSearchForm = observer(TasksSearchFormProto);
