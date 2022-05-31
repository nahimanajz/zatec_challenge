import { useCallback, useState } from "react";
import axios from "axios";
import { BACKEND_API_ROUTE, headers } from "../util";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

/**
 * - User signin
 * @param {Function} props.showDashboard to show main dashboard later on sinup
 * @param {Function} props.userInfo  setUser info so that can view relavant info on dashboard
 */

export default function Signup(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    userType: "client",
    balance:0
  });
  const handleChange = useCallback(
    (e) => {
      setState({ ...state, [e.target.name]: e.target.value });
    },
    [state]
  );
  const handleSignup = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_API_ROUTE}auth/signup`, state, headers);
      if (data.error) {
        toast("Please correct your data");
      } else {
        toast("Well done!!");
        localStorage.setItem('userInfo', JSON.stringify(data.user))
        props.setUserType(data.user.userType)
        navigate('/signin')
      }
    } catch (error) {
      console.log(error.message)
      toast('Given data was invalid');
    }
  };
  return (
    <>
      <ToastContainer />
      <form method="post">
        <ul className="modal">
          <li>
            <label> Name</label>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Name"
              name="name"
              required
            />
          </li>
          <li>
            <label> Password</label>
            <input
              type="password"
              onChange={handleChange}
              placeholder="Password"
              name="password"
              autoComplete="off"
              required
            />
          </li>
          <li>
            <label>Email</label>
            <input
              type="email"
              onChange={handleChange}
              placeholder="Email"
              name="email"
              autoComplete="off"
              required
            />
          </li>
          <li>
            <label>User Type (optional) {state?.userType}</label>
            <select
              type="select"
              onChange={handleChange}
              name="userType"
              required
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </li>

          <li>
            <input
              type="button"
              onClick={handleSignup}
              className="btn"
              value="Signup"
              style={{ height: 48 }}             
            />
          </li>
        </ul>
      </form>
    </>
  );
}
