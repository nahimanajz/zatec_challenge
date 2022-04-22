import React, { useCallback, useEffect, useState } from "react";
import { BACKEND_API_ROUTE, headers } from "./util";
import { Signup } from "./screens/Signup";
import Signin from "./screens/Signin";

const axios = require("axios");

const App = React.memo(function App() {
  const[products, setProducts] = useState(false) // display loader
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const { data } = await axios.get(`${BACKEND_API_ROUTE}products`, headers);
    setProducts(data);
  }, []);
  
  useEffect(() => {
    fetchData();
  }, []);


    // return <Home  />;

  return (
    <>
   
     <div className="app">
      <main className={"padding-32"}>
      <Switch>
      {/* <Route
        path="/signup"
        element={
          <MyList
            changeScreenTitle={changeScreenTitle}
            countries={addedCountries && addedCountries}
            updateCountry={updateCountry}
            deleteCountry={deleteCountry}
            goToDetail={goToDetail}
          />
        }
      /> */}
      <Route path="/">
            <Signin/>
      </Route>
        <Route path="/Signup">
          <Signup />
        </Route>
       </Switch>
      </main>
    </div>
    </>
  );
})

export default App;
