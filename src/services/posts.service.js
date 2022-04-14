import { api } from "./api.factory";
import { BaseService } from "./base.service";

export class PostsService extends BaseService {
  constructor(api) {
    super(api, '/posts')
  }
}

export const postsService = new PostsService(api);