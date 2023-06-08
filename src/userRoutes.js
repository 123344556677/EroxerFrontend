import Chats from "AdminComponents/Chats/Chats";
import Payments from "AdminComponents/Payments/Payments";
import Users from "AdminComponents/Users/Users";
import VerifyAccounts from "AdminComponents/VerifyAccounts/VerifyAccounts";
import Dashboard from "views/Dashboard";








var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon:"fa fa-desktop",
    component: Dashboard,
    layout: "/user",
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "لوحة القيادة",
    icon:"fa fa-users",
    component: Users,
    layout: "/user",
  },
  {
    path: "/payments",
    name: "Payments",
    rtlName: "لوحة القيادة",
    icon:"fa fa-credit-card-alt",
    component:Payments,
    layout: "/user",
  },
  {
    path: "/chats",
    name: "Chats",
    rtlName: "لوحة القيادة",
    icon:"fa fa-comments",
    component:Chats,
    layout: "/user",
  },
  {
    path: "/verifyAccounts",
    name: "Verification",
    rtlName: "لوحة القيادة",
    icon:"fa fa-check",
    component:VerifyAccounts,
    layout: "/user",
  },
 

  
  
];
export default routes;
