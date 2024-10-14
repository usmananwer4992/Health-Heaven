import React, { useEffect } from "react";
import Pagination from "../Pagination";
import * as Icon from "react-feather";
import { Link, useHistory } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog";
import ToastContainerWrapper from "../ToastContainerWrapper";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../Toast";
import {
  getCustomerAction,
  deleteCustomerAction,
} from "../../redux/customer.slice";
import Loader from "../shared/Loader";
import { fetchRoleById } from "../../redux/rolesSlice";
import UserHasPermission from "../../utils/Permissions";

const CustomerList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, customers, totalCount, isLoading, modulePermissions } =
    useSelector((state) => ({
      user: state.user?.user,
      customers: state.customer.customers,
      totalCount: state.customer.totalCount,
      isLoading: state.customer.loading,
      modulePermissions: state.roles?.modulePermissions,
    }));

    console.log("customers", customers);
  const navigationRef = React.useRef(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const userAllowedPermissions = useSelector((state) => state.roles.role);
  const pageSize = 10;
  const [searchFilters, setSearchFilters] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    zip: "",
    dob: "",
    gender: "",
  });
  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchRoleById(user.roleId));
      document.querySelector("body").classList =
        "light-skin sidebar-mini theme-success fixed";
      await dispatch(
        getCustomerAction(
          "admin",
          currentPage,
          pageSize,
          searchFilters,
          sortConfig
        )
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
    };

    fetchData();

    return () => {};
  }, [
    dispatch,
    searchFilters,
    sortConfig,
    user.roleId,
    currentPage,
    pageSize,
    totalCount,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(
      getCustomerAction(
        "admin",
        currentPage,
        pageSize,
        searchFilters,
        sortConfig
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCustomerAction(id));
      await dispatch(
        getCustomerAction(
          "admin",
          currentPage,
          pageSize,
          searchFilters,
          sortConfig
        )
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
      Toast({ type: "success", message: "Customer deleted successfully" });
    } catch (error) {
      console.error("Error deleting customer:", error);
      Toast({ type: "error", message: "Customer failed to be deleted" });
    }
  };

  const handleSortChange = (columnName) => {
    if (sortConfig.column === columnName) {
      // Toggle the sorting order if the same column is clicked again
      setSortConfig({
        ...sortConfig,
        order: sortConfig.order === "asc" ? "desc" : "asc",
      });
    } else {
      // If a new column is clicked, set it as the sorting column and reset the order to 'asc'
      setSortConfig({ column: columnName, order: "asc" });
    }
  };

  useEffect(() => {
    if (
      !UserHasPermission(userAllowedPermissions.permission, "READ_CUSTOMERS")
    ) {
      history.push("/");
    }
  }, []);
  return (
    <div className="wrapper" ref={navigationRef}>
      {/*<Header Icon={Icon} />*/}

      {/*<Aside Icon={Icon} />*/}

      <div className="content-wrapper2">
        <div className="container-full">
          <div className="content-header">
            <div className="d-flex align-items-center">
              <div className="me-auto">
                <h4 className="page-title">Customers</h4>
                <div className="d-inline-block align-items-center">
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/app/admin/dashboard">
                          <i className="mdi mdi-home-outline"></i>
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Customers
                      </li>
                    </ol>
                  </nav>
                  
                </div>
              </div>
            </div>
          </div>

          {isLoading && <Loader isLoading={isLoading} />}
          <section className="content">
            <div className="row">
              <div className="col-12">
              

                <div className="box">
                  <div className="box-body">
                  {modulePermissions?.customers?.write && (
                  <>
                    {UserHasPermission(
                      userAllowedPermissions.permission,
                      "WRITE_CUSTOMERS"
                    ) && (
                      <div className="mb-50">
                        <Link
                          to="/app/admin/customers/add"
                          className="btn btn-primary float-end"
                        >
                          <Icon.UserPlus />
                        </Link>
                      </div>
                    )}
                  </>
                )}
                    <div className="table-responsive rounded card-table">
                      {modulePermissions?.customers?.read && (
                        <>
                          <table
                            className="table table-bordered table-striped"
                            id="example5"
                          >
                            <thead>
                              <tr>
                              <th
                                  // className={
                                  //   sortConfig.column === "partnerId"
                                  //     ? `sorting_${
                                  //         sortConfig.order === "asc"
                                  //           ? "asc"
                                  //           : "desc"
                                  //       }`
                                  //     : "sorting"
                                  // }
                                  // onClick={() => handleSortChange("partnerId")}
                                >
                                  Partner Name
                                </th>
                                <th
                                  className={
                                    sortConfig.column === "firstName"
                                      ? `sorting_${
                                          sortConfig.order === "asc"
                                            ? "asc"
                                            : "desc"
                                        }`
                                      : "sorting"
                                  }
                                  onClick={() => handleSortChange("firstName")}
                                >
                                  First Name
                                </th>
                                <th
                                  className={
                                    sortConfig.column === "lastName"
                                      ? `sorting_${
                                          sortConfig.order === "asc"
                                            ? "asc"
                                            : "desc"
                                        }`
                                      : "sorting"
                                  }
                                  onClick={() => handleSortChange("lastName")}
                                >
                                  Last Name
                                </th>
                                <th
                                  className={
                                    sortConfig.column === "email"
                                      ? `sorting_${
                                          sortConfig.order === "asc"
                                            ? "asc"
                                            : "desc"
                                        }`
                                      : "sorting"
                                  }
                                  onClick={() => handleSortChange("email")}
                                >
                                  Email
                                </th>
                                <th
                                  className={
                                    sortConfig.column === "phone"
                                      ? `sorting_${
                                          sortConfig.order === "asc"
                                            ? "asc"
                                            : "desc"
                                        }`
                                      : "sorting"
                                  }
                                  onClick={() => handleSortChange("phone")}
                                >
                                  Phone
                                </th>
                                <th
                                  className={
                                    sortConfig.column === "address"
                                      ? `sorting_${
                                          sortConfig.order === "asc"
                                            ? "asc"
                                            : "desc"
                                        }`
                                      : "sorting"
                                  }
                                  onClick={() => handleSortChange("address")}
                                >
                                  Address
                                </th>
                                <th
                                  className={
                                    sortConfig.column === "city"
                                      ? `sorting_${
                                          sortConfig.order === "asc"
                                            ? "asc"
                                            : "desc"
                                        }`
                                      : "sorting"
                                  }
                                  onClick={() => handleSortChange("city")}
                                >
                                  City
                                </th>
                                <th
                                  className={
                                    sortConfig.column === "zipCode"
                                      ? `sorting_${
                                          sortConfig.order === "asc"
                                            ? "asc"
                                            : "desc"
                                        }`
                                      : "sorting"
                                  }
                                  onClick={() => handleSortChange("zipCode")}
                                >
                                  Zipcode
                                </th>
                                <th
                                  className={
                                    sortConfig.column === "dob"
                                      ? `sorting_${
                                          sortConfig.order === "asc"
                                            ? "asc"
                                            : "desc"
                                        }`
                                      : "sorting"
                                  }
                                  onClick={() => handleSortChange("dob")}
                                >
                                  DOB
                                </th>
                                <th
                                  className={
                                    sortConfig.column === "gender"
                                      ? `sorting_${
                                          sortConfig.order === "asc"
                                            ? "asc"
                                            : "desc"
                                        }`
                                      : "sorting"
                                  }
                                  onClick={() => handleSortChange("gender")}
                                >
                                  Gender
                                </th>
                                <th className="text-center">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {customers && customers.length > 0 &&
                                customers?.map((x) => (
                                  <tr key={x.id}>
                                    <td>{x.Partner?.name}</td>
                                    <td>{x.firstName}</td>
                                    <td>{x.lastName}</td>
                                    <td>{x.email}</td>
                                    <td>{x.phone}</td>
                                    <td>{x.address}</td>
                                    <td>{x.city}</td>
                                    <td>{x.zipCode}</td>
                                    <td>{x.dob}</td>
                                    <td>{x.gender}</td>
                                    <td>
                                      <div className="list-icons d-inline-flex">
                                        {UserHasPermission(
                                          userAllowedPermissions.permission,
                                          "UPDATE_CUSTOMERS"
                                        ) && (
                                          <Link
                                            to={`/app/admin/customers/${x?.id}/edit`}
                                            className="list-icons-item me-10 mtc"
                                          >
                                            <i className="fa fa-edit"></i>
                                          </Link>
                                        )}
                                        {UserHasPermission(
                                          userAllowedPermissions.permission,
                                          "DELETE_CUSTOMERS"
                                        ) && (
                                          <ConfirmationDialog
                                            title="Delete Customer"
                                            text="Are you sure you want to delete this Customer?"
                                            itemId={x?.id}
                                            onConfirm={handleDelete}
                                          >
                                            <i className="fa fa-remove"></i>
                                          </ConfirmationDialog>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <th>
                                  
                                </th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Firstname"
                                    value={searchFilters.firstName}
                                    onChange={(e) =>
                                      setSearchFilters({
                                        ...searchFilters,
                                        firstName: e.target.value,
                                      })
                                    }
                                  />
                                </th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Lastname"
                                    value={searchFilters.lastName}
                                    onChange={(e) =>
                                      setSearchFilters({
                                        ...searchFilters,
                                        lastName: e.target.value,
                                      })
                                    }
                                  />
                                </th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Email"
                                    value={searchFilters.email}
                                    onChange={(e) =>
                                      setSearchFilters({
                                        ...searchFilters,
                                        email: e.target.value,
                                      })
                                    }
                                  />
                                </th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Phone"
                                    value={searchFilters.phone}
                                    onChange={(e) =>
                                      setSearchFilters({
                                        ...searchFilters,
                                        phone: e.target.value,
                                      })
                                    }
                                  />
                                </th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Address"
                                    value={searchFilters.address}
                                    onChange={(e) =>
                                      setSearchFilters({
                                        ...searchFilters,
                                        address: e.target.value,
                                      })
                                    }
                                  />
                                </th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search City"
                                    value={searchFilters.city}
                                    onChange={(e) =>
                                      setSearchFilters({
                                        ...searchFilters,
                                        city: e.target.value,
                                      })
                                    }
                                  />
                                </th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Zipcode"
                                    value={searchFilters.zipCode}
                                    onChange={(e) =>
                                      setSearchFilters({
                                        ...searchFilters,
                                        zipCode: e.target.value,
                                      })
                                    }
                                  />
                                </th>
                                <th>
                                  <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Search DOB"
                                    value={searchFilters.dob}
                                    onChange={(e) =>
                                      setSearchFilters({
                                        ...searchFilters,
                                        dob: e.target.value,
                                      })
                                    }
                                  />
                                </th>
                                <th>
                                  <select
                                    className="form-select"
                                    value={searchFilters.gender}
                                    onChange={(e) =>
                                      setSearchFilters({
                                        ...searchFilters,
                                        gender: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                  </select>
                                </th>
                                <th></th> {/* Empty cell for spacing */}
                              </tr>
                            </tfoot>
                          </table>
                          <div>
                            <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              onPageChange={handlePageChange}
                            />
                          </div>
                        </>
                      )}
                      <ToastContainerWrapper />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/*    footer    */}
      {/*<Footer />*/}
      {/*    control_sidebar*/}
      {/*<ControlSidebar />*/}
    </div>
  );
};
export default CustomerList;
