import { Link } from "react-router-dom";

export default function AuthNav () {

    return (
        <>
        <Link to="products"> Products </Link>
        <Link to="admin/new-product"> New Product </Link>
      </>
       
    )
}