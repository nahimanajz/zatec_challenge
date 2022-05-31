import { Link } from "react-router-dom";

export default function PublicNav () {
 
    return (
        <>
         <Link to="/signin" className="item"> Signin </Link>
         <Link to="/signup" className="item"> Signup</Link> 
        </>
       
    )
}