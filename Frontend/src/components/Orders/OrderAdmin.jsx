import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { getIn, useFormik } from "formik";
import { useParams, useHistory } from "react-router-dom";
import Toast from "../Toast";
import ToastContainerWrapper from "../ToastContainerWrapper";
import {
  updateShipping,
  fetchOrderDetails,
  getPrerequisite,
} from "../../redux/orders/actions/OrderActions";
import { API_BASE_URL } from "../../config";
import axios from "axios";

const OrderAdmin = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const history = useHistory();

  const portal = location.pathname.split("/").includes("partner")
    ? "partner"
    : "admin";

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
    dispatch(getPrerequisite());
  }, []);
  const { order: orderDetail } = useSelector(
    (state) => state.orders.orderDetail
  );
  const orderPrequesite = useSelector((state) => state.orders.orderPrequesite);
  const [coPayValue, setCoPayValue] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState(0);

  console.log("orderDetail", orderDetail);

  let initialValues = {
    notes: orderDetail && orderDetail.notes,
    statusId: orderDetail && orderDetail.statusId,
    customerId: orderDetail && orderDetail.Customer?.id,
    trackingId: orderDetail && orderDetail.trackingId || "",
    sigId: orderDetail && orderDetail.Sig?.id,
    drugId:
      orderDetail &&
      orderDetail.OrderDrug &&
      orderDetail.OrderDrug.Drug &&
      orderDetail?.OrderDrug?.Drug?.id,
    relatedId: orderDetail && orderDetail.relatedId,
    shippingMethod: orderDetail && orderDetail.Shipping?.id,
    shippedAt: orderDetail && orderDetail.shippedAt || "",
  };

  const getStyles = (errors, fieldName, errorMessage = {}) => {
    if (
      typeof errors !== "undefined" &&
      Object.keys(errors).length == 0 &&
      errorMessage !== null
    ) {
      errors = { ...errorMessage };
    }
    if (getIn(errors, fieldName)) {
      return {
        border: "1px solid red",
      };
    }
  };

  let [errors, setErrors] = React.useState();
  const { errorMessage } = useSelector((state) => state.user);
  const [physicianStates, setPhysicianStates] = useState([]);

  const path = "/app/admin/orders";
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,

    onSubmit: async (values) => {
      const validationSchema = Joi.object({
        notes: Joi.string().required().messages({
          "string.base": "Notes should be a string.",
          "string.empty": "Notes are not allowed to be empty.",
          "any.required": "Notes are required.",
        }),
        statusId: Joi.number().integer().required().messages({
          "any.required": "Status is required.",
        }),
        customerId: Joi.number().integer().required().messages({
          "any.required": "Customer Id is required.",
        }),
        trackingId: Joi.number().integer().allow('').optional().messages({
          "any.required": "Tracking Id is required.",
        }),
        drugId: Joi.number().integer().required().messages({
          "any.required": "Drug Id is required.",
        }),
        sigId: Joi.number().integer().required().messages({
          "any.required": "Sig Id is required.",
        }),
        relatedId: Joi.number().integer().optional().allow(null).messages({
          "any.required": "Related Id is required.",
        }),
        shippingMethod: Joi.number().integer().required().messages({
          "any.required": "Shipping Method is required.",
        }),
        shippedAt: Joi.date().allow('').optional().messages({
          "any.required": "Shipping Method is required.",
        }),
      }).options({ abortEarly: false });

      const { error } = validationSchema.validate(values);
      const {
        notes,
        statusId,
        trackingId,
        customerId,
        sigId,
        drugId,
        relatedId,
        shippingMethod,
        shippedAt,
      } = values;

      const validationErrors = {};
      if (error) {
        error.details.forEach((detail) => {
          validationErrors[detail.path[0]] = detail.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({});
        try {
          await dispatch(
            updateShipping(
              id,
              null,
              {
                notes,
                statusId,
                trackingId,
                customerId,
                sigId,
                drugId,
                relatedId,
                shippingMethod,
                price: orderDetail.OrderDrug?.Drug?.price,
                totalAmount: orderDetail?.totalAmount,
                coPay: coPayValue,
                quantity: orderQuantity,
                shippedAt,
              },
              portal
            )
          );
          history.push("/app/admin/orders");
        } catch (e) {
          console.error(e);
        }
        // Call your asynchronous function
        // updateOrder();
        // Toast({ type: "success", message: "Order updated successfully" });
      }
    },
  });

  const createdAt = orderDetail?.Partner?.createdAt
    ? new Date(orderDetail.Partner.createdAt)
    : null;

  let day;
  let month;
  let year;

  if (createdAt !== null) {
    day = createdAt.getDate();
    month = createdAt.getMonth() + 1;
    year = createdAt.getFullYear();
  } else {
    day = "";
    month = "";
    year = "";
  }

  const formattedDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
  const subTotal = (
    orderDetail?.OrderDrug?.Drug?.price * orderDetail?.quantity
  ).toFixed(2);

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = API_BASE_URL;

    // Make the API call using Axios
    axios
      .get(`${apiUrl}/imi`)
      .then((response) => {
        setPhysicianStates(response.data.response.states);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setCoPayValue(orderDetail?.coPay);
    setOrderQuantity(orderDetail?.quantity);
  }, [orderDetail]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="invoice-div mt-5 ">
          <div className="detail-header row">
            <div className="invoice-header col-md-3 d-flex justify-content-between">
              <p>Order ID: {orderDetail?.id}</p>
            </div>
            <div className="invoice-header col-md-3 d-flex justify-content-between">
              <p>{formattedDate}</p>
            </div>
            <div className="invoice-header col-md-3 ">
              Status: <strong>{orderDetail?.OrderStatus?.name}</strong>
            </div>
            <div className="invoice-header col-md-3 d-flex justify-content-between">
              <button
                type="submit"
                className=" btn btn-info"
                //   onClick={handleFilterApply}
              >
                Update Order
              </button>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-3">
              <strong>From:</strong>
              {/* <p>Your Company Name</p> */}
              <div className="partner-details">
                <strong>{orderDetail?.Partner?.name}</strong>
                <br />
                <p>{orderDetail?.Partner?.address}</p>
                <p>
                  {orderDetail?.Partner?.city}
                  {", "}
                  {orderDetail?.Partner?.zipCode}
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <strong>Customer Information</strong>
              <div className="partner-details">
                <p>
                  {orderDetail?.Customer?.firstName}{" "}
                  {orderDetail?.Customer?.lastName}
                </p>
                <p>{orderDetail?.Customer?.phone}</p>
                <p>{orderDetail?.Customer?.email}</p>
              </div>
            </div>
            <div className="col-md-3">
              <strong>Ship To</strong>
              <div className="partner-details">
                <strong>
                  <p>{orderDetail?.shippingName}</p>
                </strong>
                <p>
                  {orderDetail?.shippingAppartment}
                  {","}
                  <br />
                  {orderDetail?.shippingCity}
                  {","}
                  <br />
                  {orderDetail?.shippingZipCode}
                </p>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <h5>Shipping Method</h5>
                <div className="controls">
                  <select
                    name="shippingMethod"
                    id="shippingMethod"
                    value={formik.values.shippingMethod}
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      if (!formik.errors.shippingMethod) {
                        if (errors?.shippingMethod) {
                          const { ...remainingErrors } = errors;
                          setErrors(remainingErrors);
                        }
                      }
                    }}
                    style={getStyles(errors, "shippingMethod", errorMessage)}
                    className="form-select"
                  >
                    <option>Select a value</option>
                    <option
                      value={orderDetail?.Shipping?.id}
                      key={orderDetail?.Shipping?.id}
                    >
                      {orderDetail?.Shipping?.type}
                    </option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <h5>
                  Status <span className="text-danger">*</span>
                </h5>
                <div className="controls">
                  <select
                    name="statusId"
                    id="statusId"
                    value={formik.values.statusId}
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      if (!formik.errors.statusId) {
                        if (errors?.statusId) {
                          const { ...remainingErrors } = errors;
                          setErrors(remainingErrors);
                        }
                      }
                    }}
                    style={getStyles(errors, "statusId", errorMessage)}
                    className="form-select"
                  >
                    <option disabled>Select Order Status</option>
                    {orderPrequesite &&
                      orderPrequesite.order_status &&
                      orderPrequesite.order_status &&
                      orderPrequesite.order_status.map((st) => (
                        <option value={st.id} key={st.id}>
                          {st.name}
                        </option>
                      ))}
                  </select>
                  {errors?.statusId && (
                    <p className="invalid">{errors.statusId}</p>
                  )}
                </div>
                <div className="form-group mt-3">
                  <h5>Shipped At</h5>
                  <div className="controls">
                    <input
                      type="date"
                      className="form-control"
                      name="shippedAt"
                      value={formik.values.shippedAt}
                      onChange={(e) => {
                        formik.handleChange(e);
                        formik.handleBlur(e);
                        if (!formik.errors.shippedAt && errors?.shippedAt) {
                          const { name, ...remainingErrors } = errors;
                          setErrors(remainingErrors);
                        }
                      }}
                      style={getStyles(errors, "shippedAt", errorMessage)}
                      data-validation-required-message="This field is required"
                    />
                    {errors?.shippedAt && (
                      <p className="invalid">{errors.shippedAt}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {orderDetail?.physicianName !== "" &&
              orderDetail?.physicianName !== null && (
                <div className="col-md-3">
                  <strong>Physician Information</strong>
                  <p>{orderDetail?.physicianName}</p>
                  <p>{orderDetail?.physicianPhone}</p>
                  <p>
                    {physicianStates.map(
                      (x) =>
                        x.id == orderDetail.physicianStateId && (
                          <span key={x.id}>{x.name}</span>
                        )
                    )}
                  </p>
                  <p>{orderDetail?.physicianCity}</p>
                </div>
              )}
          </div>
          <hr />
          <div className="row mt-4">
            {/* <div className="col-6">
              <div className="form-group">
                <h5>
                  Order Notes
                  <span className="text-danger">*</span>
                </h5>
                <div className="controls">
                  <input
                    type="text"
                    name="notes"
                    className="form-control"
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      if (!formik.errors.notes) {
                        if (errors?.notes) {
                          const { ...remainingErrors } = errors;
                          setErrors(remainingErrors);
                        }
                      }
                    }}
                    style={getStyles(errors, "notes", errorMessage)}
                    data-validation-required-message="This field is required"
                  />
                  {errors?.notes && <p className="invalid">{errors.notes}</p>}
                </div>
              </div>
            </div> */}
            <div className="col-6">
              <div className="form-group">
                <h5>
                  Order Tracking
                  <span className="text-danger">*</span>
                </h5>
                <div className="controls">
                  <input
                    type="text"
                    name="trackingId"
                    className="form-control"
                    value={formik.values.trackingId}
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      if (!formik.errors.trackingId) {
                        if (errors?.trackingId) {
                          const { ...remainingErrors } = errors;
                          setErrors(remainingErrors);
                        }
                      }
                    }}
                    style={getStyles(errors, "trackingId", errorMessage)}
                    data-validation-required-message="This field is required"
                  />
                  {errors?.trackingId && (
                    <p className="invalid">{errors.trackingId}</p>
                  )}
                </div>
              </div>
              {/* <div className="form-group">
                <h5>Order Tracking</h5>
                <div className="controls">
                  <input type="text" name="quantity" className="form-control" />
                </div>
              </div> */}
            </div>
            <div className="col-6">
              <div className="form-group">
                <h5>
                  Related Order ID
                  {/* <span className="text-danger">*</span> */}
                </h5>
                <div className="controls">
                  <input
                    type="text"
                    name="relatedId"
                    className="form-control"
                    value={formik.values.relatedId}
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      if (!formik.errors.relatedId) {
                        if (errors?.relatedId) {
                          const { ...remainingErrors } = errors;
                          setErrors(remainingErrors);
                        }
                      }
                    }}
                    style={getStyles(errors, "relatedId", errorMessage)}
                    data-validation-required-message="This field is required"
                  />
                  {errors?.relatedId && (
                    <p className="invalid">{errors.relatedId}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-4">
            <div className="col-md-12">
              <h4>Order Details</h4>
              <table className="invoice-table table">
                <thead className="table-head">
                  <tr>
                    <th>Drug ID</th>
                    {orderDetail?.physicianName !== "" &&
                      orderDetail?.physicianName !== null && <th>Co Pay</th>}
                    <th>Drug Name</th>
                    <th>Dosage</th>
                    <th>ERX Required</th>
                    <th>is Refill</th>
                    <th>Brand Shipping</th>
                    <th>Unit Cost</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Add your product rows here */}
                  <tr>
                    <td>{orderDetail?.OrderDrug?.Drug?.id}</td>
                    {orderDetail?.physicianName !== "" &&
                      orderDetail?.physicianName !== null && (
                        <td>
                          <input
                            type="number"
                            value={coPayValue}
                            onChange={(e) => setCoPayValue(e.target.value)}
                            className="copay_input_order"
                          />
                        </td>
                      )}
                    <td>{orderDetail?.OrderDrug?.Drug?.name}</td>
                    <td>{orderDetail?.OrderDrug?.Drug?.dosage}</td>
                    <td>{orderDetail?.erxRequired ? <p>Yes</p> : <p>No</p>}</td>
                    <td>{orderDetail?.isLive ? <p>Yes</p> : <p>No</p>}</td>
                    <td>
                      {orderDetail?.Partner?.brandBox ? <p>Yes</p> : <p>No</p>}
                    </td>
                    <td>{orderDetail?.OrderDrug?.Drug?.price}</td>

                    <td>
                        <input
                          type="number"
                          value={orderQuantity}
                          onChange={(e) => setOrderQuantity(e.target.value)}
                          className="copay_input_order"
                          disabled={orderDetail?.physicianName == "" || orderDetail?.physicianName !== null}
                        />
                        {console.log(orderDetail?.physicianName == "" || orderDetail?.physicianName !== null)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              {/* Empty column to push the content to the right */}
            </div>
            <div className="col-md-3 text-right">
              <h5>Notes</h5>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.notes) {
                    if (errors?.notes) {
                      const { ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
                  }
                }}
                style={getStyles(errors, "notes", errorMessage)}
                data-validation-required-message="This field is required"
              ></textarea>
              {errors?.notes && <p className="invalid">{errors.notes}</p>}
            </div>
            <div className="col-md-3 text-right">
              <p>
                Subtotal:
                <strong>
                  {" "}
                  $
                  {(
                    orderDetail?.OrderDrug?.Drug?.price * orderDetail?.quantity
                  ).toFixed(2)}
                </strong>
              </p>
              <hr />
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
                Taxes:<strong> $00.00</strong>
              </p>
              <hr />
              <p>
                Total:
                <strong>
                  {" "}
                  {"$"}
                  {(parseInt(coPayValue || 0) + parseInt(subTotal)) +
                    parseInt(orderDetail?.Shipping?.price || 0)}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </form>
      <ToastContainerWrapper />
    </>
  );
};

export default OrderAdmin;
