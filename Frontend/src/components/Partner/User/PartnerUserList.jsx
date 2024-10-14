import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import {
  fetchUsers,
  deletePartnerUser,
} from "../../../redux/partner/partnerActions";
import Pagination from "../../Pagination";
import ConfirmationDialog from "../../ConfirmationDialog";
import ToastContainerWrapper from "../../ToastContainerWrapper";
import Loader from "../../shared/Loader";
import UserHasPermission from "../../../utils/Permissions";
import Toast from "../../Toast";

const PartnerUserList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state) => state.partners.users);
  const totalCount = useSelector((state) => state.partners.totalUserCount);
  const userAllowedPermissions = useSelector((state) => state.roles.role);
  const isLoading = useSelector((state) => state.partners.loading);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const pageSize = 10;
  const [searchFilters, setSearchFilters] = React.useState({
    id: "",
    name: "",
    email: "",
  });

  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });

  React.useEffect(() => {
    document.querySelector("body").classList =
      "light-skin sidebar-mini theme-success fixed";
    dispatch(fetchUsers(currentPage, pageSize, searchFilters, sortConfig));
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [dispatch, searchFilters, sortConfig]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchUsers(page, pageSize, searchFilters, sortConfig));
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePartnerUser(id));
      await dispatch(
        fetchUsers(currentPage, pageSize, searchFilters, sortConfig)
      );
      Toast({ type: "success", message: "Partner user deleted successfully" });

      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error("Error deleting partner user:", error);
      Toast({ type: "error", message: "Partner user failed to be deleted" });
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
      !UserHasPermission(userAllowedPermissions.permission, "READ_PARTNER_USER")
    ) {
      history.push("/");
    }
  }, []);
  return (
    <>
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h4 className="page-title">Partner Users</h4>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/admin">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Partner Users
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
                  <div className="table-responsive">
                    {UserHasPermission(
                      userAllowedPermissions.permission,
                      "WRITE_PARTNER_USER"
                    ) && (
                      <div className="mb-50">
                        <Link
                          to="/app/admin/partner/user/register"
                          className="btn btn-primary float-end"
                        >
                          <Icon.UserPlus />
                        </Link>
                      </div>
                    )}
                    <table
                      className="table table-bordered table-striped"
                      id="example5"
                    >
                      <thead>
                        <tr>
                          <th
                            className={
                              sortConfig.column === "id"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("id")}
                          >
                            User ID
                          </th>
                          <th
                            className={
                              sortConfig.column === "name"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("name")}
                          >
                            Partner
                          </th>
                          <th
                            className={
                              sortConfig.column === "email"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("email")}
                          >
                            User Email
                          </th>
                          <th
                            className={
                              sortConfig.column === "createdAt"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
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
                        {users && users.length > 0 ? (
                          users &&
                          users.map((partner) => (
                            <tr className="hover-primary" key={partner.email}>
                              <td>{partner.id}</td>
                              <td>{partner?.Partner?.name}</td>
                              <td>{partner.email}</td>
                              <td>{partner.createdAt.split("T")[0]}</td>

                              <td className="text-center">
                                <div className="list-icons d-inline-flex">
                                  {UserHasPermission(
                                    userAllowedPermissions.permission,
                                    "UPDATE_PARTNER_USER"
                                  ) && (
                                    <Link
                                      to={`/app/admin/partner/user/${partner.id}/edit`}
                                      className="list-icons-item me-10 mtc"
                                    >
                                      <i className="fa fa-edit"></i>
                                    </Link>
                                  )}

                                  {UserHasPermission(
                                    userAllowedPermissions.permission,
                                    "DELETE_PARTNER_USER"
                                  ) && (
                                    <ConfirmationDialog
                                      title="Deactivate Partner User"
                                      text="Are you sure you want to deactivate this partner user?"
                                      itemId={partner.id}
                                      onConfirm={handleDelete}
                                      confirmText="Yes, deactivate it!"
                                    >
                                      <i className="fa fa-remove"></i>
                                    </ConfirmationDialog>
                                  )}
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
                              placeholder="Search User ID"
                              value={searchFilters.id}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  id: e.target.value,
                                })
                              }
                            />
                          </th>
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
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search User Email"
                              value={searchFilters.email}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  email: e.target.value,
                                })
                              }
                            />
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainerWrapper />
        </section>
      </div>
    </>
  );
};

export default PartnerUserList;
