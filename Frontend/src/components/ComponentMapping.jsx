import AdminDashboard from "../Dashboard/AdminDashboard";
//import Dashboard from "../Dashboard/Dashboard";
import PartnerDashboard from "../Dashboard/PartnerDashboard";
import { Login } from "./Login"; // Replace with the actual Login component
import Partner from "./Partner/Partner";
import PartnerList from "./Partner/PartnerList";
import PartnerUser from "./Partner/PartnerUser";
import PartnerUserList from "./Partner/User/PartnerUserList";
import UsersList from "./Partner/User/UserList";
import AccessTypes from "./ACL/AccessType";
import AccessTypeEdit from "./ACL/AccessTypeEdit";
import CustomerList from "./Customer/CustomerList";
import Customer from "./Customer/Customer";
import PartnersCustomer from "./PartnerPortal/PartnersCustomer/PartnersCustomer";
import PartnersCustomerList from "./PartnerPortal/PartnersCustomer/PartnerCusromersList";
import List from "./DrugCategory/List";
import DrugClassList from "./DrugClass/DrugClassList";
import DrugFormList from "./DrugForm/DrugFormList";
import DrugTypeList from "./DrugType/DrugTypeList";
import AgeGroupList from "./AgeGroup/AgeGroupList";
const componentMapping = {
  '/admin': AdminDashboard,
  '/admin/partner/:id/edit': Partner,
  '/admin/partner/list': PartnerList,
  '/admin/partner/add': Partner,
  '/admin/partner/addUser': PartnerUser,
  '/admin/partner/users': PartnerUserList,
  '/admin/users': UsersList,
  '/admin/access/types': AccessTypes,
  '/admin/access/types/edit': AccessTypeEdit,
  '/admin/customer/list': CustomerList,
  '/admin/customer/add': Customer,
  '/': PartnerDashboard,
  '/customer/list': PartnersCustomerList,
  '/customer/add': PartnersCustomer,
  "/admin/drug-category/list": List,
  "/admin/drug-class/list": DrugClassList,
  "/admin/drug-form/list": DrugFormList,
  "/admin/drug-type/list": DrugTypeList,
  "/admin/agegroup/list": AgeGroupList,
  '/login': Login,

};

export default componentMapping;
