import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { TaskEntity } from 'domains/index';
import { mockAgentInstance } from '__mocks__/index';

type PrivateFields = '_tasks' | '_tasksStatus';
type TasksStatus = 'loading' | 'succeed' | 'error';

class TasksStore {
  private _tasks: TaskEntity[] = [];
  private _tasksStatus: TasksStatus = 'loading';
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStatus: observable,
      tasks: computed,
      tasksStatus: computed,
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
}

export const TasksStoreInstance = new TasksStore();
