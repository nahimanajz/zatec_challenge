import { ListableProduct } from "../components/ListableProduct";

export function Products({products}) {
  
    return (
        <div className="container">
            { products && products.map(item => <ListableProduct product={item} key={item.id} /> )}
        </div> 
    )
    }