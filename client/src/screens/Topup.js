import axios from "axios";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_ROUTE, headers, userId } from "../util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Topup(props) {
  const [state, setState] = useState({currency: 'RWF'});
  const handleChange = useCallback(
    (e) => {
      setState({ ...state, [e.target.name]: e.target.value });
    },
    [state]
  );

  //const navigate = useNavigate();
  const handleSaveTopup = async() => {

    try {
      const { data } = await axios.post(`${BACKEND_API_ROUTE}topup/create`, {...state, user_id: userId }, {headers});
      if (data.topup) { 
        toast(data.message)
      } else{
        toast(data.message)
      }
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <form method="post">
        <ul className="modal">
          <li>
            <label>Amount</label>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Amount"
              name="amount"
              required
            />
          </li>          
          <li>
            <input
              type="button"
              onClick={handleSaveTopup}
              className="btn"
              value="Save"
              style={{ height: 48 }}
            />
          </li>
          <li>
                   
          </li>
        </ul>
      </form>
    </>
  );
}
