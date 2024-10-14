import React, { useEffect } from "react";
import Joi from "joi";
import { getIn, useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  createOrders,
  getPrerequisite,
} from "../../redux/orders/actions/OrderActions";
import { fetchDrugs } from "../../redux/drugs/actions/drugsActions";
import { getCustomerAction } from "../../redux/customer.slice";
import {
  fetchStates,
  fetchPartners,
  fetchShippings,
} from "../../redux/partner/partnerActions";
import { fetchSigs } from "../../redux/sigs/actions/sigsAction";
import Tabs from "./OrderTabs";
const OrdersForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [availableShippings, setAvailableShippings] = React.useState([]);

  useEffect(() => {
    dispatch(getPrerequisite());
    dispatch(fetchDrugs());
    // dispatch(getCustomerAction("admin"));
    dispatch(fetchStates());
    dispatch(fetchPartners());
    // dispatch(fetchSigs());
    dispatch(fetchShippings("admin"));
  }, []);
  // const drugs = useSelector((state) => state.drugs.drugs);
  const { shippings, states, partners } = useSelector(
    (state) => state.partners
  );

  console.log("partners", partners);

  console.log("shippings", shippings);

  const user = useSelector((state) => state.user);

  const customers = useSelector((state) => state.customer.customers);
  // const sigs = useSelector((state) => state.sigs.sigs);
  const orderPrequesite = useSelector((state) => state.orders.orderPrequesite);

  console.log("orderPrequesite", orderPrequesite);

  const { order: orderDetail } = useSelector(
    (state) => state.orders.orderDetail
  );

  const initialValues = {
    isLive: import.meta.env.NODE_ENV === 'production' ? true:false,
    erxRequired: true,
    customerId: 0,
    drugId: "",
    isRefill: false,
    shippingId: "",
    type: null,
    shippingCompany: "",
    // shippingCity: null,
    shippingStateId: 0,
    price: null,
    notes: null,
    quantity: null,
    partnerId: "",
    // preName: null,
    // prePhone: null,
    // preAddress: null,
    // preNpiNumber: null,
    // preSupervisior: null,
    daySupply: null,
    refills: null,
    // pre_state: null,
    // invoice_link: null,
    // activation_code: null,
    statusId: "1",
    sigId: "",
    shippingName: "",
    shippingAppartment: "",
    shippingStreet: "",
    shippingCity: "",
    shippingZipCode: "",
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

  const path = "/app/admin/orders";
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,

    onSubmit: (values) => {
      const validationSchema = Joi.object({
        isLive: Joi.boolean().required().messages({
          "boolean.base": '"Is Live" must be a boolean value (true or false)',
          "any.required": '"Is Live" is required',
        }),
        erxRequired: Joi.boolean().required().messages({
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
        shippingId: Joi.number().integer().allow(null, "").default(null).optional(),
        type: Joi.string().allow("", null),
        shippingCompany: Joi.string().allow("", null),
        // shippingCity: Joi.string().allow('', null),
        shippingStateId: Joi.number().allow("", null),
        price: Joi.string().allow("", null),
        notes: Joi.string().allow("", null).optional().messages({
          "string.base": "Notes should be a string.",
          "string.empty": "Notes are not allowed to be empty.",
        }),
        quantity: Joi.string().required().messages({
          "string.base": "Quantity should be a string.",
          "string.empty": "Quantity is not allowed to be empty.",
          "any.required": "Quantity is required.",
        }),
        partnerId: Joi.string().required().messages({
          "any.required": "Partner is required.",
        }),
        daySupply: Joi.number().integer().optional().allow(null).messages({
          "any.required": "Day Supply is required.", 
        }),
        refills: Joi.number().integer().optional().allow(null).messages({
          "any.required": "Refills is required.", 
        }),
        statusId: Joi.number().integer().required().messages({
          "any.required": "Status is required.",
        }),
        sigId: Joi.number().integer().required().messages({
          "any.required": "Sig is required.",
        }),
        shippingName: Joi.string().required().messages({
          "string.base": "Name should be a string.",
          "string.empty": "Name is not allowed to be empty.",
          "any.required": "Name is required.",
        }),
        shippingAppartment: Joi.string().required().messages({
          "string.base": "Apartment/Building should be a string.",
          "string.empty": "Apartment/Building is not allowed to be empty.",
          "any.required": "Apartment/Building is required.",
        }),
        shippingStreet: Joi.string().required().messages({
          "string.base": "Street should be a string.",
          "string.empty": "Street is not allowed to be empty.",
          "any.required": "Street is required.",
        }),
        shippingCity: Joi.string().required().messages({
          "string.base": "Shipping City should be a string.",
          "string.empty": "Shipping City is not allowed to be empty.",
          "any.required": "Shipping City is required.",
        }),
        shippingZipCode: Joi.number().integer().required().messages({
          "any.required": "Zip Code is required.",
        }),
      }).options({ abortEarly: false });

      const { error } = validationSchema.validate(values);
      const {
        isLive,
        erxRequired,
        customerId,
        drugId,
        isRefill,
        shippingId,
        type,
        shippingCompany,
        shippingStateId,
        price,
        notes,
        quantity,
        partnerId,
        daySupply,
        refills,
        statusId,
        sigId,
        shippingName,
        shippingAppartment,
        shippingStreet,
        shippingCity,
        shippingZipCode,
      } = values;

      console.log(values, "values");

      const validationErrors = {};
      if (error) {
        error.details.forEach((detail) => {
          validationErrors[detail.path[0]] = detail.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({});
        dispatch(
          createOrders(
            {
              isLive,
              erxRequired,
              customerId,
              drugId,
              isRefill,
              shippingId,
              type,
              shippingCompany,
              shippingStateId,
              price,
              notes,
              quantity,
              partnerId,
              // userId: user?.user?.id,
              // preName,
              // prePhone,
              // preAddress,
              // preNpiNumber,
              // preSupervisior,
              daySupply,
              refills,
              // pre_state,
              // invoice_link,
              // activation_code,
              statusId,
              sigId,
              shippingName,
              shippingAppartment,
              shippingStreet,
              shippingCity,
              shippingZipCode,
            },
            history,
            path
          )
        );
      }
    },
  });


  const handlePartnerChange = (selectedPartnerId) => {
    if (selectedPartnerId === "0") {
      // If "Select Registered Pharmacy" is selected, reset values to empty strings
      formik.setValues({
        ...formik.values,
        partnerId: "",
        customerId: 0,
      });
    } else {
      const selectedCustomer = orderPrequesite.customers.find(
        (partner) => partner.id == selectedPartnerId
      );
      formik.setValues({
        ...formik.values,
        partnerId: String(selectedCustomer.partnerId),
        customerId: selectedCustomer.id,
      });
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      partnerId: null,
    }));
  };

  const filteredShippings = orderPrequesite.shippings.filter(
    (shipping) => 
      shipping.partnerId === formik.values.partnerId
    );

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
                    <Link to="/admin">
                      <i className="mdi mdi-home-outline"></i>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link to="/app/admin/orders">Orders</Link>
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
                    <div className="col-4">
                      <div className="form-group">
                        <h5>
                          IsLive
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              disabled={true}
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
                              disabled={true}
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

                    <div className="col-4">
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
                    <div className="col-4">
                      <div className="form-group">
                        <h5>
                          ERX Required
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="erxRequired"
                              id="isErxYes"
                              value="true"
                              checked={
                                formik.values.erxRequired === "true" ||
                                formik.values.erxRequired === true
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="isErxYes"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="erxRequired"
                              id="isErxNo"
                              value="false"
                              checked={
                                formik.values.erxRequired === "false" ||
                                formik.values.erxRequired === false
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="isErxNo"
                            >
                              No
                            </label>
                          </div>
                          {errors?.erxRequired && (
                            <p className="invalid">{errors.erxRequired}</p>
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
                            onChange={(e) => {
                              // Handle change and auto-populate patient info
                              formik.handleChange(e);
                              handlePartnerChange(e.target.value);
                            }}
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
                            <option value="0">Select Customer</option>
                            {orderPrequesite &&
                              orderPrequesite.customers &&
                              orderPrequesite.customers.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.firstName +
                                    " - " +
                                    st.lastName +
                                    " / " +
                                    st.email +
                                    " / " +
                                    st.Partner?.name}
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
                            {orderPrequesite &&
                              orderPrequesite.drugs &&
                              orderPrequesite.drugs.map((st) => (
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
                    {/* <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Partner <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="partnerId"
                            id="partnerId"
                            value={formik.values.partnerId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.partnerId) {
                                if (errors?.partnerId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "partnerId", errorMessage)}
                            className="form-select"
                          >
                            <option>Select Partners</option>
                            {partners &&
                              partners.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.name}
                                </option>
                              ))}
                          </select>
                          {errors?.partnerId && (
                            <p className="invalid">{errors.partnerId}</p>
                          )}
                        </div>
                      </div>
                    </div> */}
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Partner <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="partnerId"
                            id="partnerId"
                            value={formik.values.partnerId}
                            onChange={(e) => {
                              // handlePartnerChange(e.target.value);
                              formik.handleChange(e);

                             
                            }}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.partnerId) {
                                if (errors?.partnerId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "partnerId", errorMessage)}
                            className="form-select"
                            disabled
                          >
                            <option value="0">
                              Select Partners
                            </option>
                            {partners &&
                              partners.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.name}
                                </option>
                              ))}
                          </select>
                          {errors?.partnerId && (
                            <p className="invalid">{errors.partnerId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
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
                            {orderPrequesite &&
                              orderPrequesite.sigs &&
                              orderPrequesite.sigs.map((st) => (
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
                    {/* <div className="col-6">
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
                    </div> */}
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Day Supply
                          {/* <span className="text-danger">*</span> */}
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
                          {/* <span className="text-danger">*</span> */}
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

                    <div className="row">
                      <div className="box-header with-border mb-20">
                        <h4 className="box-title">
                          Enter Shipping Details{" "}
                          <span className="text-danger">*</span>
                        </h4>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <h5>
                            Name
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
                            Apartment/Building
                            <span className="text-danger">*</span>
                          </h5>

                          <div className="controls">
                            <input
                              type="text"
                              name="shippingAppartment"
                              className="form-control"
                              value={formik.values.shippingAppartment}
                              onChange={formik.handleChange}
                              onBlur={(e) => {
                                formik.handleBlur(e);
                                if (!formik.errors.shippingAppartment) {
                                  if (errors?.shippingAppartment) {
                                    const { ...remainingErrors } = errors;
                                    setErrors(remainingErrors);
                                  }
                                }
                              }}
                              style={getStyles(
                                errors,
                                "shippingAppartment",
                                errorMessage
                              )}
                              data-validation-required-message="This field is required"
                            />
                            {errors?.shippingAppartment && (
                              <p className="invalid">
                                {errors.shippingAppartment}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <h5>
                            Street/Locality
                            <span className="text-danger">*</span>
                          </h5>
                          <div className="controls">
                            <input
                              type="text"
                              name="shippingStreet"
                              className="form-control"
                              value={formik.values.shippingStreet}
                              onChange={formik.handleChange}
                              onBlur={(e) => {
                                formik.handleBlur(e);
                                if (!formik.errors.shippingStreet) {
                                  if (errors?.shippingStreet) {
                                    const { ...remainingErrors } = errors;
                                    setErrors(remainingErrors);
                                  }
                                }
                              }}
                              style={getStyles(
                                errors,
                                "shippingStreet",
                                errorMessage
                              )}
                              data-validation-required-message="This field is required"
                            />
                            {errors?.shippingStreet && (
                              <p className="invalid">{errors.shippingStreet}</p>
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
                                  if (errors?.name) {
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
                      <div className="col-6">
                        <div className="form-group">
                          <h5>
                            Shipping Zipcode
                            <span className="text-danger">*</span>
                          </h5>
                          <div className="controls">
                            <input
                              type="number"
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
                              <p className="invalid">
                                {errors.shippingZipCode}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <h5>
                            Notes
                            {/* <span className="text-danger">*</span> */}
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
                    </div>
                    <div className="box-header with-border mb-20">
                      <h4 className="box-title">Shipping Mapping</h4>
                    </div>
                    <Tabs
                      tabs={[
                        {
                          title: "Select Shipping",
                          content: (
                            <div className="col-6">
                              <div className="form-group">
                                <h5>Shippings</h5>
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
                                    {filteredShippings &&
                                      filteredShippings.map((st) => (
                                        <option value={st.id} key={st.id}>
                                          {st.shippingCompany}
                                        </option>
                                      ))}
                                  </select>
                                  {errors?.shippingId && (
                                    <p className="invalid">
                                      {errors.shippingId}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ),
                        },
                        {
                          title: "New Shipping",
                          content: (
                            <div className="row">
                              <div className="col-6">
                                <div className="form-group">
                                  <h5>Shipping Type</h5>
                                  <div className="controls">
                                    <input
                                      type="text"
                                      name="type"
                                      className="form-control"
                                      value={formik.values.type}
                                      onChange={formik.handleChange}
                                      onBlur={(e) => {
                                        formik.handleBlur(e);
                                        if (!formik.errors.type) {
                                          if (errors?.type) {
                                            const { ...remainingErrors } =
                                              errors;
                                            setErrors(remainingErrors);
                                          }
                                        }
                                      }}
                                      style={getStyles(
                                        errors,
                                        "type",
                                        errorMessage
                                      )}
                                      data-validation-required-message="This field is required"
                                    />
                                    {errors?.type && (
                                      <p className="invalid">{errors.type}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group">
                                  <h5>Shipping Company</h5>
                                  <div className="controls">
                                    <input
                                      type="text"
                                      name="shippingCompany"
                                      className="form-control"
                                      value={formik.values.shippingCompany}
                                      onChange={formik.handleChange}
                                      onBlur={(e) => {
                                        formik.handleBlur(e);
                                        if (!formik.errors.shippingCompany) {
                                          if (errors?.shippingCompany) {
                                            const { ...remainingErrors } =
                                              errors;
                                            setErrors(remainingErrors);
                                          }
                                        }
                                      }}
                                      style={getStyles(
                                        errors,
                                        "shippingCompany",
                                        errorMessage
                                      )}
                                      data-validation-required-message="This field is required"
                                    />
                                    {errors?.shippingCompany && (
                                      <p className="invalid">
                                        {errors.shippingCompany}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group">
                                  <h5>Price</h5>
                                  <div className="controls">
                                    <input
                                      type="text"
                                      name="price"
                                      className="form-control"
                                      value={formik.values.price}
                                      onChange={formik.handleChange}
                                      onBlur={(e) => {
                                        formik.handleBlur(e);
                                        if (!formik.errors.price) {
                                          if (errors?.price) {
                                            const { ...remainingErrors } =
                                              errors;
                                            setErrors(remainingErrors);
                                          }
                                        }
                                      }}
                                      style={getStyles(
                                        errors,
                                        "price",
                                        errorMessage
                                      )}
                                      data-validation-required-message="This field is required"
                                    />
                                    {errors?.price && (
                                      <p className="invalid">{errors.price}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-6">
                                <div className="form-group">
                                  <h5>
                                    Shipping State{" "}
                                    <span className="text-danger">*</span>
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
                                            const { ...remainingErrors } =
                                              errors;
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
                                      <p className="invalid">
                                        {errors.shippingStateId}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          ),
                        },
                        // Add more tabs as needed
                      ]}
                    />
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
