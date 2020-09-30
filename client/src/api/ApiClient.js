import axios from "axios";

const getClient = (baseUrl = null, headers = null) => {
  const options = {
    baseURL: baseUrl,
    headers: headers,
  };

  const client = axios.create(options);

  client.interceptors.request.use(
    (requestConfig) => requestConfig,
    (requestError) => {
      return Promise.reject(requestError);
    }
  );

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status >= 500) {
        throw error;
      }
      return Promise.reject(error);
    }
  );

  client.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem("token");
      if (token) {
        config.headers = {};
        config.headers["authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return client;
};

class ApiClient {
  constructor(baseUrl = null) {
    this.client = getClient(baseUrl);
  }

  get(url, params = {}, conf = {}) {
    if (Object.keys(params).length > 0) {
      const qs = new URLSearchParams(params);
      url += "?" + qs;
    }
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
}

export { ApiClient };
