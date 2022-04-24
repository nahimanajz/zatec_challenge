import { Link } from "react-router-dom";

export const Logout = () => {
  return (
    <>
      <button onClick={()=> window.location.reload()}> Signin </button>
      <div> Thanks for shopping with us </div>
    </>
  );
};
