import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { EditTaskEntity, TaskEntity } from 'domains/index';
import { mockAgentInstance } from '__mocks__/index';

type PrivateFields = '_defaultValues' | '_taskId' | '_status';
type StatusType = 'loading' | 'succeed' | 'error';

class EditTaskStore {
  private _defaultValues: EditTaskEntity = { info: '', title: '', completed: false, important: false };
  private _taskId = '';
  private _status: StatusType = 'loading';
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _defaultValues: observable,
      _taskId: observable,
      _status: observable,
      defaultValues: computed,
      taskId: computed,
      status: computed,
      setTaskForEdit: action,
    });
  }
  async setTaskForEdit(taskId: string) {
    try {
      runInAction(() => {
        this._status = 'loading';
      });
      const task = await mockAgentInstance.getTask(taskId);
      runInAction(() => {
        const { taskId, ...rest } = task;
        this._defaultValues = rest;
        this._taskId = taskId;
        this._status = 'succeed';
      });
    } catch (error: unknown) {
      console.log(error);
      runInAction(() => {
        this._status = 'error';
      });
    }
  }
  async editTask(updatedTask: Partial<Omit<TaskEntity, 'id'>>) {
    try {
      runInAction(() => {
        this._status = 'loading';
      });
      const task = await mockAgentInstance.updateTask(this._taskId, updatedTask);
      // this._status = 'loading'; // мы перенеаправляем на другую страницу, чтобы потом не было дерганий
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
  get taskId() {
    return this._taskId;
  }
  get status() {
    return this._status;
  }
}

export const EditTaskStoreInstance = new EditTaskStore();