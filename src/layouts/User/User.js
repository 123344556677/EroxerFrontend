import React from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
 
} from "react-router-dom";
import "./User.css";
// javascript plugin used to create scrollbars on windows

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";

import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "userRoutes";

import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { useState } from "react";
import AdminSidebar from "components/Sidebar/AdminSidebar";
// import { User } from "backend-sdk/user.sdk";



function User(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))

  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  // React.useEffect(() => {
  //   if (
  //     localStorage.getItem("apiToken") === null ||
  //     localStorage.getItem("user") === null
  //   ) {
  //     localStorage.clear();
  //     history.push("/auth/login");
  //   }
  //   async function checkToken() {
  //     const res = await User.getUserByToken(localStorage.getItem("apiToken"));
  //     if (!res || !res.success) {
  //       localStorage.clear();
  //       history.push("/auth/login");
  //     }
  //   }
  //   checkToken();
  // });
  // React.useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     document.documentElement.className += " perfect-scrollbar-on";
  //     document.documentElement.classList.remove("perfect-scrollbar-off");
  //     ps = new PerfectScrollbar(mainPanelRef.current, {
  //       suppressScrollX: true,
  //     });
  //     let tables = document.querySelectorAll(".table-responsive");
  //     for (let i = 0; i < tables.length; i++) {
  //       ps = new PerfectScrollbar(tables[i]);
  //     }
  //   }
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       ps.destroy();
  //       document.documentElement.classList.add("perfect-scrollbar-off");
  //       document.documentElement.classList.remove("perfect-scrollbar-on");
  //     }
  //   };
  // });
  // React.useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     let tables = document.querySelectorAll(".table-responsive");
  //     for (let i = 0; i < tables.length; i++) {
  //       ps = new PerfectScrollbar(tables[i]);
  //     }
  //   }
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   if (mainPanelRef.current) {
  //     mainPanelRef.current.scrollTop = 0;
  //   }
  // }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/user") {
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
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper ">
            <Sidebar
              routes={routes}
              logo={{
                outterLink: "https://www.creative-tim.com/",
                text: "Creative Tim",
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />

            <div className="main-panel admin-panel" ref={mainPanelRef}>
            {
              // <AdminNavbar
              //   brandText={getBrandText(location.pathname)}
              //   toggleSidebar={toggleSidebar}
              //   sidebarOpened={sidebarOpened}
              // />
            }
              {
                userId?.id?
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/" />
              </Switch>
              :
              <Switch>
                <Redirect from="*" to="/" />
              </Switch>
              }
              {
                // {
                //   // we don't want the Footer to be rendered on map page
                //   location.pathname === "/admin/maps" ? null : <Footer fluid />
                // }
              }
            </div>
            <AdminSidebar
              routes={routes}
              logo={{
                outterLink: "https://www.creative-tim.com/",
                text: "Creative Tim",
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />
          </div>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default User;
