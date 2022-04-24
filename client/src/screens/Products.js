import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BACKEND_API_ROUTE, calculateDiscount, headers, userId, userType } from "../util";

export function Products() {
  // TODO show client before and after buying
  const [products, setProducts] = useState(); 
  const [balance] = useState(localStorage.getItem('balance'))
  
  const fetchData = useCallback(async () => {
    const { data:{ products } } = await axios.get(`${BACKEND_API_ROUTE}products`, headers);
    setProducts(products);
  }, []);

  useEffect(() => {
    fetchData();
    console.log(balance)
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
                </ul>
                
                {/* TODO: set show purchase if or set discount is user is admin,  */}
                
                  {userType === "client" ? (
                    <ul type="none">
                     <li> 
                         Balance before paying is:<label className="price">{balance}</label> RWF 
                    </li>
                    <li>
                          Balance after paying would be:
                           <label className="price">
                              {(parseInt(balance) - calculateDiscount(parseInt(price)).toFixed(3))} Rwf
                             </label>
                      </li>
                      <li>
                        <button onClick={() => handlePurchase(id)} > Purchase </button>
                     </li>
                    </ul>
                  ) : (
                    <button onClick={() => handleAddDiscount(id)}>Discount</button>
                  )}
         
                <hr />
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
