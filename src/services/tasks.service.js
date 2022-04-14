import { api } from "./api.factory";
import { BaseService } from "./base.service";

export class TasksService extends BaseService {
  constructor(api) {
    super(api, '/todos')
  }
}

export const tasksService = new TasksService(api);