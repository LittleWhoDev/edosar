/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import { default as DashboardCetatean } from "views/Dashboard/DashboardCetatean.js";
import { default as DashboardPrimarie } from "views/Dashboard/DashboardPrimarie.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Sabloane from "views/TableList/Sabloane";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import { CETATEAN } from "api/roles";
import { PRIMARIE } from "api/roles";

const dashboardRoutesCetatean = [
  {
    path: "/dashboard",
    name: "Panou de control",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardCetatean,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Dosarele tale",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/sabloane",
    rtlName: "قائمة الجدول",
    name: "Depune dosare",
    icon: "content_paste",
    component: Sabloane,
    layout: "/admin",
  }
];

const dashboardRoutesPrimarie = [
  {
    path: "/dashboard",
    name: "Panou de control",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPrimarie,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Dosarele tale",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/sabloane",
    rtlName: "قائمة الجدول",
    name: "Administreaza sabloane",
    icon: "content_paste",
    component: Sabloane,
    layout: "/admin",
  }
]

const dashboardRoutes = parseInt(localStorage.getItem("role")) === CETATEAN ? dashboardRoutesCetatean : dashboardRoutesPrimarie;

export default dashboardRoutes;
