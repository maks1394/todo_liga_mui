import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { EditTaskEntity } from 'domains/index';
import { mockAgentInstance } from '__mocks__/index';

type PrivateFields = '_defaultValues';

class EditTaskStore {
  private _defaultValues: EditTaskEntity = { info: '', title: '', completed: false, important: false };
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _defaultValues: observable,
      defaultValues: computed,
      setTaskForEdit: action,
    });
  }
  async setTaskForEdit(taskId: string) {
    try {
      const task = await mockAgentInstance.getTask(taskId);
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

export const EditTaskStoreInstance = new EditTaskStore();
