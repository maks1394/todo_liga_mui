import { data } from './data';
import { sleep } from 'helpers/index';
import { AddTaskEntity, EditTaskEntity, TaskEntity } from 'domains/index';

class MockAgent {
  async loadTasks(): Promise<TaskEntity[]> {
    await sleep(1000);
    return data;
  }
  async updateTask(taskId: string, updatedTask: Partial<EditTaskEntity>): Promise<TaskEntity> {
    await sleep(1000);
    const taskForUpdate = data.find((el) => el.taskId === taskId);
    const index = data.findIndex((el) => el.taskId === taskId);
    if (index >= 0 && taskForUpdate) {
      data.splice(index, 1, { ...taskForUpdate, ...updatedTask });
    }
    if (taskForUpdate) {
      return { ...taskForUpdate, ...updatedTask };
    } else {
      throw new Error('Error from patch');
    }
  }
  async deleteTask(taskId: string): Promise<void> {
    await sleep(1000);
    const index = data.findIndex((el) => el.taskId === taskId);
    data.splice(index, 1);
  }
  async addTask(newTask: AddTaskEntity): Promise<TaskEntity> {
    await sleep(1000);
    const task: TaskEntity = { ...newTask, taskId: String(Date.now()), completed: false };
    data.push(task);
    return task;
  }
  async getTask(taskId: string): Promise<TaskEntity> {
    await sleep(1000);
    const task = data.find((el) => el.taskId === taskId);
    if (task) {
      return task;
    } else {
      throw new Error('get Task agent mock error ');
    }
  }
}

export const mockAgentInstance = new MockAgent();
