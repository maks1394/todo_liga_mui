import React from 'react';
import { TasksPageProps } from './Tasks.types';
import { PageContainer } from 'components/index';
import { Tasks } from 'modules/index';

export const TasksPage = (props: TasksPageProps) => {
  return (
    <PageContainer>
      <Tasks />
    </PageContainer>
  );
};
