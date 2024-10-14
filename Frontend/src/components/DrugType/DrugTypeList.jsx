import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import {
  createDrugType,
  updateDrugType,
  deleteDrugType,
  fetchDrugTypes,
} from "../../redux/drugType/actions/drugTypeActions";
import Loader from "../shared/Loader";
import Pagination from "../Pagination";
import ConfirmationDialog from "../ConfirmationDialog";
import Toast from "../Toast";
import ToastContainerWrapper from "../ToastContainerWrapper";
import DrugTypeModal from "./DrugTypeModal";
import UserHasPermission from "../../utils/Permissions";

const DrugTypeList = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const drugTypes = useSelector((state) => state.drugType.drugTypes);
  const totalCount = useSelector((state) => state.drugType.totalCount);
  const isLoading = useSelector((state) => state.drugType.loading);
  const userAllowedPermissions = useSelector((state) => state.roles.role);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const pageSize = 10;
  const [query, setQuery] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });
  let portal = "admin";
  if (location.pathname.split("/").includes("partner")) {
    portal = "partner";
  }
  const [showModal, setShowModal] = React.useState(false);
  const [drugType, setDrugType] = React.useState("");
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [hasInitialData, setHasInitialData] = React.useState(false);
  // Use useEffect to update hasInitialData when drugTypes changes
  React.useEffect(() => {
    if (!hasInitialData) {
      setHasInitialData(drugTypes && drugTypes.length > 0);
    }
  }, [drugTypes]);

  const openModal = () => {
    setShowModal(true);
    setIsEditMode(false);
    setSelectedItem();
    setDrugType();
  };

  const openModalWithData = (drugType) => {
    setSelectedItem(drugType);
    setDrugType(drugType?.name);
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

  const handleSaveType = async () => {
    try {
      // Clear any previous error message
      setErrorMessage("");

      if (isEditMode) {
        // If in Edit mode, update the existing drug form
        await dispatch(updateDrugType(selectedItem?.id, { name: drugType }));
        Toast({
          type: "success",
          message: "Drug Type updated successfully",
        });
      } else {
        // If in Add mode, create a new drug form
        await dispatch(createDrugType({ name: drugType }));
        Toast({
          type: "success",
          message: "Drug Type created successfully",
        });
      }

      // Fetch and update the listing data as needed
      await dispatch(fetchDrugTypes(currentPage, pageSize, query, sortConfig, portal));
      setTotalPages(Math.ceil(totalCount / pageSize));

      closeModal();

      if (drugTypes && drugTypes.length === 1 && hasInitialData) {
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
      modalElement.remove();
    }
    document.querySelector("body").classList =
      "light-skin sidebar-mini theme-success fixed";
    dispatch(fetchDrugTypes(currentPage, pageSize, query, sortConfig, portal));
    setTotalPages(Math.ceil(totalCount / pageSize));
    console.log("2");
    console.log(drugTypes);
    return () => { };
  }, [dispatch, currentPage, pageSize, query, sortConfig]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchDrugTypes(page, pageSize, query, sortConfig, portal));
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDrugType(id));

      // Wait for the deletion to complete before fetching updated drugTypes
      const _drugs = await dispatch(
        fetchDrugTypes(currentPage, pageSize, query, sortConfig)
      );

      // Use the updated drugTypes after deletion
      console.log("1");
      console.log(drugTypes);

      setTotalPages(Math.ceil(totalCount / pageSize));
      Toast({ type: "success", message: "Drug Type deleted successfully" });

      // Check if drugTypes is empty after deletion
      if (!_drugs || _drugs.length === 0) {
        setHasInitialData(false);
      }
    } catch (error) {
      console.error("Error deleting drug type:", error);
      Toast({ type: "error", message: "Drug Type failed to be deleted" });
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

  React.useEffect(() => {
    // Update total count when drug type change
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [totalCount, pageSize]);

  useEffect(() => {
    if (!UserHasPermission(userAllowedPermissions.permission, "READ_DRUG_TYPE")) {
      history.push("/");
    }
  }, []);
  return (
    <>
      {showModal && (
        <DrugTypeModal
          showModal={showModal}
          closeModal={closeModal}
          drugType={drugType}
          setDrugType={setDrugType}
          handleSaveType={handleSaveType}
          isEditMode={isEditMode}
          apiErrorMessage={errorMessage}
          className="custom-modal"
        />
      )}

      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h4 className="page-title">Drug Type Listing</h4>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Drug Type
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
                    {UserHasPermission(userAllowedPermissions.permission, "WRITE_DRUG_TYPE") &&
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
                              sortConfig.column === "name"
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
                                }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("name")}
                          >
                            Type
                          </th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drugTypes && drugTypes.length > 0 ? (
                          drugTypes.map((drugType, i) => (
                            <tr className="hover-primary" key={i}>
                              <td>{drugType?.id}</td>
                              <td>{drugType?.name}</td>

                              <td className="text-center">
                                <div className="list-icons d-inline-flex">
                                  {UserHasPermission(userAllowedPermissions.permission, "UPDATE_DRUG_TYPE") &&
                                    <a
                                      className="list-icons-item me-10 mtc"
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal-center"
                                      onClick={() => openModalWithData(drugType)}
                                    >
                                      <i className="fa fa-edit"></i>
                                    </a>
                                  }
                                  {UserHasPermission(userAllowedPermissions.permission, "DELETE_DRUG_TYPE") &&
                                    <ConfirmationDialog
                                      title="Delete Drug Type"
                                      text="Are you sure you want to delete this drug type?"
                                      itemId={drugType?.id}
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
                                placeholder="Search Category"
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

export default DrugTypeList;
