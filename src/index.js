
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import AuthLayout from "layouts/Auth/Auth.js";
import { Provider } from "react-redux";
import {store,persistor} from "components/redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
     <Provider store={store} >
       <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
          
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
      </PersistGate>
      </Provider>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);