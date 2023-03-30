import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { EditTaskStore } from './EditTaskStore';
import { MockAgent } from '__mocks__/index';
import { TaskEntity } from 'domains/index';
import { RootStore } from 'modules/index';

type PrivateFields = '_tasks' | '_tasksStatus';
type TasksStatus = 'idle' | 'loading' | 'succeed' | 'error';

export class TasksStore {
  private _tasks: TaskEntity[] = [];
  private _tasksStatus: TasksStatus = 'idle';
  private _taskAgent = new MockAgent();
  private _editTaskStore = new EditTaskStore(this);
  constructor(private rootStore: RootStore) {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStatus: observable,
      tasks: computed,
      tasksStatus: computed,
      loadTasks: action,
      updateTask: action,
      deleteTask: action,
    });
    // makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async loadTasks() {
    this._tasksStatus = 'loading';
    try {
      const tasks: TaskEntity[] = await this._taskAgent.loadTasks();
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
      const task = await this._taskAgent.updateTask(taskId, newTaskForUpdate);
      const index = this._tasks.findIndex((el) => el.taskId === task.taskId);
      if (index >= 0) {
        runInAction(() => {
          this._tasks.splice(index, 1, task);
        });
      }
    } catch (err: unknown) {
      console.log(err);
    }
  }

  async deleteTask(taskId: string) {
    try {
      await this._taskAgent.deleteTask(taskId);
      const index = this._tasks.findIndex((el) => el.taskId === taskId);
      runInAction(() => {
        this._tasks.splice(index, 1);
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }
  get tasks() {
    return this._tasks;
  }
  get tasksStatus() {
    return this._tasksStatus;
  }
  get editTaskStore() {
    return this._editTaskStore;
  }
  get taskAgent() {
    return this._taskAgent;
  }
}
