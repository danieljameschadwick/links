import { httpFetch, HttpMethod } from "@src/util/http/httpFetch";

const get = async (url: string = '', data = {}) => {
  return await httpFetch(HttpMethod.GET, url, data);
}

export default get;
