import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import { deleteDrug, fetchDrugs } from "../../redux/drugs/actions/drugsActions";
import { fetchDrugTypes } from "../../redux/drugType/actions/drugTypeActions";
import { fetchDrugForms } from "../../redux/drugForm/actions/drugFormActions";
import { fetchDrugClasses } from "../../redux/drugClass/actions/drugClassActions";
import { fetchDrugCategories } from "../../redux/drugCategory/actions/drugCategoryActions";
import { fetchAgeGroups } from "../../redux/ageGroup/actions/ageGroupAction";

import Pagination from "../Pagination";
import ConfirmationDialog from "../ConfirmationDialog";
import Toast from "../Toast";
import ToastContainerWrapper from "../ToastContainerWrapper";
import Loader from "../shared/Loader";
import UserHasPermission from "../../utils/Permissions";

const Drugs = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchDrugTypes()),
          dispatch(fetchDrugForms()),
          dispatch(fetchDrugCategories()),
          dispatch(fetchDrugClasses()),
          dispatch(fetchAgeGroups()),
        ]);
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const drugs = useSelector((state) => state.drugs.drugs);
  const totalCount = useSelector((state) => state.drugs.totalCount);
  const drugTypes = useSelector((state) => state.drugType.drugTypes);
  const drugForms = useSelector((state) => state.drugForm.drugForms);
  const drugClasses = useSelector((state) => state.drugClass.drugClasses);
  const ageGroups = useSelector((state) => state.ageGroup.ageGroups);
  const drugCategorys = useSelector(
    (state) => state.drugCategory.drugCategories
  );
  const isLoading = useSelector((state) => state.drugs.loading);
  const userAllowedPermissions = useSelector((state) => state.roles.role);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const pageSize = 10;
  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });

  const [searchFilters, setSearchFilters] = React.useState({
    id: "",
    label: "",
    drugName: "",
    ndc: "",
    price: "",
    quantity: "",
    dosage: "",
    drugForm: "",
    drugCategory: "",
    drugClass: "",
    drugType: "",
    ageGroup: "",
    refillable: "",
    refillLimit: "",
    tierOne: "",
    tierTwo: "",
    tierThree: "",
    tierFour: "",
    tierFive: "",
    erxRequired: "",
    active: "",
    maxQuantity: "",
    minQuantity: "",
    quantityAllowed: "",
  });

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await dispatch(
      fetchDrugs("admin", page, pageSize, searchFilters, sortConfig)
    );
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDrug(id));
      await dispatch(
        fetchDrugs("admin", currentPage, pageSize, searchFilters, sortConfig)
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
      Toast({ type: "success", message: "Drug deleted successfully" });
    } catch (error) {
      console.error("Error deleting drug type:", error);
      Toast({ type: "error", message: "Failed to deleted the Drug" });
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
    const fetchData = async () => {
      if (!UserHasPermission(userAllowedPermissions.permission, "READ_DRUGS")) {
        history.push("/");
      }
      await dispatch(
        fetchDrugs("admin", currentPage, pageSize, searchFilters, sortConfig)
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
    };
    fetchData();

    return () => {};
  }, [dispatch, searchFilters, sortConfig, currentPage, pageSize, totalCount]);

  return (
    <>
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h4 className="page-title">Drugs Listing</h4>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/admin/dashboard">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Drugs
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
                  {UserHasPermission(
                    userAllowedPermissions.permission,
                    "WRITE_DRUGS"
                  ) && (
                    <div className="mb-50">
                      <Link
                        to="/app/admin/drug/drugs/add"
                        className="btn btn-primary float-end"
                        type="button"
                      >
                        <Icon.Droplet />
                        <Icon.Plus />
                      </Link>
                    </div>
                  )}
                  <div className="table-responsive rounded card-table">
                    <table
                      className="table table-bordered table-striped"
                      id="example1"
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
                            ID
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
                            Name
                          </th>
                          <th
                            className={
                              sortConfig.column === "label"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("label")}
                          >
                            Label
                          </th>
                          <th
                            className={
                              sortConfig.column === "price"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("price")}
                          >
                            Price
                          </th>
                          <th
                            className={
                              sortConfig.column === "quantity"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("quantity")}
                          >
                            Quantity
                          </th>
                          <th
                            className={
                              sortConfig.column === "ndc"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("ndc")}
                          >
                            NDC
                          </th>
                          <th
                            className={
                              sortConfig.column === "dosage"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("dosage")}
                          >
                            Dosage
                          </th>
                          <th
                            className={
                              sortConfig.column === "drugForm"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("drugForm")}
                          >
                            Drug Form
                          </th>
                          <th
                            className={
                              sortConfig.column === "drugCategory"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("drugCategory")}
                          >
                            Drug Category
                          </th>
                          <th
                            className={
                              sortConfig.column === "drugClass"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("drugClass")}
                          >
                            Drug Class
                          </th>
                          <th
                            className={
                              sortConfig.column === "drugType"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("drugType")}
                          >
                            Drug Type
                          </th>
                          <th
                            className={
                              sortConfig.column === "ageGroup"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("ageGroup")}
                          >
                            Age Group
                          </th>
                          <th
                            className={
                              sortConfig.column === "refillable"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("refillable")}
                          >
                            Refillable
                          </th>
                          <th
                            className={
                              sortConfig.column === "refillLimit"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("refillLimit")}
                          >
                            Refill Limit
                          </th>
                          <th
                            className={
                              sortConfig.column === "tierOne"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("tierOne")}
                          >
                            Tier One
                          </th>
                          <th
                            className={
                              sortConfig.column === "tierTwo"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("tierTwo")}
                          >
                            Tier Two
                          </th>
                          <th
                            className={
                              sortConfig.column === "tierThree"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("tierThree")}
                          >
                            Tier Three
                          </th>
                          <th
                            className={
                              sortConfig.column === "tierFour"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("tierFour")}
                          >
                            Tier Four
                          </th>
                          <th
                            className={
                              sortConfig.column === "tierFive"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("tierFive")}
                          >
                            Tier Five
                          </th>
                          <th
                            className={
                              sortConfig.column === "erx"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("erx")}
                          >
                            ERX Required
                          </th>
                          <th
                            className={
                              sortConfig.column === "active"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("active")}
                          >
                            Active
                          </th>
                          <th
                            className={
                              sortConfig.column === "maxQty"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("maxQty")}
                          >
                            Max Quanitiy
                          </th>
                          <th
                            className={
                              sortConfig.column === "minQty"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("minQty")}
                          >
                            Min Quanitiy
                          </th>
                          <th
                            className={
                              sortConfig.column === "qtyAllowed"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("qtyAllowed")}
                          >
                            Quanitiy Allowed
                          </th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drugs &&
                          drugs.length !== 0 &&
                          drugs.map((drug, i) => (
                            <tr className="hover-primary" key={i}>
                              <td>{drug?.id}</td>
                              <td>{drug?.name}</td>
                              <td>{drug?.label}</td>
                              <td>{drug?.price}</td>
                              <td>{drug?.quantity}</td>
                              <td>{drug?.ndc}</td>
                              <td>{drug?.dosage}</td>
                              <td>{drug?.DrugForm?.name}</td>
                              <td>{drug?.DrugCategory?.name}</td>
                              <td>{drug?.DrugClass?.name}</td>
                              <td>{drug?.DrugType?.name}</td>
                              <td>{drug?.AgeGroup?.name}</td>
                              <td>
                                {drug?.refillable ? (
                                  <Icon.CheckCircle color="green" />
                                ) : (
                                  <Icon.AlertCircle color="red" />
                                )}
                              </td>
                              <td>{drug?.refillLimit}</td>
                              <td>{drug?.tierOne}</td>
                              <td>{drug?.tierTwo}</td>
                              <td>{drug?.tierThree}</td>
                              <td>{drug?.tierFour}</td>
                              <td>{drug?.tierFive}</td>
                              <td>{drug?.erxRequired}</td>
                              <td>
                                {drug?.active ? (
                                  <Icon.Disc color="green" />
                                ) : (
                                  <Icon.XCircle color="red" />
                                )}
                              </td>
                              <td>{drug?.maxQuantity || 0}</td>
                              <td>{drug?.minQuantity || 0}</td>
                              <td>{drug?.quantityAllowed}</td>

                              <td className="text-center">
                                <div className="list-icons d-inline-flex">
                                  {UserHasPermission(
                                    userAllowedPermissions.permission,
                                    "UPDATE_DRUGS"
                                  ) && (
                                    <Link
                                      to={`/app/admin/drug/drugs/${drug?.id}/edit`}
                                      className="list-icons-item me-10 mtc"
                                    >
                                      <i className="fa fa-edit"></i>
                                    </Link>
                                  )}
                                  {UserHasPermission(
                                    userAllowedPermissions.permission,
                                    "DELETE_DRUGS"
                                  ) && (
                                    <ConfirmationDialog
                                      title="Delete Drug"
                                      text="Are you sure you want to delete this drug?"
                                      itemId={drug?.id}
                                      onConfirm={handleDelete}
                                    >
                                      <i className="fa fa-remove"></i>
                                    </ConfirmationDialog>
                                  )}
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
                              placeholder="Search Drug ID"
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
                              placeholder="Search Drug Label"
                              value={searchFilters.label}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  label: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Price"
                              value={searchFilters.price}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  price: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Quantity"
                              value={searchFilters.quantity}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  quantity: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Drug NDC"
                              value={searchFilters.ndc}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  ndc: e.target.value,
                                })
                              }
                            />
                          </th>

                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Dosage"
                              value={searchFilters.dosage}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  dosage: e.target.value,
                                })
                              }
                            />
                          </th>

                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.drugForm}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  drugForm: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Drug Form</option>
                              {drugForms &&
                                drugForms.map((dform) => (
                                  <option key={dform.id} value={dform.id}>
                                    {dform.name}
                                  </option>
                                ))}
                            </select>
                          </th>

                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.drugCategory}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  drugCategory: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Drug Category</option>
                              {drugCategorys &&
                                drugCategorys.map((dcat) => (
                                  <option key={dcat.id} value={dcat.id}>
                                    {dcat.name}
                                  </option>
                                ))}
                            </select>
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.drugClass}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  drugClass: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Drug Class</option>
                              {drugClasses &&
                                drugClasses.map((dclass) => (
                                  <option key={dclass.id} value={dclass.id}>
                                    {dclass.name}
                                  </option>
                                ))}
                            </select>
                          </th>

                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.drugType}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  drugType: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Drug Type</option>
                              {drugTypes &&
                                drugTypes.map((dtype) => (
                                  <option key={dtype.id} value={dtype.id}>
                                    {dtype.name}
                                  </option>
                                ))}
                            </select>
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.ageGroup}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  ageGroup: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Age Group</option>
                              {ageGroups &&
                                ageGroups.map((ag) => (
                                  <option key={ag.id} value={ag.id}>
                                    {ag.name}
                                  </option>
                                ))}
                            </select>
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.refillable}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  refillable: e.target.value,
                                })
                              }
                            >
                              <option value="">Refillable?</option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Refill Limit"
                              value={searchFilters.refillLimit}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  refillLimit: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Tier One"
                              value={searchFilters.tierOne}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  tierOne: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Tier Two"
                              value={searchFilters.tierTwo}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  tierTwo: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Tier Three"
                              value={searchFilters.tierThree}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  tierThree: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Tier Four"
                              value={searchFilters.tierFour}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  tierFour: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Tier Five"
                              value={searchFilters.tierFive}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  tierFive: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search ERX Required"
                              value={searchFilters.erxRequired}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  erxRequired: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.active}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  active: e.target.value,
                                })
                              }
                            >
                              <option value="">Active?</option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Max Quantity"
                              value={searchFilters.maxQuantity}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  maxQuantity: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Min Quantity"
                              value={searchFilters.minQuantity}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  minQuantity: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Quantity Allowed"
                              value={searchFilters.quantityAllowed}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  quantityAllowed: e.target.value,
                                })
                              }
                            />
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

export default Drugs;
