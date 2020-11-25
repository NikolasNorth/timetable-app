import {Schedule} from './schedule';

export interface Account {
  id: string
  name: string,
  email: string,
  password: string,
  isConfirmed: boolean,
  isAdmin: boolean,
  isActive: boolean,
  numSchedules: number,
  schedules: Schedule[],
}
