const axios = require('axios');

class RequestTemplate {
  static genericRequest(method, endpoint, data={}) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('fit_slug_session');
    let config = {
      method: method,
      url: process.env.API_ROOT + endpoint,
      data: data,
    }
    return axios(config);
  }
}
export default RequestTemplate;
