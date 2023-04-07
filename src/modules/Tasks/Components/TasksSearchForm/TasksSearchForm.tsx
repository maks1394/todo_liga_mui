/* eslint-disable import/order */
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { SearchFilter } from '../SearchFilter';
import { DEFAULT_VALUES } from './TasksSearchForm.constants';
import { FilterType, SearchFormEntity } from 'domains/index';
import { SearchInput } from 'components/index';
import './TasksSearchForm.css';
import { TasksStoreInstance } from 'modules/index';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function TasksSearchFormProto() {
  const { handleSubmit, reset, control, setValue, formState, clearErrors } = useForm<SearchFormEntity>({
    defaultValues: DEFAULT_VALUES,
  });
  useEffect(() => {
    reset(TasksStoreInstance.searchForm);
  }, []);
  const onSubmit = async (data: SearchFormEntity) => {
    console.log(data);
    await TasksStoreInstance.loadTasks(data);
    try {
      // await AddTaskStoreInstance.addTask(data);
    } catch (error) {
      console.log(error);
    }
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
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        component="form"
        spacing={{ xs: 1, sm: 2, md: 3 }}
        onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="searchValue"
          render={({ field, fieldState: { error } }) => (
            <Grid item xs={12} md={3}>
              <SearchInput value={field.value} onChange={onSearchInputChange} onReset={onResetHandler} />
            </Grid>
          )}
        />
        <Controller
          control={control}
          name="filter"
          render={({ field, fieldState: { error } }) => (
            <Grid item xs={10} md={7}>
              <SearchFilter filter={field.value} onChange={onChangeFilterHandler} />
            </Grid>
          )}
        />
        <Grid item xs={2} md={2}>
          <Button fullWidth type="submit" variant="contained" size="small">
            Find
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export const TasksSearchForm = observer(TasksSearchFormProto);
