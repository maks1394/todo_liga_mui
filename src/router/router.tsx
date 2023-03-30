import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddTaskPage, EditTaskPage, Page404, TasksPage } from 'pages/index';
import { Pages } from 'constants/index';

export const Router = () => {
  return (
    <Routes>
      <Route path={'/'} element={<TasksPage />} />
      <Route path={Pages.addTaskPage} element={<AddTaskPage />} />
      <Route path={Pages.editTaskPage} element={<EditTaskPage />} />
      <Route path={'/*'} element={<Page404 />} />
    </Routes>
  );
};
