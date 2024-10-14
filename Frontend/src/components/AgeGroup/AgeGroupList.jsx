import React, { useEffect } from "react";
import AgeGroupModal from "./AgeGroupModal";
import { Link, useLocation, useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import ConfirmationDialog from "../ConfirmationDialog";
import Loader from "../shared/Loader";
import Pagination from "../Pagination";
import ToastContainerWrapper from "../ToastContainerWrapper";
import {
  createAgeGroup,
  deleteAgeGroup,
  fetchAgeGroups,
  updateAgeGroup,
} from "../../redux/ageGroup/actions/ageGroupAction";
import Toast from "../Toast";
import { useDispatch, useSelector } from "react-redux";
import UserHasPermission from "../../utils/Permissions";
const AgeGroupList = () => {
  const location = useLocation();
  const history = useHistory()
  let portal = "admin";
  if (location.pathname.split("/").includes("partner")) {
    portal = "partner";
  }
  const dispatch = useDispatch();
  const ageGroups = useSelector((state) => state.ageGroup.ageGroups);
  const isLoading = useSelector((state) => state.ageGroup.loading);
  const userAllowedPermissions = useSelector((state) => state.roles.role);
  // const totalCount = useSelector((state) => state.ageGroup.totalCount);
  const totalCount = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const pageSize = 10;
  const [query, setQuery] = React.useState("");
  const [sortColumn, setSortColumn] = React.useState(""); // Default sorting column
  const [sortOrder, setSortOrder] = React.useState("asc"); // Default sorting order
  const [showModal, setShowModal] = React.useState(false);
  const [ageGroup, setAgeGroup] = React.useState("");
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const openModal = () => {
    setShowModal(true);
    setIsEditMode(false);
    setSelectedItem();
    setAgeGroup();
  };
  const openModalWithData = (ageGroup) => {
    setSelectedItem(ageGroup);
    setAgeGroup(ageGroup?.name);
    setShowModal(true);
    setIsEditMode(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage("");
    const modalElement = document.querySelector(".modal-backdrop");
    if (modalElement !== null) {
      modalElement.remove();
    }
  };

  const handleSaveAgeGroup = async () => {
    setErrorMessage("");
    try {
      let successMessage = isEditMode
        ? "Age Group updated successfully"
        : "Age Group created successfully";

      let requestData = { name: ageGroup };

      if (isEditMode) {
        await dispatch(updateAgeGroup(selectedItem?.id, requestData));
      } else {
        await dispatch(createAgeGroup(requestData));
      }

      closeModal();

      // Fetch and update the listing data as needed
      await dispatch(
        fetchAgeGroups(
          portal,
          currentPage,
          pageSize,
          query,
          sortColumn,
          sortOrder
        )
      );
      setTotalPages(Math.ceil(totalCount / pageSize));

      // Move the Toast function call here, inside the success block
      Toast({ type: "success", message: successMessage });

      if (ageGroups && ageGroups.length === 1 && hasInitialData) {
        setHasInitialData(false);
      }
    } catch (error) {
      if (error !== "User canceled") {
        setErrorMessage(error || "An error occurred");
      } else {
        setErrorMessage("");
        // Reset error message to empty if "User canceled"
      }
    }
  };

  React.useEffect(() => {
    const modalElement = document.querySelector(".modal-backdrop");

    if (!showModal && modalElement !== null) {
      //document.querySelector(".modal-backdrop").classList.remove("show");
      modalElement.remove();
    }
    document.querySelector("body").classList =
      "light-skin sidebar-mini theme-success fixed";
    dispatch(
      fetchAgeGroups(
        portal,
        currentPage,
        pageSize,
        query,
        sortColumn,
        sortOrder
      )
    );
    setTotalPages(Math.ceil(totalCount / pageSize));
    return () => { };
  }, [dispatch, currentPage, pageSize, query, sortColumn, sortOrder]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(
      fetchAgeGroups(portal, page, pageSize, query, sortColumn, sortOrder)
    );
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAgeGroup(id));
      const _ageGroups = await dispatch(
        fetchAgeGroups(
          portal,
          currentPage,
          pageSize,
          query,
          sortColumn,
          sortOrder
        )
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
      Toast({ type: "success", message: "Age Group deleted successfully" });

      // Check if _ageGroups is empty after deletion
      if (!_ageGroups || _ageGroups.length === 0) {
        setHasInitialData(false);
      }
    } catch (error) {
      console.error("Error deleting Age Group:", error);
      Toast({ type: "error", message: "Age Group failed to be deleted" });
    }
  };

  const handleSortChange = (columnName) => {
    if (columnName === sortColumn) {
      // Toggle the sorting order if the same column is clicked again
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new column is clicked, set it as the sorting column and reset the order to 'asc'
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };

  const [hasInitialData, setHasInitialData] = React.useState(false);
  // Use useEffect to update hasInitialData when ageGroups changes
  React.useEffect(() => {
    if (!hasInitialData) {
      setHasInitialData(ageGroups && ageGroups.length > 0);
    }
  }, [ageGroups]);

  React.useEffect(() => {
    // Update total count when agegroup change
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [totalCount, pageSize]);

  useEffect(() => {
    if (!UserHasPermission(userAllowedPermissions.permission, "READ_AGE_GROUPS")) {
      history.push("/");
    }
  }, []);
  return (
    <>
      {showModal && (
        <AgeGroupModal
          showModal={showModal}
          closeModal={closeModal}
          ageGroup={ageGroup}
          setAgeGroup={setAgeGroup}
          handleSaveAgeGroup={handleSaveAgeGroup}
          isEditMode={isEditMode}
          apiErrorMessage={errorMessage}
        />
      )}
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h4 className="page-title">Age Group Listing</h4>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Age Group
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
                    {UserHasPermission(userAllowedPermissions.permission, "WRITE_AGE_GROUPS") &&
                      <div className="mb-50">
                        <a
                          className="btn btn-primary float-end"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#modal-center"
                          onClick={openModal}
                        >
                          <Icon.Droplet />
                          <Icon.Plus />
                        </a>
                      </div>
                    }
                    <table
                      className="table table-bordered table-striped"
                      id="example1"
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th
                            className={
                              sortColumn === ""
                                ? "sorting"
                                : sortOrder === "asc"
                                  ? "sorting_asc"
                                  : "sorting_desc"
                            }
                            onClick={() => handleSortChange("name")}
                          >
                            Age Group
                          </th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ageGroups && ageGroups.length > 0 ? (
                          ageGroups.map((ageGroup, i) => (
                            <tr className="hover-primary" key={i}>
                              <td>{ageGroup?.id}</td>
                              <td>{ageGroup?.name}</td>

                              <td className="text-center">
                                <div className="list-icons d-inline-flex">
                                  {UserHasPermission(userAllowedPermissions.permission, "UPDATE_AGE_GROUPS") &&
                                    <a
                                      className="list-icons-item me-10 mtc"
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal-center"
                                      onClick={() => openModalWithData(ageGroup)}
                                    >
                                      <i className="fa fa-edit"></i>
                                    </a>
                                  }
                                  {UserHasPermission(userAllowedPermissions.permission, "DELETE_AGE_GROUPS") &&
                                    <ConfirmationDialog
                                      title="Delete Age Group"
                                      text="Are you sure you want to delete this Age group?"
                                      itemId={ageGroup?.id}
                                      onConfirm={handleDelete}
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
                              No records available
                            </td>
                          </tr>
                        )}
                      </tbody>
                      {hasInitialData && (
                        <tfoot>
                          <tr>
                            <th></th> {/* Empty cell for spacing */}
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search Age Group"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                              />
                            </th>
                            <th></th> {/* Empty cell for spacing */}
                          </tr>
                        </tfoot>
                      )}
                    </table>
                    {totalPages > 1 && (
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          Showing{" "}
                          {Math.min(
                            currentPage * pageSize - pageSize + 1,
                            totalCount
                          )}{" "}
                          to {Math.min(currentPage * pageSize, totalCount)} of{" "}
                          {totalCount} entries
                        </div>
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    )}
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
export default AgeGroupList;
