
export const BACKEND_API_ROUTE = "http://192.168.1.69:8000/api/";

/** @param { String }  input from user
 * @return { String } lower cased string
 */
export const toLowerCase = (key) => key.toLowerCase();

export const headers = {
  Authorization: `Bearer ${localStorage.getItem("userToken")}`
};
export const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;
export const userType = JSON.parse(localStorage.getItem("userInfo"))?.userType;
export const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//export const products = localStorage.getItem("products")? JSON.parse(localStorage.getItem("products")): [];
export const totalize = arr => Object.values(arr)['amount'].reduce((a, b)=> a.amount + b.amount , 0)

export const accept = {Accept: "application/json,text/*;q=0.99" }

export const calculateDiscount= (price) => {
  let percentage = 0;
  if (price === 50 || price <= 100) {
    percentage = 0;
  } else if (price === 50 || price <= 115) {
    percentage = 0.25;
  } else if (price > 120) {
    percentage = 0.5;
  }
  return percentage === 0 ? price : price - (percentage * 100 / price);
}