import { httpFetch, HttpMethod } from "@src/util/http/httpFetch";

const post = async (url: string = '', data = {}) => {
  return await httpFetch(HttpMethod.POST, url, data);
}

export default post;
