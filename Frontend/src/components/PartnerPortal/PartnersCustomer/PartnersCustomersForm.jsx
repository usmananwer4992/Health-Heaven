import React from "react";
import Joi from "joi";
import { getIn, useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationDialog from "../../ConfirmationDialog";
import { createCustomerAction } from "../../../redux/customer.slice";
import { useHistory } from "react-router-dom";
import Select from "react-select";

let initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  secondaryAddress: "",
  city: "",
  stateId: "",
  zipCode: "",
  dob: "",
  gender: "",
};

const PartnersCustomerForm = ({ states, onSubmit }) => {
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
  const navigate = useHistory();
  const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const { errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const validationSchema = Joi.object({
        firstName: Joi.string().required().messages({
          "string.base": "First Name should be a string.",
          "string.empty": "First Name is not allowed to be empty.",
          "any.required": "First Name is required.",
        }),
        lastName: Joi.string().required().messages({
          "string.base": "Last Name should be a string.",
          "string.empty": "Last Name is not allowed to be empty.",
          "any.required": "Last Name is required.",
        }),
        email: Joi.string()
          .email({ tlds: { allow: ["com", "net"] } })
          .required()
          .messages({
            "string.base": "Email should be a string.",
            "string.email": "Email must be a valid email with a valid domain.",
            "string.empty": "Email is not allowed to be empty.",
            "any.required": "Email is required.",
          }),
        phone: Joi.string().required().messages({
          "string.empty": "Phone is not allowed to be empty.",
          "any.required": "Phone is required.",
        }),
        address: Joi.string().required().messages({
          "string.base": "Address should be a string.",
          "string.empty": "Address is not allowed to be empty.",
          "any.required": "Address is required.",
        }),
        secondaryAddress: Joi.string().required().messages({
          "string.base": "Secondary Address should be a string.",
          "string.empty": "Secondary Address is not allowed to be empty.",
          "any.required": "Secondary Address is required.",
        }),
        city: Joi.string().required().messages({
          "string.base": "City should be a string",
          "string.empty": "City is not allowed to be empty.",
          "any.required": "City is required.",
        }),
        stateId: Joi.string().required().messages({
          "string.base": "Please select state",
          "string.empty": "State is not allowed to be empty.",
          "any.required": "State is required.",
        }),
        zipCode: Joi.string().required().messages({
          "string.base": "Zipcode should be a string",
          "string.empty": "Zipcode is not allowed to be empty.",
          "any.required": "Zipcode is required.",
        }),
        dob: Joi.string().required().messages({
          "string.base": "Please select dob",
          "string.empty": "DOB is not allowed to be empty.",
          "any.required": "DOB is required.",
        }),
        gender: Joi.string().required().messages({
          "string.base": "Please select gender",
          "string.empty": "Gender is not allowed to be empty.",
          "any.required": "Gender is required.",
        }),
      }).options({ abortEarly: false });

      const { error } = validationSchema.validate(values);
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        secondaryAddress,
        city,
        stateId,
        zipCode,
        dob,
        gender,
      } = values;
      const validationErrors = {};
      if (error) {
        error.details.forEach((detail) => {
          validationErrors[detail.path[0]] = detail.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({});
        dispatch(
          createCustomerAction(
            "/partner",
            {
              firstName,
              lastName,
              email,
              phone,
              address,
              secondaryAddress,
              city,
              stateId,
              zipCode,
              dob,
              gender,
            },
            redirectToSuccessPage,
            "/app/partner/customers"
          )
        );
      }
    },
  });

  const redirectToSuccessPage = (url) => {
    // Redirect to the specified URL
    navigate.push(url);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {console.log(formik.values)}
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <h5>
              First Name
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.firstName) {
                    if (errors?.firstName) {
                      const { firstName, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
                  }
                }}
                style={getStyles(errors, "firstName", errorMessage)}
                data-validation-required-message="This field is required"
              />
              {errors?.firstName && (
                <p className="invalid">{errors.firstName}</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              Last Name
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.lastName) {
                    if (errors?.lastName) {
                      const { lastName, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
                  }
                }}
                style={getStyles(errors, "lastName", errorMessage)}
                data-validation-required-message="This field is required"
              />
              {errors?.lastName && <p className="invalid">{errors.lastName}</p>}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              Email
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="email"
                name="email"
                className="form-control"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.email) {
                    if (errors?.email) {
                      const { email, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
                  }
                }}
                style={getStyles(errors, "email", errorMessage)}
                data-validation-required-message="This field is required"
              />
              {errors?.email && <p className="invalid">{errors.email}</p>}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              Phone
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="tel"
                name="phone"
                className="form-control"
                maxLength="10"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.phone) {
                    if (errors?.phone) {
                      const { phone, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
                  }
                }}
                style={getStyles(errors, "phone", errorMessage)}
                data-validation-required-message="This field is required"
              />
              {errors?.phone && <p className="invalid">{errors.phone}</p>}
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
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.address) {
                    if (errors?.address) {
                      const { address, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
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
              Secondary Address
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="text"
                name="secondaryAddress"
                className="form-control"
                value={formik.values.secondaryAddress}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.secondaryAddress) {
                    if (errors?.secondaryAddress) {
                      const { secondaryAddress, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
                  }
                }}
                style={getStyles(errors, "secondaryAddress", errorMessage)}
                data-validation-required-message="This field is required"
              />
              {errors?.secondaryAddress && (
                <p className="invalid">{errors.secondaryAddress}</p>
              )}
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
                className="form-control"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.city) {
                    if (errors?.city) {
                      const { city, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
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
              <Select
                name="stateId"
                id="stateId"
                value={{
                  label:
                    states.find((st) => st.id == formik.values.stateId)
                      ?.name || "",
                  value: formik.values.stateId,
                }}
                options={states?.map((st) => ({
                  value: st.id,
                  label: st.name,
                }))}
                onChange={(selectedOption) => {
                  formik.setFieldValue("stateId", `${selectedOption.value}`);
                }}
                onBlur={formik.handleBlur}
                styles={getStyles(errors, "stateId", errorMessage)}
              />
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
                className="form-control"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.zipCode) {
                    if (errors?.zipCode) {
                      const { zipCode, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
                  }
                }}
                style={getStyles(errors, "zipCode", errorMessage)}
                data-validation-required-message="This field is required"
              />
              {errors?.zipCode && <p className="invalid">{errors.zipCode}</p>}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              DOB
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="date"
                name="dob"
                className="form-control"
                value={formik.values.dob}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.dob) {
                    if (errors?.dob) {
                      const { zipCode, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
                  }
                }}
                style={getStyles(errors, "dob", errorMessage)}
                data-validation-required-message="This field is required"
              />
              {errors?.dob && <p className="invalid">{errors.dob}</p>}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              Gender
              <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <Select
                name="gender"
                id="gender"
                value={{
                  label:
                    gender.find((g) => g.value === formik.values.gender)
                      ?.label || "",
                  value: formik.values.gender,
                }}
                options={gender?.map((g) => ({
                  value: g.value,
                  label: g.label,
                }))}
                onChange={(selectedOption) => {
                  formik.setFieldValue("gender", selectedOption.value);
                }}
                onBlur={formik.handleBlur}
                styles={getStyles(errors, "gender", errorMessage)}
              />
              {errors?.gender && <p className="invalid">{errors.gender}</p>}
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
  );
};
export default PartnersCustomerForm;
