import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import {
  fetchStatuses,
  fetchTransfers,
} from "../../../redux/transfer/transferActions";
import Pagination from "../../Pagination";
import ToastContainerWrapper from "../../ToastContainerWrapper";
import Loader from "../../shared/Loader";
import { fetchRoleById } from "../../../redux/rolesSlice";
import UserHasPermission from "../../../utils/Permissions";
import { useHistory } from 'react-router-dom';
import TransferIcon from "../../../assets/transfer_icon.svg";


const PartnerTransferList = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const transferState = useSelector((state) => state.transfers);
  const { modulePermissions } = useSelector((state) => state.roles);
  const { user } = useSelector((state) => state.user);
  const transfers = transferState.transfers;
  const statuses = transferState.statuses;
  const totalCount = transferState?.transfers?.totalCount;
  const isLoading = transferState.loading;
  const userAllowedPermissions = useSelector((state) => state.roles.role)

  // Define a function to handle status selection
  const handleStatusChange = (e) => {
    setSearchFilters({
      ...searchFilters,
      status: e.target.value,
    });
  };
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const pageSize = 10;

  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });

  const [searchFilters, setSearchFilters] = React.useState({
    id: "",
    partnerId: user?.partnerId,
    transferType: "",
    drugName: "",
    pharmacyName: "",
    pharmacyPhone: "",
    patientFirstName: "",
    patientLastName: "",
    dob: "",
    status: "",
  });

  React.useEffect(() => {
    dispatch(fetchRoleById(user.roleId, "partner"));
    dispatch(fetchStatuses());
    document.querySelector("body").classList =
      "light-skin sidebar-mini theme-success fixed";
    dispatch(fetchTransfers(currentPage, pageSize, searchFilters, sortConfig));
    setTotalPages(Math.ceil(totalCount / pageSize));
    console.log("here", pageSize, totalCount, transferState)
    return () => { };
  }, [dispatch, user, searchFilters, sortConfig]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [transferState])
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchTransfers(page, pageSize, searchFilters, sortConfig));
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await dispatch(deleteTransfer(id, transfers));
  //     await dispatch(
  //       fetchTransfers(currentPage, pageSize, searchFilters, sortConfig)
  //     );
  //     setTotalPages(Math.ceil(totalCount / pageSize));
  //     Toast({ type: "success", message: "Transfer deleted successfully" });
  //   } catch (error) {
  //     console.error("Error deleting transfer:", error);
  //     Toast({ type: "error", message: "Transfer failed to be deleted" });
  //   }
  // };

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
    if (!UserHasPermission(userAllowedPermissions.permission, 'READ_TRANSFERS')) {
      history.push('/');
    }
  }, [])

  useEffect(() => {
    console.log(transferState, "state")
  }, [transferState])
  

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      {modulePermissions?.transfers?.read ? (
        <div className="container-full">
          <div className="content-header">
            <div className="d-flex align-items-center">
              <div className="me-auto">
                <h4 className="page-title">Transfers</h4>
                <div className="d-inline-block align-items-center">
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/admin">
                          <i className="mdi mdi-home-outline"></i>
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Transfers
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
                  {modulePermissions?.transfers?.write && (
                  <div className="mb-50">
                    {UserHasPermission(userAllowedPermissions.permission, 'WRITE_TRANSFERS') &&
                      <Link
                        to="/app/partner/transfer/register"
                        className="btn btn-primary float-end"
                      >
                        <div style={{ display: "flex" }}>
                          <img src={TransferIcon} alt="" style={{ width: '25px' }} />
                          {/* <Icon.Plus /> */}
                        </div>
                        {/* <Icon.UserPlus /> */}
                      </Link>
                    }
                  </div>
                )}
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
                                  ? `sorting_${sortConfig.order === "asc"
                                    ? "asc"
                                    : "desc"
                                  }`
                                  : "sorting"
                              }
                              onClick={() => handleSortChange("id")}
                            >
                              ID
                            </th>
                            <th
                            // className={
                            //   sortConfig.column === "transferType"
                            //     ? `sorting_${
                            //         sortConfig.order === "asc" ? "asc" : "desc"
                            //       }`
                            //     : "sorting"
                            // }
                            // onClick={() => handleSortChange("transferType")}
                            >
                              TRANSFER TYPE
                            </th>
                            <th
                              className={
                                sortConfig.column === "drugName"
                                  ? `sorting_${sortConfig.order === "asc"
                                    ? "asc"
                                    : "desc"
                                  }`
                                  : "sorting"
                              }
                              onClick={() => handleSortChange("drugName")}
                            >
                              DRUG NAME
                            </th>
                            <th
                              className={
                                sortConfig.column === "pharmacyName"
                                  ? `sorting_${sortConfig.order === "asc"
                                    ? "asc"
                                    : "desc"
                                  }`
                                  : "sorting"
                              }
                              onClick={() => handleSortChange("pharmacyName")}
                            >
                              PHARMACY NAME
                            </th>
                            <th
                              className={
                                sortConfig.column === "pharmacyPhone"
                                  ? `sorting_${sortConfig.order === "asc"
                                    ? "asc"
                                    : "desc"
                                  }`
                                  : "sorting"
                              }
                              onClick={() => handleSortChange("pharmacyPhone")}
                            >
                              PHARMACY PHONE
                            </th>
                            <th
                              className={
                                sortConfig.column === "patientFirstName"
                                  ? `sorting_${sortConfig.order === "asc"
                                    ? "asc"
                                    : "desc"
                                  }`
                                  : "sorting"
                              }
                              onClick={() =>
                                handleSortChange("patientFirstName")
                              }
                            >
                              PATIENT FIRST NAME
                            </th>
                            <th
                              className={
                                sortConfig.column === "patientLastName"
                                  ? `sorting_$$
                                      {
                                        sortConfig.order === "asc"
                                          ? "asc"
                                          : "desc"
                                      }`
                                  : "sorting"
                              }
                              onClick={() =>
                                handleSortChange("patientLastName")
                              }
                            >
                              PATIENT LAST NAME
                            </th>
                            <th
                              className={
                                sortConfig.column === "dob"
                                  ? `sorting_${sortConfig.order === "asc"
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
                                sortConfig.column === "status"
                                  ? `sorting_$$
                                      {
                                        sortConfig.order === "asc"
                                          ? "asc"
                                          : "desc"
                                      }`
                                  : "sorting"
                              }
                              onClick={() => handleSortChange("status")}
                            >
                              STATUS
                            </th>
                            <th>ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transfers &&
                            transfers?.transfers?.map((transfer, i) => (
                              <tr className="hover-primary" key={i}>
                                <td>{transfer.id}</td>
                                <td>{transfer.transferType || "Live"}</td>
                                <td>{transfer.Drug?.name}</td>
                                <td>{transfer.Pharmacy?.name}</td>
                                <td>{transfer.Pharmacy?.phone}</td>
                                <td>{transfer.Customer?.firstName}</td>
                                <td>{transfer.Customer?.lastName}</td>
                                <td>{transfer.Customer?.dob}</td>
                                <td>{transfer.TransferStatus?.name}</td>
                                <td className="text-center">
                                  <div className="list-icons d-inline-flex">
                                    <Link
                                      to={`/app/partner/transfer/${transfer.id}`}
                                      className="list-icons-item me-10 mtc"
                                    >
                                      <i className="fa fa-eye"></i>
                                    </Link>
                                    {UserHasPermission(userAllowedPermissions.permission, 'UPDATE_TRANSFERS') &&
                                      <>
                                        {modulePermissions?.transfers?.write && (
                                          <Link
                                            to={`/app/partner/transfer/${transfer.id}/edit`}
                                            className="list-icons-item me-10 mtc"
                                          >
                                            <i className="fa fa-edit"></i>
                                          </Link>
                                        )}
                                      </>
                                    }
                                    {/* <ConfirmationDialog
                                      title="Delete Transfer"
                                      text="Are you sure you want to delete this transfer?"
                                      itemId={transfer.id}
                                      onConfirm={() => handleDelete(transfer.id)}
                                    >
                                      <i className="fa fa-remove"></i>
                                    </ConfirmationDialog> */}
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search Transfer ID"
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
                                readOnly
                                className="form-control"
                                placeholder="Search Transfer Type"
                                value={searchFilters.transferType}
                                onChange={(e) =>
                                  setSearchFilters({
                                    ...searchFilters,
                                    transferType: e.target.value,
                                  })
                                }
                              />
                            </th>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search Drug Name"
                                value={searchFilters.drugName}
                                onChange={(e) =>
                                  setSearchFilters({
                                    ...searchFilters,
                                    drugName: e.target.value,
                                  })
                                }
                              />
                            </th>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search Pharmacy Name"
                                value={searchFilters.pharmacyName}
                                onChange={(e) =>
                                  setSearchFilters({
                                    ...searchFilters,
                                    pharmacyName: e.target.value,
                                  })
                                }
                              />
                            </th>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search Pharmacy Phone"
                                value={searchFilters.pharmacyPhone}
                                onChange={(e) =>
                                  setSearchFilters({
                                    ...searchFilters,
                                    pharmacyPhone: e.target.value,
                                  })
                                }
                              />
                            </th>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search Patient First Name"
                                value={searchFilters.patientFirstName}
                                onChange={(e) =>
                                  setSearchFilters({
                                    ...searchFilters,
                                    patientFirstName: e.target.value,
                                  })
                                }
                              />
                            </th>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search Patient Last Name"
                                value={searchFilters.patientLastName}
                                onChange={(e) =>
                                  setSearchFilters({
                                    ...searchFilters,
                                    patientLastName: e.target.value,
                                  })
                                }
                              />
                            </th>
                            <th>
                              <input
                                type="date"
                                className="form-control"
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
                                className="form-control"
                                value={searchFilters.status}
                                onChange={handleStatusChange}
                              >
                                <option value="">Select Status</option>
                                {statuses?.map((status) => (
                                  <option key={status.id} value={status.name}>
                                    {status.name}
                                  </option>
                                ))}
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
                      <ToastContainerWrapper />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Permission Denied</h5>
                  <p className="card-text">
                    You do not have permission to access this page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PartnerTransferList;
