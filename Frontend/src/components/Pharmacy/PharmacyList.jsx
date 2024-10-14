import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import ConfirmationDialog from "../ConfirmationDialog";
import Pagination from "../Pagination";
import ToastContainerWrapper from "../ToastContainerWrapper";
import Loader from "../shared/Loader";
import {
  fetchPharmacies,
  createPharmacies,
  updatePharmacy,
  deletePharmacy,
} from "../../redux/pharmacies/actions/pharmacyActions";
import Toast from "../Toast";
import { useDispatch, useSelector } from "react-redux";
import PharmacyModal from "./PharmacyModal";
import UserHasPermission from "../../utils/Permissions";

const PharmacyList = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const userAllowedPermissions = useSelector((state) => state.roles.role);
  const pageSize = 10;
  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });

  const {
    totalCount,
    pharmacies,
    loading: isLoading,
  } = useSelector((state) => state.pharmacies);
  const [showModal, setShowModal] = React.useState(false);
  const [pharmacy, setPharmacy] = React.useState({
    name: "",
    phone: "",
  });
  const [searchFilters, setSearchFilters] = React.useState({
    id: "",
    name: "",
    phone: "",
  });
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const openModal = () => {
    setShowModal(true);
    setIsEditMode(false);
    setSelectedItem();
    setPharmacy();
  };

  const openModalWithData = (pharmacy) => {
    console.log(pharmacy);
    setSelectedItem(pharmacy);
    setPharmacy(pharmacy);
    setShowModal(true);
    setIsEditMode(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage("");

    // Remove all modal backdrops
    const backdropElements = document.querySelectorAll(".modal-backdrop");
    backdropElements.forEach((backdrop) => {
      backdrop.remove();
    });
  };

  const handleSavePharmacy = async () => {
    try {
      if (isEditMode) {
        await dispatch(updatePharmacy(selectedItem?.id, pharmacy));
        Toast({
          type: "success",
          message: "Pharmacy updated successfully",
        });
      } else {
        await dispatch(createPharmacies(pharmacy));
        Toast({
          type: "success",
          message: "Pharmacy created successfully",
        });
      }
      closeModal();
      await dispatch(
        fetchPharmacies(currentPage, pageSize, searchFilters, sortConfig)
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
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
    dispatch(fetchPharmacies(currentPage, pageSize, searchFilters, sortConfig));
    setTotalPages(Math.ceil(totalCount / pageSize));
    return () => { };
  }, [dispatch, showModal, currentPage, pageSize, searchFilters, sortConfig]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchPharmacies(page, pageSize, searchFilters, sortConfig));
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deletePharmacy(id));
      await dispatch(
        fetchPharmacies(currentPage, pageSize, searchFilters, sortConfig)
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
      Toast({ type: "success", message: "Pharmacy deleted successfully" });
    } catch (error) {
      console.error("Error deleting Pharmacy:", error);
      Toast({ type: "error", message: "Pharmacy failed to be deleted" });
    }
  };

  useEffect(() => {
    if (!UserHasPermission(userAllowedPermissions.permission, "READ_PHARMACY")) {
      history.push("/");
    }
  }, []);

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
  return (
    <>
      {showModal && (
        <PharmacyModal
          showModal={showModal}
          closeModal={closeModal}
          pharmacy={pharmacy}
          setPharmacy={setPharmacy}
          handleSavePharmacy={handleSavePharmacy}
          isEditMode={isEditMode}
          apiErrorMessage={errorMessage}
        />
      )}
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h4 className="page-title">Pharmacy Listing</h4>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Pharmacy
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
                    {UserHasPermission(userAllowedPermissions.permission, "WRITE_PHARMACY") &&
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
                            Pharmacy Name
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
                            Pharmacy Phone
                          </th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pharmacies && pharmacies.length > 0 ? (
                          pharmacies.map((pharmacy, i) => (
                            <tr className="hover-primary" key={i}>
                              <td>{pharmacy?.id}</td>
                              <td>{pharmacy?.name}</td>
                              <td>{pharmacy?.phone}</td>
                              <td className="text-center">
                                <div className="list-icons d-inline-flex">
                                  {UserHasPermission(userAllowedPermissions.permission, "UPDATE_PHARMACY") &&
                                    <a
                                      className="list-icons-item me-10 mtc"
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal-center"
                                      onClick={() => openModalWithData(pharmacy)}
                                    >
                                      <i className="fa fa-edit"></i>
                                    </a>
                                  }
                                  {UserHasPermission(userAllowedPermissions.permission, "DELETE_PHARMACY") &&
                                    <ConfirmationDialog
                                      title="Delete Pharmacy"
                                      text="Note: All the transfers that are using this Pharmacy those all will be deleted as well. Please do this carefully!"
                                      itemId={pharmacy?.id}
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
                      {/* {pharmacies && pharmacies.length > 0 && ( */}
                        <tfoot>
                          <tr>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search ID"
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
                                placeholder="Search Name"
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
                            <th></th> {/* Empty cell for spacing */}
                          </tr>
                        </tfoot>
                     
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
export default PharmacyList;
