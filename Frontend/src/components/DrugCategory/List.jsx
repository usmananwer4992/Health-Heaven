import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import {
  createDrugCategory,
  updateDrugCategory,
  deleteDrugCategory,
  fetchDrugCategories,
} from "../../redux/drugCategory/actions/drugCategoryActions";
import Loader from "../shared/Loader";
import Pagination from "../Pagination";
import ConfirmationDialog from "../ConfirmationDialog";
import Toast from "../Toast";
import ToastContainerWrapper from "../ToastContainerWrapper";
import DrugCategoryModal from "./DrugCategoryModal";
import UserHasPermission from "../../utils/Permissions";

const List = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const drugCategories = useSelector(
    (state) => state.drugCategory.drugCategories
  );

  const totalCount = useSelector((state) => state.drugCategory.totalCount);
  const isLoading = useSelector((state) => state.drugCategory.loading);
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
  const [category, setCategory] = React.useState("");
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
    setSelectedItem(null);
    setCategory("");
    setErrorMessage("");
  };

  const openModalWithData = (category) => {
    setSelectedItem(category);
    setCategory(category?.name);
    setShowModal(true);
    setIsEditMode(true);
    setErrorMessage("");
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage("");
    const modalElement = document.querySelector(".modal-backdrop");
    if (modalElement !== null) {
      modalElement.remove();
    }
  };

  const handleSaveCategory = async () => {
    try {
      // Clear any previous error message
      setErrorMessage("");

      if (isEditMode) {
        // If in Edit mode, update the existing category
        await dispatch(
          updateDrugCategory(selectedItem?.id, { name: category })
        );
        Toast({
          type: "success",
          message: "Drug Category updated successfully",
        });
      } else {
        // If in Add mode, create a new category
        await dispatch(createDrugCategory({ name: category }));
        Toast({
          type: "success",
          message: "Drug Category created successfully",
        });
      }
      closeModal();
      // Fetch and update the listing data as needed
      await dispatch(
        fetchDrugCategories(currentPage, pageSize, query, sortConfig, portal)
      );

      setTotalPages(Math.ceil(totalCount / pageSize));

      if (drugCategories && drugCategories.length === 1 && hasInitialData) {
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
    dispatch(fetchDrugCategories(currentPage, pageSize, query, sortConfig, portal));
    setTotalPages(Math.ceil(totalCount / pageSize));
    return () => { };
  }, [dispatch, currentPage, pageSize, query, sortConfig]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchDrugCategories(page, pageSize, query, sortConfig, portal));
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDrugCategory(id));
      const _categories = await dispatch(
        fetchDrugCategories(currentPage, pageSize, query, sortConfig, portal)
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
      Toast({ type: "success", message: "Drug Category deleted successfully" });

      // Check if _categories is empty after deletion
      if (!_categories || _categories.length === 0) {
        setHasInitialData(false);
      }
    } catch (error) {
      console.error("Error deleting drug category:", error);
      Toast({ type: "error", message: "Drug Category failed to be deleted" });
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
      setHasInitialData(drugCategories && drugCategories.length > 0);
    }
  }, [drugCategories]);

  React.useEffect(() => {
    // Update total count when drug categories change
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [totalCount, pageSize]);

  useEffect(() => {
    if (!UserHasPermission(userAllowedPermissions.permission, "READ_DRUG_CATEGORY")) {
      history.push("/");
    }
  }, []);
  return (
    <>
      {showModal && (
        <DrugCategoryModal
          showModal={showModal}
          closeModal={closeModal}
          category={category}
          setCategory={setCategory}
          handleSaveCategory={handleSaveCategory}
          isEditMode={isEditMode}
          apiErrorMessage={errorMessage}
        />
      )}
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h4 className="page-title">Drug Category Listing</h4>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Drug Category
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
                    {UserHasPermission(userAllowedPermissions.permission, "WRITE_DRUG_CATEGORY") &&
                      <div className="mb-50 ">
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
                            Category
                          </th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drugCategories && drugCategories.length > 0 ? (
                          drugCategories.map((drugCategory, i) => (
                            <tr className="hover-primary" key={i}>
                              <td>{drugCategory?.id}</td>
                              <td>{drugCategory?.name}</td>

                              { } <td className="text-center">
                                <div className="list-icons d-inline-flex">
                                  {UserHasPermission(userAllowedPermissions.permission, "UPDATE_DRUG_CATEGORY") &&
                                    <a
                                      className="list-icons-item me-10 mtc"
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal-center"
                                      onClick={() =>
                                        openModalWithData(drugCategory)
                                      }
                                    >
                                      <i className="fa fa-edit"></i>
                                    </a>
                                  }
                                  {UserHasPermission(userAllowedPermissions.permission, "DELETE_DRUG_CATEGORY") &&
                                    <ConfirmationDialog
                                      title="Delete Category"
                                      text="Are you sure you want to delete this category?"
                                      itemId={drugCategory?.id}
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

export default List;
