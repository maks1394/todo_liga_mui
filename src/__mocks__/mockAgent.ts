import { data } from './data';
import { sleep } from 'helpers/index';
import { TaskEntity } from 'domains/index';

export class MockAgent {
  async loadTasks(): Promise<TaskEntity[]> {
    await sleep(1000);
    return data;
  }
}
