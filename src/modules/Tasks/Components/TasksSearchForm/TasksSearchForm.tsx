import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { SearchFilter } from '../SearchFilter';
import { DEFAULT_VALUES } from './TasksSearchForm.constants';
import { FilterType, SearchFormEntity } from 'domains/index';
import { SearchInput } from 'components/index';
import './TasksSearchForm.css';
import { TasksStoreInstance } from 'modules/index';

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
      <form className="tasksSearchForm" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="searchValue"
          render={({ field, fieldState: { error } }) => (
            <SearchInput value={field.value} onChange={onSearchInputChange} onReset={onResetHandler} />
          )}
        />
        <Controller
          control={control}
          name="filter"
          render={({ field, fieldState: { error } }) => (
            <SearchFilter filter={field.value} onChange={onChangeFilterHandler} />
          )}
        />
        <button type="submit">Find</button>
      </form>
    </>
  );
}

export const TasksSearchForm = observer(TasksSearchFormProto);
