import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import {
  createDrugForm,
  updateDrugForm,
  deleteDrugForm,
  fetchDrugForms,
} from "../../redux/drugForm/actions/drugFormActions";
import Pagination from "../Pagination";
import ConfirmationDialog from "../ConfirmationDialog";
import Toast from "../Toast";
import ToastContainerWrapper from "../ToastContainerWrapper";
import DrugFormModal from "./DrugFormModal";
import Loader from "../shared/Loader";
import UserHasPermission from "../../utils/Permissions";
const DrugFormList = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const drugForms = useSelector((state) => state.drugForm.drugForms);
  const totalCount = useSelector((state) => state.drugForm.totalCount);
  const isLoading = useSelector((state) => state.drugForm.loading);
  const userAllowedPermissions = useSelector((state) => state.roles.role);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const pageSize = 10;
  const [query, setQuery] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });

  const [showModal, setShowModal] = React.useState(false);
  const [drugForm, setDrugForm] = React.useState("");
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  let portal = "admin";
  if (location.pathname.split("/").includes("partner")) {
    portal = "partner";
  }
  const openModal = () => {
    setShowModal(true);
    setIsEditMode(false);
    setSelectedItem();
    setDrugForm();
  };

  const openModalWithData = (drugForm) => {
    setSelectedItem(drugForm);
    setDrugForm(drugForm?.name);
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

  const handleSaveForm = async () => {
    try {
      // Clear any previous error message
      setErrorMessage("");

      if (isEditMode) {
        // If in Edit mode, update the existing drug form
        await dispatch(updateDrugForm(selectedItem?.id, { name: drugForm }));
        Toast({
          type: "success",
          message: "Drug Form updated successfully",
        });
        closeModal();
      } else {
        // If in Add mode, create a new drug form
        await dispatch(createDrugForm({ name: drugForm }));
        Toast({
          type: "success",
          message: "Drug Form created successfully",
        });
        closeModal();
      }

      // Fetch and update the listing data as needed
      await dispatch(fetchDrugForms(currentPage, pageSize, query, sortConfig, portal));
      setTotalPages(Math.ceil(totalCount / pageSize));

      if (drugForms && drugForms.length === 1 && hasInitialData) {
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
    dispatch(fetchDrugForms(currentPage, pageSize, query, sortConfig, portal));
    setTotalPages(Math.ceil(totalCount / pageSize));
    return () => { };
  }, [dispatch, currentPage, pageSize, query, sortConfig]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchDrugForms(page, pageSize, query, portal));
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDrugForm(id));
      const _drugForms = await dispatch(
        fetchDrugForms(currentPage, pageSize, query, sortConfig, portal)
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
      Toast({ type: "success", message: "Drug Form deleted successfully" });

      // Check if _drugForms is empty after deletion
      if (!_drugForms || _drugForms.length === 0) {
        setHasInitialData(false);
      }
    } catch (error) {
      console.error("Error deleting drug form:", error);
      Toast({ type: "error", message: "Drug Form failed to be deleted" });
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

  const [hasInitialData, setHasInitialData] = React.useState(false);
  // Use useEffect to update hasInitialData when drugTypes changes
  React.useEffect(() => {
    if (!hasInitialData) {
      setHasInitialData(drugForms && drugForms.length > 0);
    }
  }, [drugForms]);

  React.useEffect(() => {
    // Update total count when drug form change
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [totalCount, pageSize]);

  useEffect(() => {
    if (!UserHasPermission(userAllowedPermissions.permission, "READ_DRUG_FORM")) {
      history.push("/");
    }
  }, []);
  return (
    <>
      {showModal && (
        <DrugFormModal
          showModal={showModal}
          closeModal={closeModal}
          drugForm={drugForm}
          setDrugForm={setDrugForm}
          handleSaveForm={handleSaveForm}
          isEditMode={isEditMode}
          apiErrorMessage={errorMessage}
        />
      )}
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h4 className="page-title">Drug Form Listing</h4>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Drug Form
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
                    {UserHasPermission(userAllowedPermissions.permission, "WRITE_DRUG_FORM") &&
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
                            Drug Form
                          </th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drugForms && drugForms.length > 0 ? (
                          drugForms.map((drugForm, i) => (
                            <tr className="hover-primary" key={i}>
                              <td>{drugForm?.id}</td>
                              <td>{drugForm?.name}</td>

                              <td className="text-center">
                                <div className="list-icons d-inline-flex">
                                  {UserHasPermission(userAllowedPermissions.permission, "UPDATE_DRUG_FORM") &&
                                    <a
                                      className="list-icons-item me-10 mtc"
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal-center"
                                      onClick={() => openModalWithData(drugForm)}
                                    >
                                      <i className="fa fa-edit"></i>
                                    </a>
                                  }
                                  {UserHasPermission(userAllowedPermissions.permission, "DELETE_DRUG_FORM") &&
                                    <ConfirmationDialog
                                      title="Delete Drug Form"
                                      text="Are you sure you want to delete this drug form?"
                                      itemId={drugForm?.id}
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
                      {hasInitialData > 0 && (
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

export default DrugFormList;
