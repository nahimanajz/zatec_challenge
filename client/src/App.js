import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import { Products } from "./screens/Products";
import Topup from "./screens/Topup";
import NewProduct from "./screens/Admin/NewProduct";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_API_ROUTE, headers, userId, userInfo, userType } from "./util";
import axios from "axios";
import { Dashoard } from "./screens/Dashboard";

export default function App() {
  const navigate = useNavigate()

  const [products, setProducts] = useState(); // display loader
  const fetchData = useCallback(async () => {
    const { data } = await axios.get(`${BACKEND_API_ROUTE}products`, headers);
    const { data:balance  } = await axios.get(
      `${BACKEND_API_ROUTE}user/${userId}`,
      headers
    );
    localStorage.setItem('balance', balance)
    setProducts(data);
    localStorage.setItem('products', JSON.stringify(products));
  }, []);
 
  const handleSignout = () => {
  localStorage.clear()
  navigate('/')

 }
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <div className="header"> zAtec </div>
      <div>
        {!userInfo?(
        <>
          <Link to="signin"> Signin </Link>
          <Link to="signup"> Signup </Link>
        </>
        ):(
        <>
          { userType?.userType.toLowerCase() === 'admin' ? (
            <>
              <Link to="products"> Products </Link>
              <Link to="admin/new-product"> New Product </Link>
            </>
          ): (
            <>
              <Link to="products"> Products </Link>
              <Link to="topup"> Topup </Link>
              <Link to="dashboard"> Dashboard </Link>
            </>
          )}
          <Link to="/"> 
              <button onClick={handleSignout}>Signout</button> 
          </Link>
          </>
        )}        
        
      </div>
      <div className="main">
        <Routes>
          <Route exact path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/admin/new-product" element={<NewProduct />} />
          <Route path="/topup" element={<Topup />} />
          <Route path="/dashboard" element={<Dashoard />} />
        </Routes>
      </div>
      <div className="footer">  </div>
    </>
  );
}
