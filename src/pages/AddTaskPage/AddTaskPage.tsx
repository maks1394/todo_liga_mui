import React from 'react';
import { AddTaskPageProps } from './AddTaskPage.types';
import { PageContainer } from 'components/index';
import { AddTask } from 'modules/index';

export const AddTaskPage = (props: AddTaskPageProps) => {
  return (
    <PageContainer>
      <AddTask />
    </PageContainer>
  );
};
