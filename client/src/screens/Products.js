import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BACKEND_API_ROUTE, headers, userId, userType } from "../util";

export function Products() {
  // TODO show client before and after buying
  const [products, setProducts] = useState(); // display loader
  
  const fetchData = useCallback(async () => {
    const { data:{ products } } = await axios.get(`${BACKEND_API_ROUTE}products`, headers);
    setProducts(products);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePurchase = async(id) => {
    try {
      const { data } = await axios.post(`${BACKEND_API_ROUTE}purchases/new/${userId}/${id}`, headers)
      toast(data.message)
    } catch (error) {
      toast.error(error.message)      
    }

  };
  const handleAddDiscount = (id) => {
    alert(id);
  };
  return (
    <>
    <ToastContainer />
    <div className="container">
      {!products && <div>Not found</div>}
      {products &&
        products.map(({ id,name, price, discount }) => (
          <div className="grid-col-3 m-top-32">
            <div className="grid-row-4">
              <ul className="subtitle2">
                <strong>{name}</strong>
              </ul>
              <ul type="none">
                <li>Price:{price} Rwf</li>
                <li>
                  Discount: <i className="decorate">{discount} Rwf</i>{" "}
                </li>
                {/* TODO: set show purchase if or set discount is user is admin,  */}
                <li>
                  {userType === "client" ? (
                    <button onClick={() => handlePurchase(id)}>Purchase</button>
                  ) : (
                    <button onClick={() => handleAddDiscount(id)}>Discount</button>
                  )}
                </li>
                <hr />
              </ul>
            </div>
          </div>
        ))}

      {/* {JSON.stringify(products)}
            { products && products.map(item => <ListableProduct product={item} key={item.id} /> )} */}
    </div>
  </>
  );
}
const iconStyle = { height: "64px", width: "64px" };
