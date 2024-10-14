import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import {
  deleteOrders,
  fetchOrders,
  getPrerequisite,
} from "../../redux/orders/actions/OrderActions";
import Pagination from "../Pagination";
//import ConfirmationDialog from "../ConfirmationDialog";
import Toast from "../Toast";
//import ToastContainerWrapper from "../ToastContainerWrapper";
import Loader from "../shared/Loader";
import UserHasPermission from "../../utils/Permissions";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import { fetchDrugs } from "../../redux/drugs/actions/drugsActions";
import { getCustomerAction } from "../../redux/customer.slice";
import { fetchSigs } from "../../redux/sigs/actions/sigsAction";
import {
  fetchPartners,
  fetchShippings,
} from "../../redux/partner/partnerActions";
import ToastContainerWrapper from "../ToastContainerWrapper";
import OrderIcon from "../../assets/order_icon.svg";

const Orders = () => {
  const [portal, setPortal] = useState("admin");
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userAllowedPermissions = useSelector((state) => state.roles.role);
  const drugs = useSelector((state) => state.drugs.drugs);
  const { shippings, states, partners } = useSelector(
    (state) => state.partners
  );
  const customers = useSelector((state) => state.customer.customers);
  const sigs = useSelector((state) => state.sigs.sigs);
  const { orders, totalCount, isLoading, orderPrequesite } = useSelector(
    (state) => state.orders
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const pageSize = 10;
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [filteredData, setFilteredData] = useState(orders);
  const [searchFilters, setSearchFilters] = React.useState({
    id: "",
    daySupply: "",
    refills: "",
    invoiceLink: "",
    status: "",
    sig: "",
    live: "",
    customer: "",
    orderDrug: "",
    totalAmount: "",
    refill: "",
    shipping: "",
    notes: "",
    quantity: "",
    _partnerId: "",
    //    partner_2: "",
  });
  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });
console.log("orders", orders);
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
 
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleFilterApply = () => {
    const filtered = orders.filter(
      (item) =>
        new Date(startDate) <= new Date(item.createdAt) &&
        new Date(item.createdAt) <= new Date(endDate)
    );
    setFilteredData(filtered);
  };
