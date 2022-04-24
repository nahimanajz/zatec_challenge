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

export default function App() {
  const navigate = useNavigate()

  const [logout, setLogout] = useState(false); // display loader
  const[userInfo, setUserInfo] = useState(cached)
  const[userType, setUserType] = useState();
  const fetchData = useCallback(async () => {
    const { data:balance  } = await axios.get(
      `${BACKEND_API_ROUTE}user/${userId}`,
      headers
    );
    localStorage.setItem('balance', balance)
    
  }, []);
 
  const handleSignout = useCallback(() => {
  localStorage.clear()
    navigate('/')
    setLogout(true)
    setUserType(null)

 },[navigate])
  useEffect(() => {
    fetchData();
  }, [fetchData, userInfo]);

  if(logout) {
    return <Logout />
  }
  const renderMenus =(userType) => {
    if(userType === 'client'){
      return (
        <>
          <Link to="products"> Products </Link>
          <Link to="topup"> Topup </Link>
          <Link to="dashboard"> Dashboard </Link>
          <button onClick={handleSignout}>Signout</button> 
        </>

      )
    } else if(userType === 'admin') {
      return (
        <>
          <Link to="products"> Products </Link>
          <Link to="admin/new-product"> New Product </Link>
          <button onClick={handleSignout}>Signout</button> 
      </>
      )
    } else {
       return (
        <>
          <Link to="signin"> Signin </Link>
          <Link to="signup"> Signup</Link> 
       </>
       )
    }
  }
  
  return (
    <>
      <div className="header"> Zatec </div>
      <div>
           {renderMenus(userType)}                 
        
      </div>
      <div className="main">
        <Routes>
          <Route exact path="/signin" element={<Signin setUserType={setUserType} />} />
          <Route exact path="/signup" element={<Signup setUserType={setUserType}/>} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/admin/new-product" element={<NewProduct />} />
          <Route exact path="/topup" element={<Topup />} />
          <Route exact path="/dashboard" element={<Dashoard />} />
          
        </Routes>
      </div>
      <div className="footer">  </div>
    </>
  );
}
