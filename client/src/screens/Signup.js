import { useCallback, useState } from "react";
import axios from "axios";
import { BACKEND_API_ROUTE } from "../util";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

/**
 * - User signin
 * @param {Function} props.showDashboard to show main dashboard later on sinup
 * @param {Function} props.userInfo  setUser info so that can view relavant info on dashboard
 */

export function Signup({ showDashboard, userInfo }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });
  const handleChange = useCallback(
    (e) => {
      setState({ ...state, [e.target.name]: e.target.value });
    },
    [state]
  );
  const handleSignup = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_API_ROUTE}auth/signup`, {
        state,
      });
      if (data.error) {
        toast("Please correct your data");
      } else {
        toast("Well done!!");
        userInfo(data.newUser);
        showDashboard(true);
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
              required
            />
          </li>
          <li>
            <label>User Type</label>
            <select
              type="select"
              onChange={handleChange}
              name="userType"
              required
            >
              <option>Client</option>
              <option>Admin</option>
            </select>
          </li>

          <li>
            <input
              type="button"
              onClick={handleSignup}
              className="btn"
              value="Signup"
              style={{ height: 48 }}
              disabled={state.length < 6 ? true : false}
            />
          </li>
          <li>
            <Link to="/"> Signup </Link>
          </li>
        </ul>
      </form>
    </>
  );
}
