import { Link } from "react-router-dom";

export default function ClientNav ({children}) {

    return (
        <>
              <Link to="/products"> Products </Link>
              <Link to="/topup"> Topup </Link>
              <Link to="/dashboard"> Dashboard </Link>
              {children}
        </>
       
    )
}