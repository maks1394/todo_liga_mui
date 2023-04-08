import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import axios from 'axios';
import { EditTaskEntity } from 'domains/index';
import { TasksAgentInstance, UpdateTaskRequest } from 'http/index';
import { mapToExternalUpdateTaskRequest, mapToInternalTask } from 'helpers/index';

type PrivateFields = '_defaultValues' | '_taskId' | '_status' | '_error';
type StatusType = 'loading' | 'succeed' | 'error';

class EditTaskStore {
  private _defaultValues: EditTaskEntity = { info: '', title: '', completed: false, important: false };
  private _taskId = '';
  private _status: StatusType = 'loading';
  private _error: string | null = null;
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _defaultValues: observable,
      _taskId: observable,
      _status: observable,
      _error: observable,
      defaultValues: computed,
      taskId: computed,
      status: computed,
      error: computed,
      setTaskForEdit: action,
      pushError: action,
      closeAlert: action,
    });
  }
  async setTaskForEdit(taskId: string) {
    try {
      runInAction(() => {
        this._status = 'loading';
      });
      const task = mapToInternalTask(await TasksAgentInstance.getTask(taskId));
      runInAction(() => {
        const { taskId, ...rest } = task;
        this._defaultValues = rest;
        this._taskId = taskId;
        this._status = 'succeed';
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        this.pushError(error.message);
      } else {
        this.pushError('Возникла ошибка при загрузке данных задачи');
      }
      runInAction(() => {
        this._status = 'error';
      });
    }
  }
  async editTask(updatedTask: Partial<EditTaskEntity>) {
    try {
      runInAction(() => {
        this._status = 'loading';
      });
      const taskRequest: UpdateTaskRequest = mapToExternalUpdateTaskRequest(updatedTask);
      await TasksAgentInstance.updateTask(this._taskId, taskRequest);
    } catch (error: unknown) {
      runInAction(() => {
        this._status = 'error';
      });
      throw new Error('Error from edit Task');
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
  get taskId() {
    return this._taskId;
  }
  get status() {
    return this._status;
  }
  get error() {
    return this._error;
  }
}

export const EditTaskStoreInstance = new EditTaskStore();
