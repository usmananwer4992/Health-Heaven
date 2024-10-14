import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import {
  fetchAllUsers,
  fetchAllInternalUsers,
  deletePartnerUser,
  fetchUsers,
  deleteUser
} from "../../../redux/partner/partnerActions";
import Loader from "../../shared/Loader";
import UserHasPermission from "../../../utils/Permissions";
import Toast from "../../Toast";
import ConfirmationDialog from "../../ConfirmationDialog";
import Pagination from "../../Pagination";


const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.partners.users);
  const isLoading = useSelector((state) => state.partners.loading);
  const userAllowedPermissions = useSelector((state) => state.roles.role);
  const [selected, setSelected] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const pageSize = 10;
  const totalCount = useSelector((state) => state.partners.totalUserCount);
  const [searchFilters, setSearchFilters] = React.useState({
    id: "",
    name: "",
    email: "",
    roleId: "2"
  });
  const history = useHistory()
  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });
  React.useEffect(() => {
    document.querySelector("body").classList =
      "light-skin sidebar-mini theme-success fixed";
    dispatch(fetchAllInternalUsers(currentPage,pageSize, searchFilters, sortConfig));
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [dispatch, searchFilters, sortConfig]);

  //   const handleDelete = async (id) => {
  //     try {
  //       await dispatch(deletePartnerUser(id));
  //       dispatch(fetchUsers());
  //     } catch (error) {
  //       console.error("Error deleting partner user:", error);
  //     }
  //   };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id));
      await dispatch(
        fetchAllInternalUsers(currentPage, pageSize, searchFilters, sortConfig)
      );
      Toast({ type: "success", message: "Internal Staff user deleted successfully" });

      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error("Error deleting partner user:", error);
      Toast({ type: "error", message: "Internal Staff user failed to be deleted" });
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await dispatch(
      fetchAllInternalUsers("admin", page, pageSize, searchFilters, sortConfig)
    );
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
    if (!UserHasPermission(userAllowedPermissions.permission, "READ_USERS")) {
      history.push("/");
    }
  }, []);

  return (
    <>
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h4 className="page-title">Internal Users</h4>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">

                      Internal Users
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
                    {UserHasPermission(userAllowedPermissions.permission, "WRITE_USERS") &&
                      <div className="mb-50">
                        <Link
                          to="/app/admin/staffs/register"
                          className="btn btn-primary float-end"
                        >
                          Internal Staff User <Icon.UserPlus />
                        </Link>
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
                              sortConfig.column === "id"
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
                                }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("id")}
                          >
                            User ID
                          </th>
                          {/* <th
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
                          </th> */}
                          <th
                            className={
                              sortConfig.column === "email"
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
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
                      {users && users.length > 0 ? (
                          users &&
                          users.map((partner) => (
                            <tr className="hover-primary" key={partner.email}>
                              <td>{partner.id}</td>
                              {/* <td>{partner?.Partner?.name}</td> */}
                              <td>{partner.email}</td>
                              <td>{partner.createdAt.split("T")[0]}</td>

                              <td className="text-center">
                                <div className="list-icons d-inline-flex">
                                  {UserHasPermission(
                                    userAllowedPermissions.permission,
                                    "UPDATE_PARTNER_USER"
                                  ) && (
                                    <Link
                                      to={`/app/admin/staffs/${partner.id}/edit`}
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
                          {/* <th>
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
                          </th> */}
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
        </section>
      </div>
    </>
  );
};

export default UserList;
