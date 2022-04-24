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
export const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;
export const userType = JSON.parse(localStorage.getItem("userInfo"))?.userType;
export const totalize = arr => Object.values(arr)['amount'].reduce((a, b)=> a.amount + b.amount , 0)

export const accept = {Accept: "application/json,text/*;q=0.99" }