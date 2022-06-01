import { Link } from "react-router-dom";

export default function ClientNav ({children}) {

    return (
        <>
              <Link to="/products" className="item"> Products </Link>
              <Link to="/topup" className="item"> Topup </Link>
              <Link to="/dashboard" className="item"> Dashboard </Link>
              {children}
        </>
       
    )
}