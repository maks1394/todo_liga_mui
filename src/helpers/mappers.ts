import { AddTaskEntity, EditTaskEntity, SearchFormEntity, TaskEntity } from 'domains/index';
import {
  AddTaskRequest,
  GetAllTasksQuery,
  GetAllTasksResponse,
  GetTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from 'http/index';

export const mapToExternalGetTasksQuery = (searchForm: SearchFormEntity | undefined): GetAllTasksQuery | undefined => {
  if (!searchForm) {
    return undefined;
  }
  const query: GetAllTasksQuery = {
    isImportant: undefined,
    name_like: undefined,
    isCompleted: undefined,
  };
  switch (searchForm.filter) {
    case 'Active':
      query.isCompleted = false;
      break;
    case 'Done':
      query.isCompleted = true;
      break;
    case 'Important':
      query.isImportant = true;
      break;
    default:
      break;
  }
  if (searchForm.searchValue) {
    query.name_like = searchForm.searchValue;
  }
  return query;
};

export const mapToInternalTasks = (tasks: GetAllTasksResponse): TaskEntity[] => {
  const internalTasks: TaskEntity[] = [];
  tasks.forEach((task) => {
    if (task.id) {
      internalTasks.push({
        taskId: String(task.id),
        title: task.name || 'Неизвестно',
        info: task.info || 'Неизвестно',
        important: task.isImportant || false,
        completed: task.isCompleted || false,
      });
    }
  });
  return internalTasks;
};

export const mapToInternalTask = (task: GetTaskResponse): TaskEntity => {
  if (task.id) {
    return {
      taskId: String(task.id),
      title: task.name || 'Неизвестно',
      info: task.info || 'Неизвестно',
      important: task.isImportant || false,
      completed: task.isCompleted || false,
    };
  } else {
    throw new Error('У полученной задачи отсутсвует id');
  }
};

export const mapToExternalUpdateTaskRequest = (task: Partial<EditTaskEntity>): UpdateTaskRequest => {
  const updateTask: UpdateTaskRequest = {
    isImportant: task?.important,
    name: task?.title,
    info: task?.info,
    isCompleted: task?.completed,
  };
  return updateTask;
};

export const mapToInternalUpdateTaskResponse = (task: UpdateTaskResponse): TaskEntity => {
  return mapToInternalTask(task);
};

export const mapToExternalAddTaskRequest = (task: AddTaskEntity): AddTaskRequest => {
  const request: AddTaskRequest = {
    isImportant: task.important,
    name: task.title,
    info: task.info,
  };
  return request;
};
