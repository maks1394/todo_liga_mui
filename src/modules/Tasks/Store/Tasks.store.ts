import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import axios from 'axios';
import { PrivateFields, StatsType, TasksStatus } from './Tasks.types';
import { EditTaskEntity, SearchFormEntity, TaskEntity } from 'domains/index';
import { TasksAgentInstance } from 'http/index';
import { mapToExternalGetTasksQuery, mapToExternalUpdateTaskRequest, mapToInternalTasks } from 'helpers/index';

class TasksStore {
  private _tasks: TaskEntity[] = [];
  private _tasksStatus: TasksStatus = 'loading';
  private _stats: StatsType = { total: 0, important: 0, done: 0 };
  private _searchForm: SearchFormEntity | undefined = undefined;
  private _error: string | null = null;
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStatus: observable,
      _stats: observable,
      _searchForm: observable,
      _error: observable,
      tasks: computed,
      tasksStatus: computed,
      stats: computed,
      error: computed,
      loadTasks: action,
      updateTask: action,
      deleteTask: action,
      unmountTasks: action,
      _pushError: action,
      closeAlert: action,
    });
  }
  async loadTasks(params?: SearchFormEntity) {
    this._tasksStatus = 'loading';
    try {
      const tasks: TaskEntity[] = mapToInternalTasks(
        await TasksAgentInstance.loadTasks(mapToExternalGetTasksQuery(params))
      );
      runInAction(() => {
        this._tasks = tasks;
        this._stats.total = this._tasks.length;
        this._searchForm = params;
        [this._stats.important, this._stats.done] = this._tasks.reduce(
          (a, b) => {
            if (b.important) {
              a[0] = a[0] + 1;
            }
            if (b.completed) {
              a[1] = a[1] + 1;
            }
            return a;
          },
          [0, 0]
        );
        this._tasksStatus = 'succeed';
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        this._pushError(err.message);
      } else {
        this._pushError('Возникла ошибка при загрузке задач');
      }
      this._tasksStatus = 'error';
    }
  }

  async updateTask(taskId: string, newTaskForUpdate: Partial<EditTaskEntity>): Promise<void> {
    try {
      runInAction(() => {
        this._tasksStatus = 'loading';
      });
      await TasksAgentInstance.updateTask(taskId, mapToExternalUpdateTaskRequest(newTaskForUpdate));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        this._pushError(err.message);
      } else {
        this._pushError('Возникла ошибка при обновлении задачи');
      }
    } finally {
      await this.loadTasks(this._searchForm);
    }
  }

  async deleteTask(taskId: string) {
    try {
      runInAction(() => {
        this._tasksStatus = 'loading';
      });
      await TasksAgentInstance.deleteTask(taskId);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        this._pushError(err.message);
      } else {
        this._pushError('Возникла ошибка при удалении задачи');
      }
    } finally {
      await this.loadTasks(this._searchForm);
    }
  }
  private _pushError(error: string) {
    if (!this._error) {
      this._error = error;
    }
  }
  unmountTasks() {
    this._tasksStatus = 'loading';
  }
  closeAlert() {
    this._error = null;
  }
  get tasks() {
    return this._tasks;
  }
  get tasksStatus() {
    return this._tasksStatus;
  }
  get stats() {
    return this._stats;
  }
  get searchForm() {
    return this._searchForm;
  }
  get error() {
    return this._error;
  }
}

export const TasksStoreInstance = new TasksStore();
