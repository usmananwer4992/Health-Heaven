import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

export const routes = [
  {
    path: "/admin/partner/:id/edit",
    component: <PrivateRoute />,
    isPublic: false,
  },
  { path: "/admin/login", component: <PublicRoute />, isPublic: true },
  { path: "/login", component: <PublicRoute />, isPublic: true },
  { path: "/admin/", component: <PrivateRoute />, isPublic: false },
  {
    path: "/admin/partner/list",
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: "/admin/partner/add",
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: "/admin/partner/addUser",
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: "/admin/partner/users",
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: "/admin/users",
    component: <PrivateRoute />,
    isPublic: false,
  },
  {

    path: "/admin/access/types",

    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: '/admin/customer/list',
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: '/admin/customer/add',
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: '/customer/list',
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: '/customer/add',
    component: <PrivateRoute />,
    isPublic: false,
  },


  { path: '/', component: <PrivateRoute />, isPublic: false },
  {
    path: "/admin/access/types/edit",
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: "/admin/ç",
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: "/admin/drug-class/list",
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: "/admin/drug-form/list",
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: "/admin/drug-type/list",
    component: <PrivateRoute />,
    isPublic: false,
  },
  {
    path: "/admin/agegroup/list",
    component: <PrivateRoute />,
    isPublic: false,
  },
  { path: "/", component: <PrivateRoute />, isPublic: false },

];
