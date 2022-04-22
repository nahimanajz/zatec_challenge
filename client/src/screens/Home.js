import { useState } from "react";
import Signin  from './Signin';
import { Signup } from "./Signup";

export default function Home(props) {
    const[showLogin, setShowLogin] = useState(false);
    const switchScreens = ()=> setShowLogin(!showLogin);

    return(<>
    
        <div className="cover">
            <div className="model-header">
                <div className={showLogin?'inactive':'active'} onClick={switchScreens}>Signup</div>
                <div className={showLogin?'active':'inactive'} onClick={switchScreens}>Signin</div>
            </div>
            {showLogin? <Signin />: <Signup /> }
             
        </div>
        
        </>
    )
}
