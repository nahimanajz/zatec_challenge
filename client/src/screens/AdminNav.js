import { Link } from "react-router-dom";

export default function AdminNav ({children}) {

    return (
        <>
        <Link to="/products" className="item"> Products </Link>
        <Link to="/admin/new-product" className="item"> New Product </Link>
        {children}
      </>
       
    )
}