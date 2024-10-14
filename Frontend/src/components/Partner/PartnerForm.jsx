import React from "react";
import Joi from "joi";
import { useSelector } from "react-redux";
import { useFormik, getIn } from "formik";
import { v4} from "uuid";
import ConfirmationDialog from "../ConfirmationDialog";
//const sandBoxKey = uuidv4();

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const liveKey = generateUUID()
let initialValues = {
  name: "",
  // email: "",
  // password: "",
  // password2: "",
  brandBox: "0",
  website: "",
  address: "",
  tier: "tier_one",
  city: "",
  stateId: "",
  zipCode: "",
  //sandBoxKey: "",
  liveKey: "",
  shippingDetails: [{ id: 0, type: "", shippingCompany: "", price: "" }],
};
const validateShippingDetail = (shippingDetail) => {
  const schema = Joi.object({
    id: Joi.number(),
    type: Joi.string().required().messages({
      "string.base": "Type should be a string",
      "string.empty": "Type is not allowed to be empty.",
      "any.required": "Type is required.",
    }),
    shippingCompany: Joi.string().required().messages({
      "string.base": "Shipping Company should be a string",
      "string.empty": "Shipping Company is not allowed to be empty.",
      "any.required": "Shipping Company is required.",
    }),
    price: Joi.string().required().messages({
      "string.base": "Price should be a string",
      "string.empty": "Price is not allowed to be empty.",
      "any.required": "Price is required.",
    }),
  });

  const { error } = schema.validate(shippingDetail, { abortEarly: false });
  return error ? error.details : [];
};
const PartnerForm = ({
  partnerData,
  states,
  id,
  apiErrorMessage,
  apiSuccessMessage,
  removeShippingDetail,
  onSubmit,
}) => {
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
  if (typeof id !== "undefined" && partnerData?.name) {
    const {
      id,
      Users,
      Shippings,
      // email,
      // password,
      // password2,
      secondaryAddress,
      sandBoxKey,
      // liveKey,
      softDeleted,
      createdAt,
      updatedAt,
      deletedAt,
      ...partnerProps
    } = partnerData;

    initialValues = { ...partnerProps };
    console.log("partnerProps", {...partnerProps});
    // initialValues.shippingDetails = [...Shippings];
    const keysToSpread = ["id", "type", "shippingCompany", "price"];
    initialValues.shippingDetails = Shippings.map((shipping) =>
      keysToSpread.reduce((obj, key) => {
        obj[key] = shipping[key];
        return obj;
      }, {})
    );
  } else {
    initialValues = {
      ...initialValues,
      //sandBoxKey: sandBoxKey,
      liveKey: liveKey,
    };
  }
  console.log("initialValues", initialValues);
  React.useEffect(() => {
    if (typeof id === "undefined") {
      initialValues = {
        name: "",
        brandBox: "0",
        website: "",
        address: "",
        tier: "tier_one",
        city: "",
        stateId: "",
        zipCode: "",
        //sandBoxKey: "",
        liveKey: "",
        shippingDetails: [{ id: 0, type: "", shippingCompany: "", price: "" }],
      };
    }
    if (apiErrorMessage) {
      setErrors(apiErrorMessage);
    }
    if (apiSuccessMessage) {
      formik.resetForm();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return () => {};
  }, [apiErrorMessage, apiSuccessMessage]);
  const [shippingDetailErrors, setShippingDetailErrors] = React.useState([[]]);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const shippingDetailSchema = Joi.object({
          id: Joi.number(),

          type: Joi.string().required().messages({
            "string.base": "Type should be a string",
            "string.empty": "Type is not allowed to be empty.",
            "any.required": "Type is required.",
          }),
          shippingCompany: Joi.string().required().messages({
            "string.base": "Shipping Company should be a string",
            "string.empty": "Shipping Company is not allowed to be empty.",
            "any.required": "Shipping Company is required.",
          }),
          price: Joi.string().required().messages({
            "string.base": "Price should be a string",
            "string.empty": "Price is not allowed to be empty.",
            "any.required": "Price is required.",
          }),
        });

        const customJoi = Joi.extend((joi) => ({
          type: "softDeleted",
          base: joi.date(),
          messages: {
            "softDeleted.base": "Soft deleted date must be a valid date.",
          },
          coerce(value, state, options) {
            if (value === null || value === "") {
              return { value: null }; // Allow null or empty string
            }
            return { value: joi.date().validate(value) }; // Validate as a date
          },
        }));
        const validationSchema = Joi.object({
          name: Joi.string().required().messages({
            "string.base": "Name should be a string.",
            "string.empty": "Name is not allowed to be empty.",
            "any.required": "Name is not allowed to be empty.",
          }),
          address: Joi.string().required().messages({
            "string.base": "Address should be a string.",
            "string.empty": "Address is not allowed to be empty.",
            "any.required": "Address is not allowed to be empty.",
          }),
          website: Joi.string().allow("", null).optional(),
          brandBox: Joi.string().valid("1", "0").required(),
          tier: Joi.string()
            .valid(
              "tier_one",
              "tier_two",
              "tier_three",
              "tier_four",
              "tier_five",
              "tier_six"
            )
            .required(),
          city: Joi.string().required().messages({
            "string.base": "City should be string",
            "string.empty": "City is not allowed to be empty.",
            "any.required": "City is not allowed to be empty.",
          }),
          stateId: Joi.number().required().messages({
            "number.base": "Please select state",
            "number.empty": "State is not allowed to be empty.",
            "any.required": "State is not allowed to be empty.",
          }),
          zipCode: Joi.number().required().messages({
            "number.base": "Zipcode should be number",
            "number.empty": "Zipcode is not allowed to be empty.",
            "any.required": "Zipcode is not allowed to be empty.",
          }),
          //sandBoxKey: Joi.string().allow("", null).optional(),
          liveKey: Joi.string().allow("", null).optional(),
          shippingDetails: Joi.array()
            .items(shippingDetailSchema)
            .min(1)
            .messages({
              "array.base": "Shipping Details should be an array",
              "array.min": "At least one shipping detail is required.",
              "any.required": "Shipping Details are required.",
            }),
        }).options({ abortEarly: false });

        const validationUpdateSchema = Joi.object({
          name: Joi.string().required().messages({
            "string.base": "Name should be a string.",
            "string.empty": "Name is not allowed to be empty.",
            "any.required": "Name is not allowed to be empty.",
          }),
          address: Joi.string().required().messages({
            "string.base": "Address should be a string.",
            "string.empty": "Address is not allowed to be empty.",
            "any.required": "Address is not allowed to be empty.",
          }),
          // softDeleted: customJoi.softDeleted().optional(),
          website: Joi.string().allow("", null).optional(),
          brandBox: Joi.string().valid("1", "0").required(),
          tier: Joi.string()
            .valid(
              "tier_one",
              "tier_two",
              "tier_three",
              "tier_four",
              "tier_five",
              "tier_six"
            )
            .required(),
          city: Joi.string().required().messages({
            "string.base": "City should be string",
            "string.empty": "City is not allowed to be empty.",
            "any.required": "City is not allowed to be empty.",
          }),
          stateId: Joi.number().required(),
          zipCode: Joi.number().required().messages({
            "number.base": "Zipcode should be number",
            "number.empty": "Zipcode is not allowed to be empty.",
            "any.required": "Zipcode is not allowed to be empty.",
          }),
          //sandBoxKey: Joi.string().allow("", null).optional(),
          liveKey: Joi.string().allow("", null).optional(),
          shippingDetails: Joi.array()
            .items(shippingDetailSchema)
            .min(1)
            .messages({
              "array.base": "Shipping Details should be an array",
              "array.min": "At least one shipping detail is required.",
              "any.required": "Shipping Details are required.",
            }),
        }).options({ abortEarly: false });

        const { error } =
        typeof id !== "undefined" && partnerData?.name
            ? validationUpdateSchema.validate(values)
            : validationSchema.validate(values);
        console.log("values", values);
        const validationErrors = {};

        if (error) {
          console.log(error);
          error.details.forEach((detail) => {
            if (
              detail.path[0] !== "shippingDetails" &&
              detail.path[0] !== "loading"
            ) {
              validationErrors[detail.path[0]] = detail.message;
            }
          });
        }

        // Check for errors in shippingDetails
        const shippingDetailErrors = values.shippingDetails.map(
          (shippingDetail, index) => {
            const shippingDetailValidation = shippingDetailSchema.validate(
              shippingDetail,
              { abortEarly: false }
            );
            return shippingDetailValidation.error?.details || [];
          }
        );

        if (shippingDetailErrors.some((errors) => errors.length !== 0)) {
          shippingDetailErrors.forEach((detailArray, index) => {
            detailArray.forEach((detail) => {
              validationErrors[`shippingDetails[${index}].${detail.path[0]}`] =
                detail.message;
            });
          });
        }

        if (Object.keys(validationErrors).length === 0) {
          setErrors({});
          formik.setFieldValue("loading", true); // Set loading to true before onSubmit
          if (values.partnerId === null || values.partnerId !== null)
          await onSubmit(values); // Assuming onSubmit returns a Promise
          formik.setFieldValue("loading", false); // Set loading to false after successful form submission
        } else {
          setErrors(validationErrors);
        }
      } catch (error) {
        console.error("An error occurred during form submission:", e);
        // Handle error if needed
        formik.setFieldValue("loading", false); // Set loading to false in case of an error
      }
    },
  });

  const addShippingDetail = () => {
    const newShippingDetail = {
      id: 0,
      type: "",
      shippingCompany: "",
      price: "",
    };
    formik.setFieldValue("shippingDetails", [
      ...formik.values.shippingDetails,
      newShippingDetail,
    ]);

    setShippingDetailErrors([...shippingDetailErrors, []]);
  };

  // const removeShippingDetail = (index) => {
  //   formik.values.shippingDetails.splice(index, 1);
  //   formik.setValues(formik.values);
  //   const newErrors = [...shippingDetailErrors];
  //   newErrors.splice(index, 1);
  //   setShippingDetailErrors(newErrors);
  // };

  const validateAndSetShippingDetail = (shippingDetail, index) => {
    const errors = validateShippingDetail(shippingDetail);
    const newErrors = [...shippingDetailErrors];
    newErrors[index] = errors;
    setShippingDetailErrors(newErrors);
  };

  const deleteShippingDetail = async (id, index) => {
    //formik.values.shippingDetails.splice(index, 1);
    //formik.setValues(formik.values);
    //formik.setFieldValue("shippingDetails", [...formik.values.shippingDetails]);
    const newShippingDetails = [...formik.values.shippingDetails];
    newShippingDetails.splice(index, 1);
    formik.setValues({ ...formik.values, shippingDetails: newShippingDetails });
    const newErrors = [...shippingDetailErrors];
    newErrors.splice(index, 1);
    setShippingDetailErrors(newErrors);
    if (typeof id !== "undefined" && id) {
      await removeShippingDetail(id);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <h5>
              Name
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="text"
                name="name"
                placeholder="Enter partner name"
                className="form-control"
                value={formik.values.name}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.handleBlur(e);
                  if (!formik.errors.name && errors?.name) {
                    const { name, ...remainingErrors } = errors;
                    setErrors(remainingErrors);
                  }
                }}
                style={getStyles(errors, "name", errorMessage)}
                data-validation-required-message="This field is required"
              />
              {errors?.name && <p className="invalid">{errors.name}</p>}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              Address
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Enter partner address"
                value={formik.values.address}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.handleBlur(e);
                  if (!formik.errors.address && errors?.address) {
                    const { address, ...remainingErrors } = errors;
                    setErrors(remainingErrors);
                  }
                }}
                style={getStyles(errors, "address", errorMessage)}
                data-validation-required-message="This field is required"
              />
              {errors?.address && <p className="invalid">{errors.address}</p>}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              City
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="text"
                name="city"
                placeholder="Enter partner city"
                className="form-control"
                value={formik.values.city}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.handleBlur(e);
                  if (!formik.errors.city && errors?.city) {
                    const { city, ...remainingErrors } = errors;
                    setErrors(remainingErrors);
                  }
                }}
                style={getStyles(errors, "city", errorMessage)}
                data-validation-required-message="This field is required"
              />
              {errors?.city && <p className="invalid">{errors.city}</p>}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              State <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <select
                name="stateId"
                id="stateId"
                value={formik.values.stateId}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.handleBlur(e);
                  if (!formik.errors.stateId && errors?.stateId) {
                    const { stateId, ...remainingErrors } = errors;
                    setErrors(remainingErrors);
                  }
                }}
                style={getStyles(errors, "stateId", errorMessage)}
                className="form-select"
              >
                <option>Select Your State</option>
                {states &&
                  states.map((st) => (
                    <option value={st.id} key={st.id}>
                      {st.name}
                    </option>
                  ))}
              </select>
              {errors?.stateId && <p className="invalid">{errors.stateId}</p>}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              Zipcode
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="text"
                name="zipCode"
                placeholder="Enter partner zipcode"
                className="form-control"
                value={formik.values.zipCode}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.handleBlur(e);
                  if (!formik.errors.zipCode && errors?.zipCode) {
                    const { zipCode, ...remainingErrors } = errors;
                    setErrors(remainingErrors);
                  }
                }}
                style={getStyles(errors, "zipCode", errorMessage)}
                data-validation-required-message="This field is required"
              />
              {errors?.zipCode && <p className="invalid">{errors.zipCode}</p>}
            </div>
          </div>
        </div>
        {/* <div className="col-6">
          <div className="form-group">
            <h5>
              Sandbox Key
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="text"
                name="sandBoxKey"
                className="form-control"
                value={formik.values.sandBoxKey}
                readOnly
              />
            </div>
          </div>
        </div> */}
        <div className="col-6">
          <div className="form-group">
            <h5>
              Live Key
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="text"
                name="liveKey"
                className="form-control"
                value={formik.values.liveKey}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <h5>Website</h5>
            <div className="controls">
              <input
                type="text"
                name="website"
                placeholder="Enter partner website"
                className="form-control"
                value={formik.values.website}
                onChange={formik.handleChange}
                style={getStyles(errors, "website", errorMessage)}
              />
              {errors?.website && <p className="invalid">{errors.website}</p>}
            </div>
            {/* <div className="form-control-feedback">
            <small>
              Add <code>required</code> attribute to field for
              required validation.
            </small>
          </div> */}
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              Tier <span className="text-danger">*</span>
            </h5>
            <div className="control form-check form-check-inline">
              <input
                name="tier"
                type="radio"
                id="tier_1"
                value="tier_one"
                onChange={formik.handleChange}
                checked={formik.values.tier == "tier_one"}
              />
              <label htmlFor="tier_1" className="form-check-label">
                One
              </label>
            </div>
            <div className="control form-check form-check-inline">
              <input
                name="tier"
                type="radio"
                id="tier_2"
                value="tier_two"
                onChange={formik.handleChange}
                checked={formik.values.tier == "tier_two"}
              />
              <label htmlFor="tier_2" className="form-check-label">
                Two
              </label>
            </div>
            <div className="control form-check form-check-inline">
              <input
                name="tier"
                type="radio"
                id="tier_3"
                value="tier_three"
                onChange={formik.handleChange}
                checked={formik.values.tier == "tier_three"}
              />
              <label htmlFor="tier_3" className="form-check-label">
                Three
              </label>
            </div>
            <div className="control form-check form-check-inline">
              <input
                name="tier"
                type="radio"
                id="tier_4"
                value="tier_four"
                onChange={formik.handleChange}
                checked={formik.values.tier == "tier_four"}
              />
              <label htmlFor="tier_4" className="form-check-label">
                Four
              </label>
            </div>
            <div className="control form-check form-check-inline">
              <input
                name="tier"
                type="radio"
                id="tier_five"
                value="tier_five"
                onChange={formik.handleChange}
                checked={formik.values.tier == "tier_five"}
              />
              <label htmlFor="tier_five" className="form-check-label">
                Five
              </label>
            </div>
            <div className="control form-check form-check-inline">
              <input
                name="tier"
                type="radio"
                id="tier_6"
                value="tier_six"
                onChange={formik.handleChange}
                checked={formik.values.tier == "tier_six"}
              />
              <label htmlFor="tier_6" className="form-check-label">
                Six
              </label>
            </div>
            {errors?.tier && <p className="invalid">{errors.tier}</p>}
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>Brand Box</h5>
            <div className="control form-check form-check-inline">
              <input
                name="brandBox"
                type="radio"
                id="yes"
                value="1"
                onChange={formik.handleChange}
                checked={formik.values.brandBox == "1"}
              />
              <label htmlFor="yes" className="form-check-label">
                Yes
              </label>
            </div>
            <div className="control form-check form-check-inline">
              <input
                name="brandBox"
                type="radio"
                id="no"
                value="0"
                onChange={formik.handleChange}
                checked={formik.values.brandBox == "0"}
              />
              <label htmlFor="no" className="form-check-label">
                No
              </label>
            </div>
            {errors?.brandBox && <p className="invalid">{errors.brandBox}</p>}
          </div>
        </div>
      </div>
      {/* {typeof id === "undefined" && (
        <> */}
      <div className="row">
        <div className="col-12">
          <section className="content">
            <div className="box">
              <div className="box-header with-border">
                <h4 className="box-title">Shipping Details</h4>
                <button
                  type="button"
                  className="btn btn-primary float-end"
                  onClick={addShippingDetail}
                >
                  Add
                </button>
              </div>
              <div className="box-body">
                {formik.values.shippingDetails.map((shippingDetail, index) => (
                  <div key={index} className="row">
                    <div className="col">
                      <h5 className="box-title">Shipping {index + 1}</h5>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <h5>
                              Type
                              <span className="text-danger">*</span>
                            </h5>
                            <div className="controls">
                              <input
                                type="text"
                                name={`shippingDetails[${index}].type`}
                                className="form-control"
                                value={shippingDetail.type}
                                placeholder="Enter shipping type"
                                onChange={(e) => {
                                  formik.handleChange(e);
                                  validateAndSetShippingDetail(
                                    {
                                      ...shippingDetail,
                                      type: e.target.value,
                                    },
                                    index
                                  );

                                  // Clear the error when the input value changes
                                  const newErrors = { ...errors };
                                  delete newErrors[
                                    `shippingDetails[${index}].type`
                                  ];
                                  setErrors(newErrors);
                                }}
                                onBlur={formik.handleBlur}
                                style={getStyles(
                                  errors,
                                  [`shippingDetails[${index}].type`],
                                  errorMessage
                                )}
                              />
                              {errors?.[`shippingDetails[${index}].type`] && (
                                <p className="invalid">
                                  {errors?.[`shippingDetails[${index}].type`]}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group">
                            <h5>
                              Shipping Company
                              <span className="text-danger">*</span>
                            </h5>
                            <div className="controls">
                              <input
                                type="text"
                                name={`shippingDetails[${index}].shippingCompany`}
                                className="form-control"
                                value={shippingDetail.shippingCompany}
                                placeholder="Enter shipping company"
                                onChange={(e) => {
                                  formik.handleChange(e);
                                  validateAndSetShippingDetail(
                                    {
                                      ...shippingDetail,
                                      shippingCompany: e.target.value,
                                    },
                                    index
                                  );

                                  // Clear the error when the input value changes
                                  const newErrors = { ...errors };
                                  delete newErrors[
                                    `shippingDetails[${index}].shippingCompany`
                                  ];
                                  setErrors(newErrors);
                                }}
                                onBlur={formik.handleBlur}
                                style={getStyles(
                                  errors,
                                  [`shippingDetails[${index}].shippingCompany`],
                                  errorMessage
                                )}
                              />
                              {errors?.[
                                `shippingDetails[${index}].shippingCompany`
                              ] && (
                                <p className="invalid">
                                  {
                                    errors?.[
                                      `shippingDetails[${index}].shippingCompany`
                                    ]
                                  }
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group">
                            <h5>
                              Price
                              <span className="text-danger">*</span>
                            </h5>
                            <div className="controls">
                              <input
                                type="text"
                                name={`shippingDetails[${index}].price`}
                                className="form-control"
                                value={shippingDetail.price}
                                placeholder="Enter shipping price"
                                onChange={(e) => {
                                  formik.handleChange(e);
                                  validateAndSetShippingDetail(
                                    {
                                      ...shippingDetail,
                                      price: e.target.value,
                                    },
                                    index
                                  );

                                  // Clear the error when the input value changes
                                  const newErrors = { ...errors };
                                  delete newErrors[
                                    `shippingDetails[${index}].price`
                                  ];
                                  setErrors(newErrors);
                                }}
                                onBlur={formik.handleBlur}
                                style={getStyles(
                                  errors,
                                  [`shippingDetails[${index}].price`],
                                  errorMessage
                                )}
                              />
                              {errors?.[`shippingDetails[${index}].price`] && (
                                <p className="invalid">
                                  {errors?.[`shippingDetails[${index}].price`]}
                                </p>
                              )}
                            </div>
                          </div>

                          {typeof id !== "undefined" ? (
                            index === 0 ? null : (
                              <ConfirmationDialog
                                title="Delete Shipping"
                                text="Are you sure you want to delete this shipping detail?"
                                itemId={shippingDetail?.id}
                                index={index}
                                onConfirm={deleteShippingDetail}
                              >
                                <i className="fa fa-remove"></i>
                              </ConfirmationDialog>
                            )
                          ) : index === 0 ? null : (
                            <ConfirmationDialog
                              title="Delete Shipping"
                              text="Are you sure you want to delete this shipping detail?"
                              itemId={shippingDetail?.id}
                              index={index}
                              onConfirm={deleteShippingDetail}
                            >
                              <i className="fa fa-remove"></i>
                            </ConfirmationDialog>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* </>
      )} */}
      <div className="text-xs-right">
        <button
          type="submit"
          className="btn btn-info"
          disabled={formik.values.loading}
        >
          {formik.values.loading ? (
            <>
              Submitting&nbsp;
              <span
                className="spinner-border spinner-border-sm ml-2"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Loading...</span>
            </>
          ) : id ? (
            "Update"
          ) : (
            "Submit"
          )}
        </button>
      </div>
      {/* <div className="text-xs-right">
        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </div> */}
    </form>
  );
};

export default PartnerForm;
