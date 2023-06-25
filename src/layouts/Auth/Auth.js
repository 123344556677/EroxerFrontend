import React from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory
} from "react-router-dom";
import './Auth.css'


// core components
import AuthNavbar from "components/Navbars/AuthNavbar";

import routes from "routes.js";

import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import background from './background.png'
import Footer from "components/Footer/Footer";

function Auth(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const history = useHistory();
  const divStyle = {
    backgroundImage: `url(${background})`,
    
    
   
  };

  React.useEffect(
    () => {
      if (localStorage.getItem("apiToken") != null) {
        history.push("/admin/dashboard");
      }
    },
    [history]
  );

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) =>
      
        <React.Fragment>
         
        
          
            <div className="main-panel" ref={mainPanelRef} className="mt-0">
            
           
            <div className="backgroundImage" style={divStyle}>
              <AuthNavbar brandText={getBrandText(location.pathname)} />
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/" />
              </Switch>
              </div>
             
              </div>
               <Footer/>
            
          
          
        </React.Fragment>
      }

    </BackgroundColorContext.Consumer>
    
  );
}

export default Auth;
