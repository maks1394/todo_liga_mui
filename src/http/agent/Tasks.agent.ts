import {
  AddTaskRequest,
  AddTaskResponse,
  GetAllTasksQuery,
  GetAllTasksResponse,
  GetTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from '../index';
import { BasicAgent } from './Basic.agent';

export class TasksAgent extends BasicAgent {
  constructor() {
    console.log(process.env.APP_API as string);
    super(process.env.APP_API as string);
  }
  async loadTasks(params?: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { data } = await this._http.get<GetAllTasksResponse>('/tasks', { params });

    return data;
  }
  async updateTask(taskId: string, updatedTask: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`/tasks/${taskId}`, updatedTask);
    return data;
  }
  async deleteTask(taskId: string): Promise<void> {
    await this._http.delete(`/tasks/${taskId}`);
  }
  async addTask(newTask: AddTaskRequest): Promise<AddTaskResponse> {
    const { data } = await this._http.post<AddTaskResponse>('/tasks', newTask);
    return data;
  }
  async getTask(taskId: string): Promise<GetTaskResponse> {
    const { data } = await this._http.get<GetTaskResponse>(`/tasks/${taskId}`);
    return data;
  }
}

export const TasksAgentInstance = new TasksAgent();
