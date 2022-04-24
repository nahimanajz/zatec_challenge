import axios from "axios";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_ROUTE, headers } from "../../util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//TODO: put 
export default function NewProduct(props) {
  const [state, setState] = useState();
  const handleChange = useCallback(
    (e) => {
      setState({ ...state, [e.target.name]: e.target.value });
    },
    [state]
  );

  //const navigate = useNavigate();
  const handleSave = async() => {

    try {
      const { data } = await axios.post(`${BACKEND_API_ROUTE}products/create`, state, {...headers, accept: 'application/json'});
      if (data.token) {
        localStorage.setItem("userInfo", data.user);
        localStorage.setItem("userToken", data.token);
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
            <label>Name</label>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Name"
              name="name"
              required
            />
          </li>
          <li>
            <label>Price</label>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Price"
              name="price"
              required
            />
          </li>
          <li>
            <label>Discount</label>
            <input
              type="text"
              onChange={handleChange}
              placeholder="discount"
              name="discount"
              required
            />
          </li>
          <li>
            <input
              type="button"
              onClick={handleSave}
              className="btn"
              value="Save"
              style={{ height: 48 }}
            />
          </li>
        </ul>
      </form>
    </>
  );
}
