import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddTask, EditTask, Page404, TasksPage } from 'pages/index';
import { Pages } from 'constants/index';

export const Router = () => {
  return (
    <Routes>
      <Route path={'/'} element={<TasksPage />} />
      <Route path={Pages.addTaskPage} element={<AddTask />} />
      <Route path={Pages.editTaskPage} element={<EditTask />} />
      <Route path={'/*'} element={<Page404 />} />
    </Routes>
  );
};
