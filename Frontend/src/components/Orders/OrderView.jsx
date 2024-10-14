import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { fetchOrderDetails } from "../../redux/orders/actions/OrderActions";

const OrderView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order: orderDetail } = useSelector(
    (state) => state.orders.orderDetail
  );

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        await dispatch(fetchOrderDetails(id));
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrder();
  }, [id, dispatch]);

  // Check if orderDetail exists before accessing its properties
  const createdAt = orderDetail?.Partner?.createdAt
    ? new Date(orderDetail.Partner.createdAt)
    : null;

  let day;
  let month;
  let year;

  if (createdAt !== null) {
    day = createdAt.getDate();
    month = createdAt.getMonth() + 1; // Months are zero-based, so add 1
    year = createdAt.getFullYear();

    // Do something with day, month, and year
    console.log(`Date: ${month}/${day}/${year}`);
  } else {
    day = "";
    month = "";
    year = "";
    // Handle the case when createdAt is null
    console.log("Date is null");
  }

  const formattedDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
  const subTotal = (
    orderDetail?.OrderDrug?.Drug?.price * orderDetail?.quantity
  ).toFixed(2);

  return (
    <>
      <div className="invoice-div mt-5">
        <div className="row">
          <div className="invoice-header col-md-12 d-flex justify-content-between">
            <h2 className="invoice-heading">{orderDetail?.Partner?.name}</h2>
            <p className="invoice-order">
              <strong> Order: #{orderDetail?.id}</strong>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <p>{orderDetail?.Partner?.address}</p>
            <p>
              {orderDetail?.Partner?.city}
              {", "}
              {orderDetail?.Partner?.zipCode}
            </p>
          </div>
          <div className="col-md-3 text-md-right">
            <p>
              Date: <strong>{formattedDate}</strong>
            </p>
            <p>
              Status: <strong>{orderDetail?.OrderStatus?.name}</strong>
            </p>
            <p>
              Tracking No: <strong>{orderDetail?.trackingId}</strong>
            </p>
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="col-md-12">
            <h4>Shipping Information</h4>
            <p>
              {orderDetail?.Customer?.firstName}{" "}
              {orderDetail?.Customer?.lastName}
            </p>
            <p>{orderDetail?.Customer?.address}</p>
            <p>
              {orderDetail?.Customer?.city}, {orderDetail?.Customer?.zipCode}
            </p>
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="col-md-12">
            <h4>Order Details</h4>
            <table className="invoice-table table">
              <thead className="table-head">
                <tr>
                  <th>Product Description</th>
                  {orderDetail.coPay && <th>Copay</th>}
                  <th>Rate</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Add your product rows here */}
                <tr>
                  <td>{orderDetail?.OrderDrug?.Drug?.name}</td>
                  {orderDetail.coPay && <td>{orderDetail?.coPay}</td>}
                  <td>
                    {"$"}
                    {orderDetail?.OrderDrug?.Drug?.price}
                  </td>
                  <td>{orderDetail?.quantity}</td>
                  <td>
                    {"$"}
                    {(
                      orderDetail?.OrderDrug?.Drug?.price *
                        orderDetail?.quantity
                    ).toFixed(2)}
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-9">
            {/* Empty column to push the content to the right */}
          </div>
          <div className="col-md-3 text-right">
            <p>
              Subtotal:
              <strong>
                {" "}
                {"$"}
                {subTotal}
              </strong>
            </p>
            <p>
              Shipping:
              <strong>
                {" "}
                {"$"}
                {orderDetail?.Shipping?.price}
              </strong>
            </p>
            <hr />
            <p>
              Total:
              <strong>
                {" "}
                {"$"}
                {parseFloat(subTotal) +
                  parseFloat(
                    orderDetail?.Shipping?.price + orderDetail?.coPay || 0
                  )}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderView;
