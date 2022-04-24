import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BACKEND_API_ROUTE, headers, totalize, userId } from "../util";

export function Dashoard() {
  const [purchases, setPurchases] = useState();
  const [topups, setTopups] = useState();
  const balance = localStorage.getItem('balance') || 0
  const fetchData = useCallback(async () => {
    try {
      const {
        data: { purchases },
      } = await axios.get(
        `${BACKEND_API_ROUTE}purchases/all/${userId}`,
        headers
      );
     

      const {
        data: { topups },
      } = await axios.get(`${BACKEND_API_ROUTE}topups/all/${userId}`, headers);
      setPurchases(purchases);
      setTopups(topups);
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
      <ToastContainer />
      <div className="dashboard">
        <div className="row">Balance: {balance}</div>
        <div className="dashboard-content">
          <div className="col">
            <ul className="subtitle2">
              <strong>Topups </strong>
            </ul>

            <div className="container">
              {topups &&
                topups.map(({ amount, created_at }) => (
                  <div className="grid-row-4">
                    <ul type="none">
                      <li> Amount: {amount} RWF </li>
                      <li> Created at: {created_at.substring(0, 10)} </li>
                      <hr />
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          <div className="col">
            <ul className="subtitle2">
              <strong>Purchases </strong>
            </ul>
            <div className="container">
              {purchases &&
                purchases.map((record, index) => {
                  const { paidAmount } = record;
                  return (
                    <div className="grid-row-4">
                      <ul type="none">
                        <li> NO: {index + 1} </li>
                        <li> PaidAmount: {paidAmount} RWF: </li>                      
                        <hr />
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const iconStyle = { height: "64px", width: "64px" };
