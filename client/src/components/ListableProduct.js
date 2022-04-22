import { ToastContainer } from "react-toastify";
import { Add } from "../assets/Add";
import { Bin } from "../assets/Bin";
import { Check } from "../assets/Check";

export function ListableProduct() {
  return (
    <>
      <ToastContainer />
      <div className="grid-col-3 m-top-32">       
              <div className="grid-row-4">
                <img
                  className="flag onlist"
                  onClick={()=>alert()}                  
                  alt="flag"
                  
                />

                <ul className="subtitle2">
                  <strong>{'name'}</strong>
                </ul>

                <ul type="none">
                  <li>Population:{''}</li>
                  <li>Capital: {''} </li>
                  <li>Currency: {''}</li>
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
