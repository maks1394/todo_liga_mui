import { StatsEntity } from 'domains/index';

export type PrivateFields = '_tasks' | '_tasksStatus' | '_stats' | '_searchForm' | '_error' | '_pushError';
export type TasksStatus = 'loading' | 'succeed' | 'error';
export type StatsType = StatsEntity;
