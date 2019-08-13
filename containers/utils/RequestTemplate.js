const axios = require('axios');
axios.defaults.headers.common['Authorization'] = localStorage.getItem('fit_slug_session');

class RequestTemplate {
  static genericRequest(method, endpoint, data={}) {
    let config = {
      method: method,
      url: process.env.API_ROOT + endpoint,
      data: data,
    }
    return axios(config);
  }
}
export default RequestTemplate;
