import { data } from './data';
import { sleep } from 'helpers/index';
import { TaskEntity } from 'domains/index';
import { rootStoreInstance } from 'modules/index';

export class MockAgent {
  async loadTasks(): Promise<TaskEntity[]> {
    await sleep(1000);
    return data;
  }
  async updateTask(taskId: string, updatedTask: Partial<Omit<TaskEntity, 'id'>>): Promise<TaskEntity> {
    await sleep(1000);
    const taskForUpdate = rootStoreInstance.tasksModule.tasks.find((el) => el.taskId === taskId);
    if (taskForUpdate) {
      return { ...taskForUpdate, ...updatedTask };
    } else {
      throw new Error('Error from patch');
    }
  }
  async deleteTask(taskId: string): Promise<void> {
    await sleep(1000);
  }
}
