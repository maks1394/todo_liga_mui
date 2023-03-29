import { action, computed, makeObservable, observable } from 'mobx';
import { TaskEntity } from './../../../domains/Task.entity';
import { RootStore } from 'modules/index';

type PrivateFields = '_tasks' | '_tasksStatus';
type TasksStatus = 'idle' | 'loading' | 'succeed' | 'error';

export class TasksStore {
  private _tasks: TaskEntity[] = [];
  private _tasksStatus: TasksStatus = 'idle';
  constructor(private rootStore: RootStore) {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStatus: observable,
      tasks: computed,
      loadTasks: action,
    });
    this.rootStore = rootStore;
  }
  async loadTasks() {
    this._tasksStatus = 'loading';
    try {
      const tasks: TaskEntity[] = await this.rootStore.agent.loadTasks();
      this._tasks = tasks;
      this._tasksStatus = 'succeed';
    } catch (err: unknown) {
      console.log(err);
      this._tasksStatus = 'error';
    }
  }
  get tasks() {
    return this._tasks;
  }
  get tasksStatus() {
    return this._tasksStatus;
  }
}
