import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import {
  deleteOrders,
  fetchOrders,
} from "../../redux/orders/actions/OrderActions";
import Pagination from "../Pagination";
import ConfirmationDialog from "../ConfirmationDialog";
import Toast from "../Toast";
import ToastContainerWrapper from "../ToastContainerWrapper";
import Loader from "../shared/Loader";

const Orders = () => {
  const [portal, setPortal] = useState("admin");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const { orders, totalCount, isLoading } = useSelector(
    (state) => state.orders
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const pageSize = 10;
  const [query, setQuery] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });

  useEffect(() => {
    if (location.pathname.split("/").includes("partner")) {
      setPortal("partner");
    }
  }, [user]);
  useEffect(() => {
    dispatch(
      fetchOrders(currentPage, pageSize, query, sortConfig, user?.partner?.id)
    );
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [totalCount]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchOrders(page, pageSize, query, sortConfig, user?.partner?.id));
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteOrders(id));
      await dispatch(
        fetchOrders(currentPage, pageSize, query, user?.partner?.id)
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
                  <div className="mb-50">
                    <Link
                      to={`/app/${portal}/orders/add`}
                      className="btn btn-primary float-end"
                      type="button"
                    >
                      <Icon.Droplet />
                      <Icon.Plus />
                    </Link>
                  </div>
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
                              sortConfig.column === "preName"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("preName")}
                          >
                            Prescriber Name
                          </th>
                          <th
                            className={
                              sortConfig.column === "prePhone"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("prePhone")}
                          >
                            Prescriber Phone
                          </th>
                          <th
                            className={
                              sortConfig.column === "preAddress"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("preAddress")}
                          >
                            Prescriber Address
                          </th>
                          <th
                            className={
                              sortConfig.column === "preNpiNumber"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("preNpiNumber")}
                          >
                            Prescriber Npi Number
                          </th>
                          <th
                            className={
                              sortConfig.column === "preSupervisior"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("preSupervisior")}
                          >
                            Prescriber Supervisior
                          </th>
                          <th
                            className={
                              sortConfig.column === "pre_state"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("pre_state")}
                          >
                            Prescriber State
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
                            Invoive Link
                          </th>
                          <th
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
                          </th>
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
                          <th
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
                          </th>
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
                          <th
                            className={
                              sortConfig.column === "partnerId"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("partnerId")}
                          >
                            Partner
                          </th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length !== 0 &&
                          orders.map((order, i) => (
                            <tr className="hover-primary" key={i}>
                              <td>{order?.id}</td>
                              <td>{order?.preName}</td>
                              <td>{order?.prePhone}</td>
                              <td>{order?.preAddress}</td>
                              <td>{order?.preNpiNumber}</td>
                              <td>{order?.preSupervisior}</td>
                              <td>{order?.pre_state}</td>
                              <td>{order?.daySupply}</td>
                              <td>{order?.refills}</td>
                              <td>
                                <a href={order?.invoice_link} target="_black">
                                  {order?.invoice_link}
                                </a>
                              </td>
                              <td>{order?.activation_code}</td>
                              <td>{order?.OrderStatus?.name}</td>
                              <td>{order?.Sig?.name}</td>
                              <td key={order?.id}>
                                <button
                                  type="button"
                                  className={`btn btn-sm btn-toggle ${
                                    order?.isLive ? "active" : ""
                                  }`}
                                >
                                  <div className="handle"></div>
                                </button>
                              </td>
                              <td>
                                {order?.Customer?.firstName +
                                  " " +
                                  order?.Customer?.lastName}
                              </td>
                              <td>{order?.OrderDrug?.Drug?.name}</td>
                              <td>{order?.totalAmount}</td>
                              <td key={`${order.id}_isRefill`}>
                                <button
                                  type="button"
                                  className={`btn btn-sm btn-toggle ${
                                    order?.isRefill ? "active" : ""
                                  }`}
                                >
                                  <div className="handle"></div>
                                </button>
                              </td>
                              <td>{order?.Shipping?.shippingCompany}</td>
                              <td>{order?.shippingName}</td>
                              <td>{order?.shippingAddress}</td>
                              <td>{order?.shippingCity}</td>
                              <td>{order?.State?.name}</td>
                              <td>{order?.shippingZipCode}</td>
                              <td>{order?.notes}</td>
                              <td>{order?.quantity}</td>
                              <td>{order?.Partner?.name}</td>
                              <td className="text-center">
                                <div className="list-icons d-inline-flex">
                                  <Link
                                    to={`/app/${portal}/orders/${order?.id}/edit`}
                                    className="list-icons-item me-10 mtc"
                                  >
                                    <i className="fa fa-edit"></i>
                                  </Link>

                                  <ConfirmationDialog
                                    title="Delete Drug"
                                    text="Are you sure you want to delete this order?"
                                    itemId={order?.id}
                                    onConfirm={handleDelete}
                                  >
                                    <i className="fa fa-remove"></i>
                                  </ConfirmationDialog>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
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
                    {/* <ToastContainerWrapper /> */}
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
