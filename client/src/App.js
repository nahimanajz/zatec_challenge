import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import { Products } from "./screens/Products";
import Topup from "./screens/Topup";
import NewProduct from "./screens/Admin/NewProduct";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_API_ROUTE, headers, userId, userInfo as cached } from "./util";
import axios from "axios";
import { Dashoard } from "./screens/Dashboard";
import { toast } from "react-toastify";
import AdminNav from "./screens/AdminNav"
import PublicNav from "./screens/PublicNav"
import ClientNav from "./screens/ClientNav"

export default function App() {
  const navigate = useNavigate()

  const [logout, setLogout] = useState(false); // display loader
  const[userInfo] = useState(cached)
  const[userType, setUserType] = useState("public");
  const fetchData = useCallback(async () => {
    const { data:balance  } = await axios.get(
      `${BACKEND_API_ROUTE}user/${userId}`,
      headers
    );
    localStorage.setItem('balance', balance)
    
  }, []);
 
  const handleSignout = useCallback( async () => {
    const { data  } = await axios.post(`${BACKEND_API_ROUTE}auth/logout`, headers);
    toast(data.message)
    localStorage.clear()
    navigate('/signin')
    setLogout(true)
    setUserType(null)

 },[navigate])
  useEffect(() => {
    fetchData();
  }, [fetchData, userInfo, logout]);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("userInfo"))
  if(user?.userType === "client") {
    setUserType("client")
  } else if(user?.userType === "admin"){
    setUserType("admin")
  }else {
    setUserType("public")
  }
}, [userType])
  return (
    <>
      <div className="header"> Zatec </div>
      <div>
        { userType === 'public' && <PublicNav  /> }
        { userType === 'client' &&  <ClientNav> <button onClick={handleSignout}> Signout</button> </ClientNav> }
        { userType === 'admin' &&  <AdminNav> <button onClick={handleSignout}> Signout</button> </AdminNav>}
           
           
          
      </div>
      <div className="main">
        <Routes>
          <Route exact path="/signin" element={<Signin setUserType={setUserType} />} />
          <Route exact path="/signup" element={<Signup setUserType={setUserType}/>} />
          <Route exact path="/products" element={<Products userType={userType}/>} />
          <Route exact path="/admin/new-product" element={<NewProduct />} />
          <Route exact path="/topup" element={<Topup />} />
          <Route exact path="/dashboard" element={<Dashoard />} />
        </Routes>
      </div>
      <div className="footer">  </div>
    </>
  );
}
