import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BACKEND_API_ROUTE, calculateDiscount, headers, userId } from "../util";

export function Products(props) {
  // TODO show client before and after buying
  const [products, setProducts] = useState(); 
  const [showModal, showEditModal] = useState(false)
  const [productId, setProductId] = useState(0)
  const [discount, setNewDiscount] = useState(0)
  
  const fetchData = useCallback(async () => {
    const { data:{ products } } = await axios.get(`${BACKEND_API_ROUTE}products`, headers);
    setProducts(products);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePurchase = async (id) => {
    try {
      const { data } = await axios.post(`${BACKEND_API_ROUTE}purchases/new/${userId}/${id}`, headers)
      toast(data.message)
    } catch (error) {
      toast.error(error.message)      
    }

  };
  const handleAddDiscount = async() => {  
    try {
    const { data } = await axios.put(`${BACKEND_API_ROUTE}discount/${productId}/${discount}`, headers)
    toast(data.message)
    showEditModal(false)
      
  } catch (error) {
      console.log(error.message)
      toast.error('something went wrong')
    }
  };
  return (
    <>
    <ToastContainer />
    {showModal ? (
      <>
        <div> Set new disount </div>
        <input type="text" name="product_id" onChange={(e)=> setNewDiscount(e.target.value)}/>
        <button onClick={handleAddDiscount}>Update</button>
      </>
    
    ) : (
      <div className="container">
      {!products && <div className="not-found">Not found</div>}
      {products &&
        products.map(({ id,name, price, discount }) => (
          <div className="grid-col-3 m-top-32">
            <div className="grid-row-4">
              <ul className="subtitle2">
                <strong>{name}</strong>
              </ul>
              <ul type="none">
                  <li>Price:{price} Rwf</li>
                </ul>
                {/* TODO: set show purchase if or set discount is user is admin,  */}
                  {props.userType === "client" ? (
                    <ul type="none">                     
                      <li className="price">
                        You Pay: {calculateDiscount(parseInt(price)).toFixed(2)} Rwf                         
                      </li>
                      <li>
                        <button onClick={() => handlePurchase(id)} > Purchase </button>
                     </li>
                    </ul>
                  ) : (
                    <button onClick={()=> {
                      showEditModal(true)
                      setProductId(id)
                    }}>Discount</button>
                  )}
         
                <hr />
            </div>
          </div>
        ))}
    </div>
    )}
    
  </>
  );
}
