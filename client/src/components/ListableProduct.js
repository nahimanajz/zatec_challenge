import { ToastContainer } from "react-toastify";
import { Add } from "../assets/Add";
import { Bin } from "../assets/Bin";
import { Check } from "../assets/Check";

export function ListableProduct({item}) {
  const {id, name, price, discount } = item
  //TODO:
  const balanceAfterShopping = ()=>{
    const balance = localStorage.getItem('userInfo').balance  
  } 
  const balancebBeforeShopping = ()=>{
    localStorage.getItem('userInfo').balance
  } 
  return (
    <>
      <ToastContainer />
      <div className="grid-col-3 m-top-32">       
              <div className="grid-row-4">
                <img
                  className="flag onlist"
                  onClick={()=>alert()}                  
                  alt="flag"
                  src={'someimage'}
                  
                />

                <ul className="subtitle2">
                  <strong>{name}</strong>
                </ul>

                <ul type="none">
                  <li>Rwf:{price}</li>
                  <li>Discount: {discount} Rwf </li>
                  <li>Currency: {''}</li>
                  <hr />
                </ul>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  
                    <span style={iconStyle} onClick={()=>alert('')}>
                      <Add />
                    </span>
                  ) : (
                    <>
                      <span
                        style={iconStyle}
                        onClick={''}
                      >
                        <Bin />
                      </span>
                      <span
                        style={iconStyle}
                        onClick={''}
                      >
                        <Check checked={true} />
                      </span>
                    </>
                 
                </div>
              </div>
      </div>
    </>
  );
}
const iconStyle = { height: "64px", width: "64px" };
