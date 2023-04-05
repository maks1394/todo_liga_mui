import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { SearchFilter } from '../SearchFilter';
import { FilterType } from 'domains/Task.entity';

function TasksSearchFormProto() {
  // useEffect(() => {}, []);

  return (
    <>
      <SearchFilter
        filter={'All'}
        onChange={function (filter: FilterType): void {
          console.log('click');
        }}
      />
    </>
  );
}

export const TasksSearchForm = observer(TasksSearchFormProto);
