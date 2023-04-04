import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { PrivateFields, StatsType, TasksStatus } from './Tasks.types';
import { TaskEntity } from 'domains/index';
import { mockAgentInstance } from '__mocks__/index';

class TasksStore {
  private _tasks: TaskEntity[] = [];
  private _tasksStatus: TasksStatus = 'loading';
  private _stats: StatsType = { total: 0, important: 0, done: 0 };
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStatus: observable,
      _stats: observable,
      tasks: computed,
      tasksStatus: computed,
      stats: computed,
      loadTasks: action,
      updateTask: action,
      deleteTask: action,
      unmountTasks: action,
    });
  }
  async loadTasks() {
    this._tasksStatus = 'loading';
    try {
      const tasks: TaskEntity[] = await mockAgentInstance.loadTasks();
      runInAction(() => {
        this._tasks = tasks;
        this._stats.total = this._tasks.length;
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
      console.log(err);
      this._tasksStatus = 'error';
    }
  }

  async updateTask(taskId: string, newTaskForUpdate: Partial<Omit<TaskEntity, 'id'>>): Promise<void> {
    try {
      runInAction(() => {
        this._tasksStatus = 'loading';
      });
      await mockAgentInstance.updateTask(taskId, newTaskForUpdate);
      await this.loadTasks();
    } catch (err: unknown) {
      console.log(err);
    }
  }

  async deleteTask(taskId: string) {
    try {
      runInAction(() => {
        this._tasksStatus = 'loading';
      });
      await mockAgentInstance.deleteTask(taskId);
      await this.loadTasks();
    } catch (err: unknown) {
      console.log(err);
    }
  }
  unmountTasks() {
    this._tasksStatus = 'loading';
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
}

export const TasksStoreInstance = new TasksStore();
