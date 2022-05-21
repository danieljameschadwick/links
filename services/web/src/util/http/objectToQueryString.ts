/**
 * Converts an object into a query string and returns a string
 *
 * Default behaviour is to return an empty string, as this is primarily used to append to a URL.
 *
 * @param {object} object
 */
export const objectToQueryString = (object: Object): string => {
  let queryString = "?";

  if (object === {}) {
    return "";
  }

  for (const [ , key ] of Object.entries(object)) {
    queryString += `url=${key}&`
  }

  return queryString.slice(0, queryString.length - 1);
};
