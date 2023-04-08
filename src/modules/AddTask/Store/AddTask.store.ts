import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { AddTaskEntity } from 'domains/index';
import { AddTaskRequest, TasksAgentInstance } from 'http/index';
import { mapToExternalAddTaskRequest } from 'helpers/index';

type PrivateFields = '_defaultValues' | '_status' | '_error';
type StatusType = 'loading' | 'succeed' | 'error';

class AddTaskStore {
  private _defaultValues: AddTaskEntity = { info: '', title: '', important: false };
  private _status: StatusType = 'succeed';
  private _error: string | null = null;
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _defaultValues: observable,
      _status: observable,
      _error: observable,
      addTask: action,
      defaultValues: computed,
      status: computed,
      error: computed,
      pushError: action,
      closeAlert: action,
    });
  }
  async addTask(newTask: AddTaskEntity) {
    try {
      runInAction(() => {
        this._status = 'loading';
      });
      const taskRequest: AddTaskRequest = mapToExternalAddTaskRequest(newTask);
      const taskResponse = await TasksAgentInstance.addTask(taskRequest);
      await TasksAgentInstance.updateTask(String(taskResponse.id), { ...taskResponse, isCompleted: false });
      runInAction(() => {
        this._status = 'succeed';
      });
    } catch (error: unknown) {
      runInAction(() => {
        this._status = 'error';
      });
      throw new Error('Error from add Task');
    }
  }
  pushError(error: string) {
    if (!this._error) {
      this._error = error;
    }
  }
  closeAlert() {
    this._error = null;
  }
  get defaultValues() {
    return this._defaultValues;
  }
  get status() {
    return this._status;
  }
  get error() {
    return this._error;
  }
}

export const AddTaskStoreInstance = new AddTaskStore();
