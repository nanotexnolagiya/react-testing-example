export class APIFactory {
  constructor(options = {}) {
    this._baseURL = options.baseURL || '';
    this._headers = options.headers || {};
  }

  _fetchJSON = async (endpoint, options = {}) => {
    const res = await fetch(this._baseURL + endpoint, {
      ...options,
      headers: this._headers
    });

    if (!res.ok) throw new Error(res.statusText);

    if (!options.responseType) options.responseType = 'json'

    if (options.parseResponse !== false && res.status !== 204) {
      if (!['json', 'blob', 'arrayBuffer', 'formData', 'text'].includes(options.responseType)) {
        throw new Error('Invalid responseType in options')
      } else {
        return res[options.responseType]()
      }
    }

    return undefined;
  };

  setBasicAuth = token => {
    this._headers.Authorization = `${token}`;
    return this;
  };

  setHeader = (key, value) => {
    this._headers[key] = value;
    return this;
  };

  get = (endpoint, options = {}) => {
    return this._fetchJSON(endpoint, {
      ...options,
      method: 'GET'
    });
  };

  post = (endpoint, body, options = {}) => {
    const isFormData = body instanceof FormData;
    return this._fetchJSON(endpoint, {
      ...options,
      body: isFormData ? body : JSON.stringify(body),
      method: 'POST'
    });
  };

  patch = (endpoint, body, options = {}) => {
    const isFormData = body instanceof FormData;
    return this._fetchJSON(endpoint, {
      ...options,
      body: isFormData ? body : JSON.stringify(body),
      method: 'PATCH'
    });
  };

  put = (endpoint, body, options = {}) => {
    const isFormData = body instanceof FormData;
    return this._fetchJSON(endpoint, {
      ...options,
      body: isFormData ? body : JSON.stringify(body),
      method: 'PUT'
    });
  };

  delete = (endpoint, body, options = {}) => {
    const isFormData = body instanceof FormData;
    return this._fetchJSON(endpoint, {
      parseResponse: false,
      ...options,
      body: isFormData ? body : JSON.stringify(body),
      method: 'DELETE'
    });
  };
}

export const api = new APIFactory({
  baseURL: 'https://jsonplaceholder.typicode.com'
});
