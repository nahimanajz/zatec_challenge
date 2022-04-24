import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import { Products } from "./screens/Products";
import Topup from "./screens/Topup";
import NewProduct from "./screens/Admin/NewProduct";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_API_ROUTE, headers, userId, userInfo as cached, userType } from "./util";
import axios from "axios";
import { Dashoard } from "./screens/Dashboard";
import { Logout } from "./screens/Logout";
import AuthNav from "./screens/AuthNav";
import AdminNav from "./screens/AdminNav";
import PublicNav from "./screens/PublicNav";

export default function App() {
  const navigate = useNavigate()

  const [logout, setLogout] = useState(false); // display loader
  const[userInfo, setUserInfo] = useState(cached)
  const fetchData = useCallback(async () => {
    const { data:balance  } = await axios.get(
      `${BACKEND_API_ROUTE}user/${userId}`,
      headers
    );
    localStorage.setItem('balance', balance)
    
  }, []);
 
  const handleSignout = () => {
  localStorage.clear()
    navigate('/public')
    setLogout(true)
    setUserInfo(null)

 }
  useEffect(() => {
    fetchData();
  }, [fetchData, userInfo]);

  if(logout) {
    return <Logout />
  }
  return (
    <>
      <div className="header"> zAtec </div>
      <div>
        {!userInfo?(
          <PublicNav />
        ):(
        <>
          { userType.toLowerCase() === 'admin' ? (
            <AdminNav />
          ): (  
            <AuthNav />
          )}       
           <button onClick={handleSignout}>Signout</button> 
          </>
        )}        
        
      </div>
      <div className="main">
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin/new-product" element={<NewProduct />} />
          <Route path="/topup" element={<Topup />} />
          <Route path="/dashboard" element={<Dashoard />} />
          <Route path="/public" element={<PublicNav />} />
          <Route path="/auth" element={<AuthNav />} />
        </Routes>
      </div>
      <div className="footer">  </div>
    </>
  );
}
