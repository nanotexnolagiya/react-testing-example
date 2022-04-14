import { api } from "./api.factory";

export class BaseService {
  constructor(api, path = '/') {
    this.api = api
    this.path = path
  }

  findAll = (options) => {
    return this.api.get(this.path, options)
  }

  find = (model, options) => {
    return this.api.get(`${this.path}/${model}`, options)
  }

  create = (data, options) => {
    return this.api.post(this.path, data, options)
  }

  update = (model, data, options) => {
    return this.api.put(`${this.path}/${model}`, data, options)
  }

  delete = (model, data, options) => {
    return this.api.delete(`${this.path}/${model}`, data, options)
  }
}

export const baseService = new BaseService(api);
