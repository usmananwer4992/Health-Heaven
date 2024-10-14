import { Roles } from "../routeConfiguration";

// Components
import AdminDashboard from "../Dashboard/AdminDashboard";
import PartnerDashboard from "../Dashboard/PartnerDashboard";
import Partner from "../components/Partner/Partner";
import PartnerList from "../components/Partner/PartnerList";
import PartnerUser from "../components/Partner/PartnerUser";
import PartnerUserList from "../components/Partner/User/PartnerUserList";
import PartnerSpecificUsers from "../components/PartnerPortal/PartnerUsers/PartnerSpecificUsers"
import PartnerUserCreate from "../components/Partner/User/CreateUser";
import UsersList from "../components/Partner/User/UserList";
import AccessTypes from "../components/ACL/AccessType";
import AccessTypeEdit from "../components/ACL/AccessTypeEdit";
import CustomerList from "../components/Customer/CustomerList";
import Customer from "../components/Customer/Customer";
import PartnersCustomer from "../components/PartnerPortal/PartnersCustomer/PartnersCustomer";
import PartnersCustomerList from "../components/PartnerPortal/PartnersCustomer/PartnerCustomersList";
import List from "../components/DrugCategory/List";
import DrugClassList from "../components/DrugClass/DrugClassList";
import DrugFormList from "../components/DrugForm/DrugFormList";
import DrugTypeList from "../components/DrugType/DrugTypeList";
import AgeGroupList from "../components/AgeGroup/AgeGroupList";
import PharmacyList from "../components/Pharmacy/PharmacyList";
import Drugs from "../components/Drugs/Drugs";
import DrugForm from "../components/Drugs/DrugForm";
import TransferList from "../components/Transfer/TransferList";
import Transfer from "../components/Transfer/Transfer";
import PartnerTransferList from "../components/PartnerPortal/PartnersTransfer/PartnerTransferList";
import PartnerTransfer from "../components/PartnerPortal/PartnersTransfer/PartnerTransfer";
import SigsList from "../components/Sigs/SigsList";
import OrderList from "../components/Orders/OrderList";
import OrdersForm from "../components/Orders/OrderForm";
import OrderFormEdit from "../components/Orders/OrderFormEdit";
import PartnerOrderForm from "../components/Orders/PartnerOrderForm";
import InternalUser from "../components/Partner/User/CreateInternalStaff";
import OrderView from "../components/Orders/OrderView";
import OrderAdmin from "../components/Orders/OrderAdmin";
export default [
  /*****
   *
   * ADMIN ROUTES SHOULD BELOW
   *
   */ {
    component: AdminDashboard,
    path: "/admin/dashboard",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: Partner,
    path: "/admin/partner/:id/edit",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: PartnerList,
    path: "/admin/partners",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: Partner,
    path: "/admin/partner/register",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: PartnerUser,
    path: "/admin/partner/user/register",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: PartnerUserCreate,
    path: "/admin/partner/staff/register",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: InternalUser,
    path: "/admin/staffs/register",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: InternalUser,
    path: "/admin/staffs/:id/edit",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: PartnerUser,
    path: "/admin/partner/user/:id/edit",
    title: "Partner User Edit",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: PartnerUserList,
    path: "/admin/partner/users",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: UsersList,
    path: "/admin/users",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: TransferList,
    path: "/admin/transfers",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: Transfer,
    path: "/admin/transfer/register",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: Transfer,
    path: "/admin/transfer/:id",
    title: "Transfer View",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: AccessTypes,
    path: "/admin/access/types",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: AccessTypes,
    path: "/admin/access/types",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: AccessTypeEdit,
    path: "/admin/access/types/edit/:id",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: CustomerList,
    path: "/admin/customers",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: Customer,
    path: "/admin/customers/add",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: Customer,
    path: "/admin/customers/:id/edit",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: List,
    path: "/admin/drug/categories",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: DrugClassList,
    path: "/admin/drug/classes",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: DrugFormList,
    path: "/admin/drug/forms",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: DrugTypeList,
    path: "/admin/drug/types",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: Drugs,
    path: "/admin/drug/drugs",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: AgeGroupList,
    path: "/admin/agegroups",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: DrugForm,
    path: "/admin/drug/drugs/add",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: DrugForm,
    path: "/admin/drug/drugs/:id/edit",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: PharmacyList,
    path: "/admin/pharmacies",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: SigsList,
    path: "/admin/order/sigs",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: OrderFormEdit,
    path: "/admin/orders/:id/edit",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: OrdersForm,
    path: "/admin/orders/add",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: OrderList,
    path: "/admin/orders",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: OrderView,
    path: "/admin/orders/:id/view",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },
  {
    component: OrderAdmin,
    path: "/admin/orders/:id/admin",
    title: "Admin Dashboard",
    permission: [Roles["SUPER-ADMIN"]],
  },



  /*****
   *
   * PARTNER ROUTES SHOULD BELOW
   *
   */
  {
    component: PartnerDashboard,
    path: "/partner/dashboard",
    title: "Profile",
    permission: [Roles.PARTNER],
  },
  {
    component: PartnersCustomerList,
    path: "/partner/customers",
    title: "Profile",
    permission: [Roles.PARTNER],
  },
  {
    component: PartnersCustomer,
    path: "/partner/customer/add",
    title: "Profile",
    permission: [Roles.PARTNER],
  },
  {
    component: PartnerTransferList,
    path: "/partner/transfers",
    title: "Transfer List",
    permission: [Roles.PARTNER],
  },
  {
    component: PartnerTransfer,
    path: "/partner/transfer/register",
    title: "Transfer Register",
    permission: [Roles.PARTNER],
  },
  {
    component: Transfer,
    path: "/partner/transfer/:id/edit",
    title: "Transfer Edit",
    permission: [Roles.PARTNER],
  },
  {
    component: Transfer,
    path: "/partner/transfer/:id",
    title: "Transfer View",
    permission: [Roles.PARTNER],
  },
  {
    component: OrderFormEdit,
    path: "/partner/orders/:id/edit",
    title: "Orders View",
    permission: [Roles.PARTNER],
  },
  {
    component: PartnerOrderForm,
    path: "/partner/orders/add",
    title: "Orders View",
    permission: [Roles.PARTNER],
  },
  {
    component: OrderList,
    path: "/partner/orders",
    title: "Orders View",
    permission: [Roles.PARTNER],
  },
  {
    component: AgeGroupList,
    path: "/partner/agegroups",
    title: "Age Grops",
    permission: [Roles.PARTNER],
  },
  {
    component: SigsList,
    path: "/partner/order/sigs",
    title: "Sigs List",
    permission: [Roles.PARTNER],
  },
  {
    component: List,
    path: "/partner/drug/categories",
    title: "Drug Category",
    permission: [Roles.PARTNER],
  },
  {
    component: DrugClassList,
    path: "/partner/drug/classes",
    title: "Drug Class",
    permission: [Roles.PARTNER],
  },
  {
    component: DrugFormList,
    path: "/partner/drug/forms",
    title: "Drug Form",
    permission: [Roles.PARTNER],
  },
  {
    component: DrugTypeList,
    path: "/partner/drug/types",
    title: "Drug Type",
    permission: [Roles.PARTNER],
  },
  {
    component: Drugs,
    path: "/partner/drug/drugs",
    title: "Drugs",
    permission: [Roles.PARTNER],
  },
  {
    component: PartnerSpecificUsers,
    path: "/partner/users",
    title: "Partners Users List",
    permission: [Roles.PARTNER],
  },
  {
    component: SigsList,
    path: "/partner/sigs",
    title: "Admin Dashboard",
    permission: [Roles.PARTNER],
  },
];
