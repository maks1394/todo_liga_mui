import React from 'react';
import { EditTaskPageProps } from './EditTaskPage.types';
import { PageContainer } from 'components/index';
import { EditTaskForm } from 'modules/index';

export const EditTaskPage = (props: EditTaskPageProps) => {
  return (
    <PageContainer>
      <h1>Edit</h1>
      <EditTaskForm />
    </PageContainer>
  );
};
