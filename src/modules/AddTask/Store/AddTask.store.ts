import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { mockAgentInstance } from '__mocks__/index';
import { AddTaskEntity } from 'domains/index';

type PrivateFields = '_defaultValues' | '_status';
type StatusType = 'loading' | 'succeed' | 'error';

class AddTaskStore {
  private _defaultValues: AddTaskEntity = { info: '', title: '', important: false };
  private _status: StatusType = 'succeed';
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _defaultValues: observable,
      _status: observable,
      addTask: action,
      defaultValues: computed,
      status: computed,
    });
  }
  async addTask(newTask: AddTaskEntity) {
    try {
      runInAction(() => {
        this._status = 'loading';
      });
      await mockAgentInstance.addTask(newTask);
      runInAction(() => {
        this._status = 'succeed';
      });
    } catch (error: unknown) {
      runInAction(() => {
        this._status = 'error';
      });
      throw new Error('Error from edit Task');
    }
  }
  get defaultValues() {
    return this._defaultValues;
  }
  get status() {
    return this._status;
  }
}

export const AddTaskStoreInstance = new AddTaskStore();