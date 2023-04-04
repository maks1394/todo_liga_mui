export interface TaskEntity {
  taskId: string;
  title: string;
  info: string;
  important: boolean;
  completed: boolean;
}

export interface EditTaskEntity {
  title: string;
  info: string;
  important: boolean;
  completed: boolean;
}

export interface AddTaskEntity {
  title: string;
  info: string;
  important: boolean;
}

export interface StatsEntity {
  total: number;
  important: number;
  done: number;
}
