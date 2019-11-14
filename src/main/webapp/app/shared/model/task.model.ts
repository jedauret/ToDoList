import { Moment } from 'moment';

export interface ITask {
  id?: number;
  title?: string;
  category?: string;
  description?: string;
  due?: Moment;
  complete?: boolean;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public title?: string,
    public category?: string,
    public description?: string,
    public due?: Moment,
    public complete?: boolean
  ) {
    this.complete = this.complete || false;
  }
}
