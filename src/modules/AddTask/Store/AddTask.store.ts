import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { AddTaskEntity } from 'domains/index';
import { AddTaskRequest, TasksAgentInstance } from 'http/index';
import { mapToExternalAddTaskRequest } from 'helpers/index';

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
