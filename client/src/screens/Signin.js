import axios from "axios";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_ROUTE, headers } from "../util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Signin(props) {
  const [state, setState] = useState({ email: "", password: "" });
  const handleChange = useCallback(
    (e) => {
      setState({ ...state, [e.target.name]: e.target.value });
    },
    [state]
  );

  //const navigate = useNavigate();
  const handleSignin = async() => {

    try {
      const { data } = await axios.post(`${BACKEND_API_ROUTE}auth/login`, state, {...headers, accept: 'application/json'});
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
            <label>Email</label>
            <input
              type="email"
              onChange={handleChange}
              placeholder="Email"
              name="email"
              required
            />
          </li>
          <li>
            <label>Password</label>
            <input
              type="password"
              onChange={handleChange}
              placeholder="Password"
              name="password"
              required
            />
          </li>
          <li>
            <input
              type="button"
              onClick={handleSignin}
              className="btn"
              value="Signin"
              style={{ height: 48 }}
            />
          </li>
          <li>
            <Link to="/signup">Signup</Link>            
          </li>
        </ul>
      </form>
    </>
  );
}
