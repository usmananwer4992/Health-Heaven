import React, { useEffect } from "react";
import Joi from "joi";
import { getIn, useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationDialog from "../ConfirmationDialog";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  createOrders,
  updateOrders,
  fetchOrderDetails,
} from "../../redux/orders/actions/OrderActions";
import { fetchDrugs } from "../../redux/drugs/actions/drugsActions";
import { getCustomerAction } from "../../redux/customer.slice";
import {
  fetchStates,
  fetchShippings,
} from "../../redux/partner/partnerActions";
import { fetchSigs } from "../../redux/sigs/actions/sigsAction";
const OrdersForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  React.useEffect(() => {
    if (typeof id !== "undefined") {
      dispatch(fetchOrderDetails(id));
    }
  }, [dispatch]);

  const drugs = useSelector((state) => state.drugs.drugs);
  const user = useSelector((state) => state.user.user);
  // const currenntoa
  const { shippings, states } = useSelector(
    (state) => state.partners
  );
  const customers = useSelector((state) => state.customer.customers);
  const sigs = useSelector((state) => state.sigs.sigs);
  const portal ="partner";

  useEffect(() => {
    dispatch(fetchDrugs());
    dispatch(getCustomerAction("partner"));
    dispatch(fetchStates());
    dispatch(fetchSigs());
    dispatch(fetchShippings(portal));
  }, []);
  //   const orderDetail = useSelector((state) => state.orders.orderDetail);
  let orderDetail;
  let initialValues = {};
  if (typeof id !== "undefined") {
    initialValues = {
      isLive: orderDetail && orderDetail.isLive,
      customerId: orderDetail && orderDetail.customerId,
      drugId: orderDetail && orderDetail.drugId,
      isRefill: orderDetail && orderDetail.isRefill,
      shippingId: orderDetail && orderDetail.shippingId,
      shippingName: orderDetail && orderDetail.shippingName,
      shippingAddress: orderDetail && orderDetail.shippingAddress,
      shippingCity: orderDetail && orderDetail.shippingCity,
      shippingStateId: orderDetail && orderDetail.shippingStateId,
      shippingZipCode: orderDetail && orderDetail.shippingZipCode,
      notes: orderDetail && orderDetail.notes,
      quantity: orderDetail && orderDetail.quantity,
      partnerId: orderDetail && orderDetail.partnerId,
      preName: orderDetail && orderDetail.preName,
      prePhone: orderDetail && orderDetail.prePhone,
      preAddress: orderDetail && orderDetail.preAddress,
      preNpiNumber: orderDetail && orderDetail.preNpiNumber,
      preSupervisior: orderDetail && orderDetail.preSupervisior,
      daySupply: orderDetail && orderDetail.daySupply,
      refills: orderDetail && orderDetail.refills,
      pre_state: orderDetail && orderDetail.pre_state,
      // invoice_link: orderDetail && orderDetail.invoice_link,
      activation_code: orderDetail && orderDetail.activation_code,
      statusId: orderDetail && orderDetail.statusId,
      sigId: orderDetail && orderDetail.sigId,
    };
  } else {
    initialValues = {
      isLive: false,
      customerId: "",
      drugId: "",
      isRefill: false,
      shippingId: "",
      shippingName: null,
      shippingAddress: "",
      shippingCity: null,
      shippingStateId: "",
      shippingZipCode: null,
      notes: null,
      quantity: null,
      partnerId: user.partner.id,
      preName: null,
      prePhone: null,
      preAddress: null,
      preNpiNumber: null,
      preSupervisior: null,
      daySupply: null,
      refills: null,
      pre_state: null,
      // invoice_link: null,
      activation_code: null,
      statusId: "1",
      sigId: "",
    };
  }

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

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,

    onSubmit: (values) => {
      const validationSchema = Joi.object({
        isLive: Joi.boolean().required().messages({
          "boolean.base": '"Is Live" must be a boolean value (true or false)',
          "any.required": '"Is Live" is required',
        }),
        customerId: Joi.number().integer().required().messages({
          "any.required": "Customer is required.",
        }),
        drugId: Joi.number().integer().required().messages({
          "any.required": "Order Drug is required.",
        }),
        isRefill: Joi.boolean().required().messages({
          "boolean.base":
            '"Refillable" must be a boolean value (true or false)',
          "any.required": '"Refillable" is required',
        }),
        shippingId: Joi.number().integer().required().messages({
          "any.required": "Shipping is required.",
        }),
        shippingName: Joi.string().required().messages({
          "string.base": "Shipping Name should be a string.",
          "string.empty": "Shipping is not allowed to be empty.",
          "any.required": "Shipping is required.",
        }),
        shippingAddress: Joi.string().required().messages({
          "string.base": "Shipping Address should be a string.",
          "string.empty": "Shipping Address is not allowed to be empty.",
          "any.required": "Shipping Address is required.",
        }),
        shippingCity: Joi.string().required().messages({
          "string.base": "Shipping City should be a string.",
          "string.empty": "Shipping City is not allowed to be empty.",
          "any.required": "Shipping City is required.",
        }),
        shippingStateId: Joi.number().integer().required().messages({
          "any.required": "Shipping State is required.",
        }),
        shippingZipCode: Joi.string().required().messages({
          "string.base": "Shipping Zip Code should be a string.",
          "string.empty": "Shipping Zip Code is not allowed to be empty.",
          "any.required": "Shipping Zip Code is required.",
        }),
        notes: Joi.string().required().messages({
          "string.base": "Notes should be a string.",
          "string.empty": "Notes are not allowed to be empty.",
          "any.required": "Notes are required.",
        }),
        quantity: Joi.string().required().messages({
          "string.base": "Quantity should be a string.",
          "string.empty": "Quantity is not allowed to be empty.",
          "any.required": "Quantity is required.",
        }),
        partnerId: Joi.number().integer().required().messages({
          "any.required": "Partner is required.",
        }),
        preName: Joi.string().required().messages({
          "string.base": "Prescriber Name should be a string.",
          "string.empty": "Prescriber Name is not allowed to be empty.",
          "any.required": "Prescriber Name is required.",
        }),
        prePhone: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .required()
          .messages({
            "string.length": "Prescriber Phone must be exactly 10 dig.",
            "string.pattern.base":
              "Prescriber Phone number can only contain digits (0-9).",
            "string.empty": "Prescriber Phone is not allowed to be empty.",
            "any.required": "Prescriber Phone is required.",
          }),
        preAddress: Joi.string().required().messages({
          "string.base": "Prescriber Address should be a string.",
          "string.empty": "Prescriber Address is not allowed to be empty.",
          "any.required": "Prescriber Address is required.",
        }),
        preNpiNumber: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .required()
          .messages({
            "string.length": "Prescriber NPI Number must be exactly 10 dig.",
            "string.pattern.base":
              "Prescriber NPI Number can only contain digits (0-9).",
            "string.empty": "Prescriber NPI Number is not allowed to be empty.",
            "any.required": "Prescriber NPI Number is required.",
          }),
        preSupervisior: Joi.string().required().messages({
          "string.base": "Prescriber Supervisior should be a string.",
          "string.empty": "Prescriber Supervisior is not allowed to be empty.",
          "any.required": "Prescriber Supervisior is required.",
        }),
        daySupply: Joi.number().integer().required().messages({
          "number.base": '"Day Supply" must be a number',
          "number.integer": '"Day Supply" must be an integer',
          "any.required": '"Day Supply" is required',
        }),
        refills: Joi.number().integer().required().messages({
          "number.base": '"Refills" must be a number',
          "number.integer": '"Refills" must be an integer',
          "any.required": '"Refills" is required',
        }),
        pre_state: Joi.string().required().messages({
          "string.base": "Prescriber State should be a string.",
          "string.empty": "Prescriber State is not allowed to be empty.",
          "any.required": "Prescriber State is required.",
        }),
        // invoice_link: Joi.string().required().messages({
        //   "string.base": "Invoice Link should be a string.",
        //   "string.empty": "Invoice Link is not allowed to be empty.",
        //   "any.required": "Invoice Link is required.",
        // }),
        activation_code: Joi.string().required().messages({
          "string.base": "Activation Code should be a string.",
          "string.empty": "Activation Code is not allowed to be empty.",
          "any.required": "Activation Code is required.",
        }),
        statusId: Joi.number().integer().required().messages({
          "any.required": "Status is required.",
        }),
        sigId: Joi.number().integer().required().messages({
          "any.required": "Sig is required.",
        }),
      }).options({ abortEarly: false });

      const { error } = validationSchema.validate(values);
      const {
        isLive,
        customerId,
        drugId,
        isRefill,
        shippingId,
        shippingName,
        shippingAddress,
        shippingCity,
        shippingStateId,
        shippingZipCode,
        notes,
        quantity,
        preName,
        prePhone,
        preAddress,
        preNpiNumber,
        preSupervisior,
        daySupply,
        refills,
        pre_state,
        // invoice_link,
        activation_code,
        statusId,
        sigId,
      } = values;

      console.log(values, "-------");
      const validationErrors = {};
      if (error) {
        error.details.forEach((detail) => {
          validationErrors[detail.path[0]] = detail.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({});
        // if (id) {
        //   dispatch(
        //     updateOrders(
        //       id,
        //       {
        //         isLive,
        //         customerId,
        //         drugId,
        //         isRefill,
        //         shippingId,
        //         shippingName,
        //         shippingAddress,
        //         shippingCity,
        //         shippingStateId,
        //         shippingZipCode,
        //         notes,
        //         quantity,
        //         preName,
        //         prePhone,
        //         preAddress,
        //         preNpiNumber,
        //         preSupervisior,
        //         daySupply,
        //         refills,
        //         pre_state,
        //         // invoice_link,
        //         activation_code,
        //         statusId,
        //         sigId,
        //       },
        //       history.push(`/app/${portal}/orders`)
        //     )
        //   );
        // } else {
        //   dispatch(
        //     createOrders(
        //       {
        //         isLive,
        //         customerId,
        //         drugId,
        //         isRefill,
        //         shippingId,
        //         shippingName,
        //         shippingAddress,
        //         shippingCity,
        //         shippingStateId,
        //         shippingZipCode,
        //         notes,
        //         quantity,
        //         preName,
        //         prePhone,
        //         preAddress,
        //         preNpiNumber,
        //         preSupervisior,
        //         daySupply,
        //         refills,
        //         pre_state,
        //         // invoice_link,
        //         activation_code,
        //         statusId,
        //         sigId,
        //       },
        //       history.push(`/app/${portal}/orders`)
        //     )
        //   );
        // }
      }
    },
  });

  // const redirectToSuccessPage = (url) => {
  //   // Redirect to the specified URL
  //   history.push(url);
  // };
  // console.log('redirectToSuccessPage', redirectToSuccessPage)

  return (
    <div className="container-full">
      <div className="content-header">
        <div className="d-flex align-items-center">
          <div className="me-auto">
            <h4 className="page-title">Create New Order</h4>

            <div className="d-inline-block align-items-center">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={`/app/${portal}/dashboard`}>
                      <i className="mdi mdi-home-outline"></i>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link to={`/app/${portal}/orders`}>Orders</Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="box">
          <div className="box-header with-border">
            <h4 className="box-title">Order Details</h4>
          </div>
          <div className="box-body">
            <div className="row">
              <div className="col">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          IsLive
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="isLive"
                              id="isLiveYes"
                              value="true"
                              checked={
                                formik.values.isLive === "true" ||
                                formik.values.isLive === true
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="isLiveYes"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="isLive"
                              id="isLiveNo"
                              value="false"
                              checked={
                                formik.values.isLive === "false" ||
                                formik.values.isLive === false
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="isLiveNo"
                            >
                              No
                            </label>
                          </div>
                          {errors?.isLive && (
                            <p className="invalid">{errors.isLive}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Is Refill
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="isRefill"
                              id="isRefillYes"
                              value="true"
                              checked={
                                formik.values.isRefill === "true" ||
                                formik.values.isRefill === true
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="isRefillYes"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="isRefill"
                              id="isRefillNo"
                              value="false"
                              checked={
                                formik.values.isRefill === "false" ||
                                formik.values.isRefill === false
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="isRefillNo"
                            >
                              No
                            </label>
                          </div>
                          {errors?.isRefill && (
                            <p className="invalid">{errors.isRefill}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Customer <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="customerId"
                            id="customerId"
                            value={formik.values.customerId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.customerId) {
                                if (errors?.customerId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "customerId",
                              errorMessage
                            )}
                            className="form-select"
                          >
                            <option>Select Customer</option>
                            {customers &&
                              customers.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.firstName + " " + st.lastName}
                                </option>
                              ))}
                          </select>
                          {errors?.customerId && (
                            <p className="invalid">{errors.customerId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Order Drug <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="drugId"
                            id="drugId"
                            value={formik.values.orderDrugId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.drugId) {
                                if (errors?.drugId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "drugId", errorMessage)}
                            className="form-select"
                          >
                            <option>Select Drug</option>
                            {drugs &&
                              drugs.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.name}
                                </option>
                              ))}
                          </select>
                          {errors?.drugId && (
                            <p className="invalid">{errors.drugId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Quantity
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="quantity"
                            className="form-control"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.quantity) {
                                if (errors?.quantity) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "quantity", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.quantity && (
                            <p className="invalid">{errors.quantity}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Sig <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="sigId"
                            id="sigId"
                            value={formik.values.sigId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.sigId) {
                                if (errors?.sigId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "sigId", errorMessage)}
                            className="form-select"
                          >
                            <option>Select Sigs</option>
                            {sigs &&
                              sigs.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.name}
                                </option>
                              ))}
                          </select>
                          {errors?.sigId && (
                            <p className="invalid">{errors.sigId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Notes
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
                          {errors?.notes && (
                            <p className="invalid">{errors.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Day Supply
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="daySupply"
                            className="form-control"
                            value={formik.values.daySupply}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.daySupply) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "daySupply", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.daySupply && (
                            <p className="invalid">{errors.daySupply}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Refills
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="number"
                            name="refills"
                            className="form-control"
                            value={formik.values.refills}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.refills) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "refills", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.refills && (
                            <p className="invalid">{errors.refills}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* invoice link is generated from the backend */}
                    {/* <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Invoice Link
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="invoice_link"
                            className="form-control"
                            value={formik.values.invoice_link}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.invoice_link) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "invoice_link",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.invoice_link && (
                            <p className="invalid">{errors.invoice_link}</p>
                          )}
                        </div>
                      </div>
                    </div> */}
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Activation Code
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="activation_code"
                            className="form-control"
                            value={formik.values.activation_code}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.activation_code) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "activation_code",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.activation_code && (
                            <p className="invalid">{errors.activation_code}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="box-header with-border mb-20">
                      <h4 className="box-title">Prescriber Mapping</h4>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Prescriber Name
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="preName"
                            className="form-control"
                            value={formik.values.preName}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.preName) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "preName", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.preName && (
                            <p className="invalid">{errors.preName}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Prescriber Phone
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="prePhone"
                            className="form-control"
                            value={formik.values.prePhone}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.prePhone) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "prePhone", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.prePhone && (
                            <p className="invalid">{errors.prePhone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Prescriber Address
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="preAddress"
                            className="form-control"
                            value={formik.values.preAddress}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.preAddress) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "preAddress",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.preAddress && (
                            <p className="invalid">{errors.preAddress}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Prescriber NPI number
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="preNpiNumber"
                            className="form-control"
                            value={formik.values.preNpiNumber}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.preNpiNumber) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "preNpiNumber",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.preNpiNumber && (
                            <p className="invalid">{errors.preNpiNumber}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Prescriber Supervisor
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="preSupervisior"
                            className="form-control"
                            value={formik.values.preSupervisior}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.preSupervisior) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "preSupervisior",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.preSupervisior && (
                            <p className="invalid">{errors.preSupervisior}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Prescriber State
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="pre_state"
                            className="form-control"
                            value={formik.values.pre_state}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.pre_state) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "pre_state", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.pre_state && (
                            <p className="invalid">{errors.pre_state}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="box-header with-border mb-20">
                      <h4 className="box-title">Shipping Mapping</h4>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Shippings <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="shippingId"
                            id="shippingId"
                            value={formik.values.shippingId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.shippingId) {
                                if (errors?.shippingId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "shippingId",
                              errorMessage
                            )}
                            className="form-select"
                          >
                            <option>Select Shippings</option>
                            {shippings &&
                              shippings.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.shippingCompany}
                                </option>
                              ))}
                          </select>
                          {errors?.shippingId && (
                            <p className="invalid">{errors.shippingId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Order Drug <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="orderDrugId"
                            id="orderDrugId"
                            value={formik.values.orderDrugId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.orderDrugId) {
                                if (errors?.orderDrugId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "orderDrugId",
                              errorMessage
                            )}
                            className="form-select"
                          >
                            <option>Select Drug Category</option>
                            {drugCategorys &&
                              drugCategorys.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.name}
                                </option>
                              ))}
                          </select>
                          {errors?.orderDrugId && (
                            <p className="invalid">{errors.orderDrugId}</p>
                          )}
                        </div>
                      </div>
                    </div> */}
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Shipping State <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="shippingStateId"
                            id="shippingStateId"
                            value={formik.values.shippingStateId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.shippingStateId) {
                                if (errors?.shippingStateId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "shippingStateId",
                              errorMessage
                            )}
                            className="form-select"
                          >
                            <option>Select Shippings State</option>
                            {states &&
                              states.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.name}
                                </option>
                              ))}
                          </select>
                          {errors?.shippingStateId && (
                            <p className="invalid">{errors.shippingStateId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Shipping Name
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="shippingName"
                            className="form-control"
                            value={formik.values.shippingName}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.shippingName) {
                                if (errors?.shippingName) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "shippingName",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.shippingName && (
                            <p className="invalid">{errors.shippingName}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Shipping Address
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="shippingAddress"
                            className="form-control"
                            value={formik.values.shippingAddress}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.shippingAddress) {
                                if (errors?.shippingAddress) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "shippingAddress",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.shippingAddress && (
                            <p className="invalid">{errors.shippingAddress}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Shipping Zip Code
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="shippingZipCode"
                            className="form-control"
                            value={formik.values.shippingZipCode}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.shippingZipCode) {
                                if (errors?.shippingZipCode) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "shippingZipCode",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.shippingZipCode && (
                            <p className="invalid">{errors.shippingZipCode}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Shipping City
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="shippingCity"
                            className="form-control"
                            value={formik.values.shippingCity}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.shippingCity) {
                                if (errors?.shippingCity) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "shippingCity",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.shippingCity && (
                            <p className="invalid">{errors.shippingCity}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs-right">
                    <button type="submit" className="btn btn-info">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default OrdersForm;