console.log("filteredData", filteredData)


  const convertToCSV = () => {
    const csvData = filteredData.map((item) => ({
      id: item.id,
      daySupply: item.daySupply,
      refills: item.refills,
      invoice: item.invoice_link,
      status: item.OrderStatus?.name,
      sig: item.Sig?.name,
      live: item.isLive,
      customer: item?.Customer?.firstName + " " + item?.Customer?.lastName,
      drug: item.OrderDrug?.Drug?.name,
      amount: item.totalAmount,
      refill: item.isRefill,
      shippingCompany: item.Shipping?.shippingCompany,
      notes: item.notes,
      quantity: item.quantity,
      partner: item.Partner?.name,
    }));

    return csvData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchDrugs("admin")),
          dispatch(getCustomerAction("admin")),
          dispatch(getPrerequisite()),
          dispatch(fetchPartners()),
          dispatch(fetchSigs()),
          dispatch(fetchShippings("admin")),
        ]);
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user.roles[0].toUpperCase() !== "SUPER-ADMIN") {
      setPortal("partner");
    }
  }, [user]);
  useEffect(() => {
    dispatch(
      fetchOrders(
        currentPage,
        pageSize,
        searchFilters,
        sortConfig,
        location.pathname.split("/").includes("partner") ? "partner" : "admin"
      )
    );
  }, [dispatch, searchFilters, sortConfig, currentPage, pageSize, totalCount]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [totalCount]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(
      fetchOrders(
        page,
        pageSize,
        searchFilters,
        sortConfig,
        location.pathname.split("/").includes("partner") ? "partner" : "admin"
      )
    );
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteOrders(id));
      await dispatch(
        fetchOrders(
          currentPage,
          pageSize,
          searchFilters,
          location.pathname.split("/").includes("partner") ? "partner" : "admin"
        )
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
      Toast({ type: "success", message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting Order type:", error);
      Toast({ type: "error", message: "Failed to deleted the Order" });
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
    if (!UserHasPermission(userAllowedPermissions.permission, "READ_ORDERS")) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    // Update filteredData after orders have been fetched
    setFilteredData(orders);
  }, [orders]);

  return (
    <>
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h4 className="page-title">Orders Listing</h4>

              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to={`/app/${portal}/dashboard`}>
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Orders
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
                    "WRITE_ORDERS"
                  ) && (
                    <div className="mb-50 d-flex justify-content-between">
                      <div className="mt-10 d-flex">
                        <div>
                          <label className="filter-label">Start Date</label>
                          <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            className="custom-datepicker-style mr-2"
                            placeholderText="Select Start Date"
                            isRequired={true}
                          />
                        </div>
                        <div>
                          <label className="filter-label">End Date</label>
                          <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            className="custom-datepicker-style mr-2"
                            placeholderText="Select End Date"
                            minDate={startDate} // Set minDate dynamically based on the selected start date
                            isRequired={true}
                          />
                        </div>
                        <div>
                        <button
        type="button"
        className="apply-btn-filter btn btn-info"
        onClick={handleFilterApply}
      >
        Apply Filter
      </button>
                        </div>
                        <div>
                          <CSVLink
                            data={convertToCSV()}
                            filename={"orders.csv"}
                            onClick={handleFilterApply}
                          >
                            <button
                              type="button"
                              className="apply-btn-filter btn btn-info"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="CSV File Download"
                            >
                              Download CSV
                            </button>
                          </CSVLink>
                        </div>
                      </div>

                      <Link
                        to={`/app/${portal}/orders/add`}
                        className="btn btn-primary float-end"
                        type="button"
                      >
                        <div style={{ display: "flex" }}>
                          <img src={OrderIcon} alt="" style={{ width: '40px' }} />
                          {/* <Icon.Plus /> */}
                        </div>
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
                              sortConfig.column === "daySupply"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("daySupply")}
                          >
                            Day Supply
                          </th>
                          <th
                            className={
                              sortConfig.column === "refills"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("refills")}
                          >
                            Refills
                          </th>
                          <th
                            className={
                              sortConfig.column === "invoice_link"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("invoice_link")}
                          >
                            Invoice Link
                          </th>
                          {/* <th
                            className={
                              sortConfig.column === "activation_code"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("activation_code")}
                          >
                            Activation Code
                          </th> */}
                          <th
                            className={
                              sortConfig.column === "statusId"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("statusId")}
                          >
                            Status
                          </th>
                          <th
                            className={
                              sortConfig.column === "sigId"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("sigId")}
                          >
                            Sig
                          </th>
                          <th>Live</th>
                          <th
                            className={
                              sortConfig.column === "customerId"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("customerId")}
                          >
                            Customer
                          </th>
                          <th
                            className={
                              sortConfig.column === "orderDrugId"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("orderDrugId")}
                          >
                            Order Drug
                          </th>
                          <th
                            className={
                              sortConfig.column === "totalAmount"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("totalAmount")}
                          >
                            Total Amount
                          </th>
                          <th>Refill</th>
                          <th
                            className={
                              sortConfig.column === "shippingId"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("shippingId")}
                          >
                            Shipping
                          </th>
                          {/* <th
                            className={
                              sortConfig.column === "shippingName"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("shippingName")}
                          >
                            Shipping Name
                          </th>
                          <th
                            className={
                              sortConfig.column === "shippingAddress"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("shippingAddress")}
                          >
                            Shipping Address
                          </th>
                          <th
                            className={
                              sortConfig.column === "shippingCity"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("shippingCity")}
                          >
                            Shipping City
                          </th>
                          <th
                            className={
                              sortConfig.column === "shippingStateId"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("shippingStateId")}
                          >
                            Shipping State
                          </th>
                          <th
                            className={
                              sortConfig.column === "shippingZipCode"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("shippingZipCode")}
                          >
                            Shipping Zip Code
                          </th> */}
                          <th
                            className={
                              sortConfig.column === "notes"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("notes")}
                          >
                            Notes
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
                          {/* {portal == "admin" && <th
                            className={
                              sortConfig.column === "partnerId"
                                ? `sorting_${sortConfig.order === "asc" ? "asc" : "desc"
                                }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("partnerId")}
                          >
                            Partner
                          </th>} */}
                          {portal == "admin" && (
                            <th
                              className={
                                sortConfig.column === "partnerId"
                                  ? `sorting_${
                                      sortConfig.order === "asc"
                                        ? "asc"
                                        : "desc"
                                    }`
                                  : "sorting"
                              }
                              onClick={() => handleSortChange("partnerId")}
                            >
                              Partner
                            </th>
                          )}
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.length !== 0 &&
                          filteredData.map((order, i) => (
                            <tr className="hover-primary" key={i}>
                              <td>{order?.id}</td>
                              <td>{order?.daySupply}</td>
                              <td>{order?.refills}</td>
                              <td>
                                <a href={order?.invoice_link} target="_black">
                                  {order?.invoice_link}
                                </a>
                              </td>
                              <td>{order?.OrderStatus?.name}</td>
                              <td>{order?.Sig?.name}</td>
                              <td>
                                {order?.isLive ? (
                                  <Icon.Disc color="green" />
                                ) : (
                                  <Icon.XCircle color="red" />
                                )}
                              </td>
                              <td>
                                {order?.Customer?.firstName +
                                  " " +
                                  order?.Customer?.lastName}
                              </td>
                              <td>{order?.OrderDrug?.Drug?.name}</td>
                              <td>{order?.totalAmount}</td>
                              <td>
                                {order?.isRefill ? (
                                  <Icon.CheckCircle color="green" />
                                ) : (
                                  <Icon.AlertCircle color="red" />
                                )}
                              </td>
                              <td>{order?.Shipping?.shippingCompany}</td>
                              <td>{order?.notes}</td>
                              <td>{order?.quantity}</td>
                              {portal == "admin" && <td>{order?.Partner?.name}</td>}
                              <td className="text-center">
                                <div className="list-icons d-inline-flex">
                                  <div className="view-icon">
                                    <Link
                                      to={`/app/admin/orders/${order?.id}/edit`}
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View Order Details"
                                      >
                                        <i className="fa fa-edit"></i>
                                      </button>
                                    </Link>

                                    {/* <i className="fa fa-send ml-2"></i> */}
                                  </div>

                                  <div className="view-icon">
                                    <Link
                                      to={`/app/admin/orders/${order?.id}/view`}
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View Order Details"
                                      >
                                        <i
                                          className="fa fa-eye ml-5"
                                          aria-hidden="true"
                                        ></i>
                                      </button>
                                    </Link>

                                    {/* <i className="fa fa-send ml-2"></i> */}
                                  </div>
                                  {UserHasPermission(
                                    userAllowedPermissions.permission,
                                    "UPDATE_ORDER_ADMIN"
                                  ) && (
                                    <div className="admin-icon">
                                      <Link
                                        to={`/app/admin/orders/${order?.id}/admin`}
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="View Shipping Details"
                                        >
                                          <i
                                            className="fa fa-info ml-5"
                                            aria-hidden="true"
                                          ></i>
                                        </button>
                                      </Link>

                                      {/* <i className="fa fa-send ml-2"></i> */}
                                    </div>
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
                              placeholder="Search Day Supply"
                              value={searchFilters.daySupply}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  daySupply: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Refills"
                              value={searchFilters.refills}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  refills: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Invoice Link"
                              value={searchFilters.invoiceLink}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  invoiceLink: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.status}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  status: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Status</option>
                              {orderPrequesite &&
                                orderPrequesite.order_status &&
                                orderPrequesite.order_status.map((ostatus) => (
                                  <option key={ostatus.id} value={ostatus.id}>
                                    {ostatus.name}
                                  </option>
                                ))}
                            </select>
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.sig}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  sig: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Sig</option>
                              {sigs &&
                                sigs.map((sig) => (
                                  <option key={sig.id} value={sig.id}>
                                    {sig.name}
                                  </option>
                                ))}
                            </select>
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.live}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  live: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Live</option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.customer}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  customer: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Customer</option>
                              {customers &&
                                customers.map((customer) => (
                                  <option key={customer.id} value={customer.id}>
                                    {customer.firstName +
                                      "" +
                                      customer.lastName}
                                  </option>
                                ))}
                            </select>
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.orderDrug}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  orderDrug: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Drug</option>
                              {drugs &&
                                drugs.map((drug) => (
                                  <option key={drug.id} value={drug.id}>
                                    {drug.name}
                                  </option>
                                ))}
                            </select>
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Total Amount"
                              value={searchFilters.totalAmount}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  totalAmount: e.target.value,
                                })
                              }
                            />
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.refill}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  refill: e.target.value,
                                })
                              }
                            >
                              <option value="" disabled>
                                Select Refill
                              </option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
                          </th>
                          <th>
                            <select
                              className="form-select"
                              value={searchFilters.shipping}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  shipping: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Shipping</option>
                              {shippings &&
                                shippings.map((shipping) => (
                                  <option key={shipping.id} value={shipping.id}>
                                    {shipping.shippingCompany}
                                  </option>
                                ))}
                            </select>
                          </th>
                          <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Notes"
                              value={searchFilters.notes}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  notes: e.target.value,
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
                            <select
                              className="form-select"
                              value={searchFilters._partnerId}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  _partnerId: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Partner</option>
                              {partners &&
                                partners.map((partner) => (
                                  <option key={partner.id} value={partner.id}>
                                    {partner.name}
                                  </option>
                                ))}
                            </select>
                          </th>
                          {/* <th>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Partner 2"
                              value={searchFilters.partner_2}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  partner_2: e.target.value,
                                })
                              }
                            />
                          </th> */}
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

export default Orders;
