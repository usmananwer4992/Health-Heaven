import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import {
  deletePartner,
  fetchPartners,
  fetchStates
} from "../../redux/partner/partnerActions";
import Pagination from "../Pagination";
import ConfirmationDialog from "../ConfirmationDialog";
import Toast from "../Toast";
import ToastContainerWrapper from "../ToastContainerWrapper";
import Loader from "../shared/Loader";
import UserHasPermission from "../../utils/Permissions";
const PartnerList = () => {
  const dispatch = useDispatch();
  const partners = useSelector((state) => state.partners.partners);
  const totalCount = useSelector((state) => state.partners.totalCount);
  const isLoading = useSelector((state) => state.partners.loading);
  const states = useSelector((state) => state.partners.states);
  const userAllowedPermissions = useSelector((state) => state.roles.role);
  const navigationRef = React.useRef(null);
  const [currentPage, setCurrentPage] = React.useState(1); 
  const [totalPages, setTotalPages] = React.useState(0);
  const pageSize = 10;
  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });

  // const [queryPartnerName, setQueryPartnerName] = React.useState("");
  // const [selectedState, setSelectedState] = React.useState("");
  // const [selectedBrandBox, setSelectedBrandBox] = React.useState("");
  const [searchFilters, setSearchFilters] = React.useState({
    name: "",
    state: "",
    brandBox: "",
  });
  const history = useHistory()

  console.log("states", states);
  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    document.querySelector("body").classList =
      "light-skin sidebar-mini theme-success fixed";
    dispatch(
      fetchPartners("admin", currentPage, pageSize, searchFilters, sortConfig)
    );
    dispatch(fetchStates());
    setTotalPages(Math.ceil(totalCount / pageSize));
    return () => { };
  }, [dispatch, searchFilters, sortConfig]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchPartners("admin", page, pageSize, searchFilters, sortConfig));
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
  const handleDelete = async (id) => {
    try {
      await dispatch(deletePartner(id, partners));
      await dispatch(
        fetchPartners("admin", currentPage, pageSize, searchFilters, sortConfig)
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
      Toast({ type: "success", message: "Partner deleted successfully" });
    } catch (error) {
      console.error("Error deleting partner:", error);
      Toast({ type: "error", message: "Partner failed to be deleted" });
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
    if (!UserHasPermission(userAllowedPermissions.permission, "READ_PARTNERS")) {
      history.push("/");
    }
  }, []);

  return (
    <>
      {/* {isLoading && <Loader isLoading={isLoading} />} */}
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h4 className="page-title">Partners</h4>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Partners
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
                  <div className="table-responsive rounded card-table">
                    {UserHasPermission(userAllowedPermissions.permission, "WRITE_PARTNERS") &&
                      <div className="mb-50">
                        {/* <button className="btn btn-primary">Add Partner</button> */}
                        <Link
                          to="/app/admin/partner/register"
                          className="btn btn-primary float-end"
                        >
                          <Icon.UserPlus />
                        </Link>
                        {/* <Link
                          to="/admin/partner/addUser"
                          className="btn btn-primary"
                        >
                          Add Partner User
                        </Link> */}
                      </div>
                    }
                    <table
                      className="table table-bordered table-striped"
                      id="example5"
                    >
                      <thead>
                        <tr>
                          <th
                            className={
                              sortConfig.column === "name"
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
                                }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("name")}
                          >
                            Name
                          </th>
                          <th
                            className={
                              sortConfig.column === "stateName"
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
                                }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("stateName")}
                          >
                            State
                          </th>
                          <th
                            className={
                              sortConfig.column === "brandBox"
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
                                }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("brandBox")}
                          >
                            Brand Box
                          </th>
                          <th
                            className={
                              sortConfig.column === "userCount"
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
                                }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("userCount")}
                          >
                            Users Count
                          </th>
                          <th>Orders Count</th>
                          <th
                            className={
                              sortConfig.column === "createdAt"
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
                                }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("createdAt")}
                          >
                            Created At
                          </th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {partners && partners.length > 0 ? (
                          partners.map((partner, i) => (
                            <tr className="hover-primary" key={i}>
                              <td>{partner.name}</td>
                              <td>{partner.State.name}</td>
                              <td>{partner.brandBox === "1" ? "Yes" : "No"}</td>
                              <td>{partner.userCount}</td>
                              <td>0</td>
                              <td>{partner.createdAt.split("T")[0]}</td>
                              <td className="text-center">
                                <div className="list-icons d-inline-flex">
                                  {UserHasPermission(userAllowedPermissions.permission, "UPDATE_PARTNERS") &&
                                    <Link
                                      to={`/app/admin/partner/${partner.id}/edit`}
                                      className="list-icons-item me-10 mtc"
                                    >
                                      <i className="fa fa-edit"></i>
                                    </Link>
                                  }
                                  {UserHasPermission(userAllowedPermissions.permission, "DELETE_PARTNERS") &&
                                    <ConfirmationDialog
                                      title="Deactivate Partner"
                                      text="Are you sure you want to deactivate this partner?"
                                      itemId={partner.id}
                                      onConfirm={handleDelete}
                                      confirmText="Yes, deactivate it!"
                                    >
                                      <i className="fa fa-remove"></i>
                                    </ConfirmationDialog>
                                  }
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No records found
                            </td>
                          </tr>
                        )}
                      </tbody>

                      <tfoot>
                        <tr>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Partner Name"
                              value={searchFilters.name}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  name: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.state}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  state: e.target.value,
                                })
                              }
                            >
                              <option value="">Select State</option>
                              {states.map((state) => (
                                <option key={state.id} value={state.id}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.brandBox}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  brandBox: e.target.value,
                                })
                              }
                            >
                              <option value="" disabled>
                                Select brand box
                              </option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                              <option value="all">All</option>
                            </select>
                          </th>
                          <th></th> {/* Empty cell for spacing */}
                          <th></th> {/* Empty cell for spacing */}
                          <th></th> {/* Empty cell for spacing */}
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

export default PartnerList;
