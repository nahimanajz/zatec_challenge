import { Link, useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    //window.location.reload()
    
    navigate("/signin")
    
  }
  return (
    <>
      <button onClick={handleLogin}> Signin </button>
      <div> Thanks for shopping with us </div>
    </>
  );
};
