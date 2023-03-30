import { TasksStore } from 'modules/Tasks';
import { MockAgent } from '__mocks__/index';

export class RootStore {
  private _tasksModule = new TasksStore(this);
  // private _agent = new MockAgent();
  get tasksModule() {
    return this._tasksModule;
  }
  // get agent() {
  //   return this._agent;
  // }
}

export const rootStoreInstance = new RootStore();
