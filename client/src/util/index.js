export const URL_INDEX = () =>
  "https://restcountries.com/v3.1/name/{name}?fullText=true";
export const BACKEND_API_ROUTE = "http://192.168.1.64:8000/api/";

/** @param { String }  input from user
 * @return { String } lower cased string
 */
export const toLowerCase = (key) => key.toLowerCase();

export const headers = {
  Authorization: `Bearer ${localStorage.getItem("userToken")}`
};

export const accept = {Accept: "application/json,text/*;q=0.99" }