
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Login from "components/Auth/Login";
import Register from "components/Auth/Register";
import Home from "components/Home/Home";
import Profile from "components/Profile/Profile";
import EditProfile from "components/Profile/EditProfile";
import Explore from "components/Explore/Explore";
import Chat from "components/Chat/Chat";
import Ads from "components/Ads/Ads";
import Live from "components/Live/Live";
import Dashboard from "components/Dashboard/Dashboard";
import { AiOutlineHome } from "react-icons/ai";
import Authentication from "components/Settings/Authentication";
import PaswordReset from "components/Settings/PaswordReset";
import AccountManagement from "components/Settings/AccountManagement";
import Privacy from "components/Settings/Privacy";
import Membership from "components/Membership/Membership";
import Support from "components/Support/Support";
import CreatePost from "components/Post&Ad/CreatePost";
import CreateAd from "components/Post&Ad/CreateAd";
import AdDescription from "components/Ads/AdDescription";
import WrappedLogin from "components/Auth/Login";




var routes = [
  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon:"fa fa-home",
    component: Home,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    rtlName: "الرموز",
    icon:"fa fa-user",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/editProfile",
    name: "editProfile",
    rtlName: "الرموز",
    icon:"fa fa-user",
    component: EditProfile,
    layout: "/admin",
  },
  {
    path: "/chat",
    name: "Chat",
    rtlName: "إخطارات",
    icon:"fa fa-comment",
    component: Chat,
    layout: "/admin",
  },
   {
    path: "/ads",
    name: "Ads",
    rtlName: "إخطارات",
    icon: "fa fa-user-plus",
    component: Ads,
    layout: "/admin",
  },
  {
    path: "/adDescription/:id",
    name: "AdDescription",
    rtlName: "إخطارات",
    icon: "fa fa-user-plus",
    component: AdDescription,
    layout: "/admin",
  },
  {
    path: "/explore",
    name: "Explore",
    rtlName: "خرائط",
    icon: "fa fa-bullseye",
    component: Explore,
    layout: "/admin",
  },
  
 
  {
    path: "/live",
    name: "Live",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: Live,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "طباعة",
    icon: "fa fa-desktop",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/home",
    name: "Settings",
    rtlName: "ار تي ال",
    icon: "fa fa-cog",
     layout: "/admin",
  },
  {
    path: "/createPost",
    name: "createPost",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
     component: CreatePost,
     layout: "/admin",
  },
  {
    path: "/createAd",
    name: "createPost",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
     component: CreateAd,
     layout: "/admin",
  },
 
  {
    path: "/authentication",
    name: "Authentication",
    rtlName: "ار تي ال",
     component: Authentication,
    icon: "tim-icons icon-world",
     layout: "/admin",
  },
  {
    path: "/reset",
    name: "PasswordReset",
    rtlName: "ار تي ال",
     component: PaswordReset,
    icon: "tim-icons icon-world",
     layout: "/admin",
  },
  {
    path: "/management",
    name: "AccountManagement",
    rtlName: "ار تي ال",
     component: AccountManagement,
    icon: "tim-icons icon-world",
     layout: "/admin",
  },
  {
    path: "/privacy",
    name: "AccountManagement",
    rtlName: "ار تي ال",
     component: Privacy,
    icon: "tim-icons icon-world",
     layout: "/admin",
  },
   {
    path: "/membership",
    name: "Membership",
    rtlName: "ار تي ال",
     component: Membership,
    icon: "fa fa-address-book",
     layout: "/admin",
  },
  {
    path: "/support",
    name: "Help & Support",
    rtlName: "ار تي ال",
     component: Support,
    icon: "fa fa-question-circle",
     layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: WrappedLogin,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Register,
    layout: "/auth",
  },
  
];
export default routes;
