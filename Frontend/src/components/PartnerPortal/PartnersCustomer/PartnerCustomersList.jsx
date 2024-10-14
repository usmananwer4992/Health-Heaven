import React, { useEffect } from "react";
import Pagination from "../../Pagination";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import ToastContainerWrapper from "../../ToastContainerWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerAction,
} from "../../../redux/customer.slice";
import UserHasPermission from "../../../utils/Permissions";
import { useHistory } from 'react-router-dom';

const PartnersCustomerList = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customers);
  const navigationRef = React.useRef(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const userAllowedPermissions = useSelector((state) => state.roles.role)
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
    document.addEventListener("click", handleOutsideClick);
    document.querySelector("body").classList =
      "light-skin sidebar-mini theme-success fixed";
    dispatch(
      getCustomerAction("partner", currentPage, pageSize, searchFilters, sortConfig)
    );
    setTotalPages(
      Math.ceil(localStorage.getItem("partnersTotalCount") / pageSize)
    );
    return () => { };
  }, [dispatch, searchFilters, sortConfig]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(getCustomerAction("partner", page, pageSize, searchFilters, sortConfig));
  };
  const [activeLink, setActiveLink] = React.useState(null);

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
  };

  const handleOutsideClick = (event) => {
    if (
      navigationRef.current &&
      !navigationRef.current.contains(event.target)
    ) {
      setActiveLink(null);
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
    if (!UserHasPermission(userAllowedPermissions.permission, 'READ_CUSTOMERS')) {
      history.push('/');
    }
  }, [])

  return (
    <>
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h4 className="page-title">Customers</h4>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="customers">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Customers
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12">
              
              <div className="box">
                <div className="box-body">
                {UserHasPermission(userAllowedPermissions.permission, 'WRITE_CUSTOMERS') &&
                <div className="mb-50">
                  {/* <button className="btn btn-primary">Add Partner</button> */}
                  <Link to="/app/partner/customer/add" className="btn btn-primary float-end">
                    <Icon.UserPlus />
                  </Link>
                </div>
              }
                  <div className="table-responsive rounded card-table">
                    <table
                      className="table table-bordered table-striped"
                      id="example5"
                    >
                      <thead>
                        <tr>
                        <th
                            className={
                              sortConfig.column === "id"
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
                                }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("id")}
                          >
                            ID
                          </th>
                          <th
                            className={
                              sortConfig.column === "firstName"
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
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
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
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
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
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
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
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
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
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
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
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
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
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
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
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
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
                                }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("gender")}
                          >
                            Gender
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {customer?.length > 0 &&
                          customer?.map((x) => (
                            <tr key={x.id}>
                              <td>{x.id}</td>
                              <td>{x.firstName}</td>
                              <td>{x.lastName}</td>
                              <td>{x.email}</td>
                              <td>{x.phone}</td>
                              <td>{x.address}</td>
                              <td>{x.city}</td>
                              <td>{x.zipCode}</td>
                              <td>{x.dob}</td>
                              <td>{x.gender}</td>
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
                    <ToastContainerWrapper />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default PartnersCustomerList;
