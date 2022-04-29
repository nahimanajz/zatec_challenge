import { Link } from "react-router-dom";

export default function PublicNav () {
 
    return (
        <>
         <Link to="/signin"> Signin </Link>
         <Link to="/signup"> Signup</Link> 
        </>
       
    )
}