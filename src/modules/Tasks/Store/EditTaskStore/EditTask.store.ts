import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { TasksStore } from '..';
import { EditTaskEntity } from 'domains/index';

type PrivateFields = '_defaultValues';
type EditTaskStatusType = 'idle' | 'loading' | 'succeed' | 'error';

export class EditTaskStore {
  private _defaultValues: EditTaskEntity = { info: '', title: '', completed: false, important: false };
  constructor(private _tasksStore: TasksStore) {
    makeObservable<this, PrivateFields>(this, {
      _defaultValues: observable,
      defaultValues: computed,
      setTaskForEdit: action,
    });
    this._tasksStore = _tasksStore;
  }
  async setTaskForEdit(taskId: string) {
    try {
      const task = await this._tasksStore.taskAgent.getTask(taskId);
      runInAction(() => {
        this._defaultValues = task;
      });
    } catch (error: unknown) {
      console.log(error);
    }
  }
  get defaultValues() {
    return this._defaultValues;
  }
}
