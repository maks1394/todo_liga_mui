import { StatsEntity } from 'domains/index';

export type PrivateFields = '_tasks' | '_tasksStatus' | '_stats';
export type TasksStatus = 'loading' | 'succeed' | 'error';
export type StatsType = StatsEntity;
