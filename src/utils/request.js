import fetch from "dva/fetch";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  //除了response.status >= 200 && response.status < 300，那么以外的都是网络类型的错误
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 *
 * @desc 这个中间件是根据我们实际开发时后台所返回的数据结果进行分析，判断是否有来自后台的业务错误。
 * @param {object} data 后台返回的数据
 * @returns
 */
function checkServerCode(data) {
  let { code, description } = data;
  if (code !== 0) {
    throw new Error(description);
  }

  return data;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({
      data,
      headers: {
        "x-total-count": 10
      }
    }))
    .catch(err => ({ err }));
}
