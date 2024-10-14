import React from "react";
import Joi from "joi";
import { useSelector } from "react-redux";
import { useFormik, getIn } from "formik";
const PartnerUserForm = ({
  partnerData,
  partners,
  id,
  apiErrorMessage,
  apiSuccessMessage,
  onSubmit,
  roleId,
}) => {
  let initialValues = {
    email: "",
    password: "",
    password2: "",
    partnerId: "",
    roleId: roleId ? roleId : 3,
  };

  if (typeof id !== "undefined" && partnerData?.email) {
    initialValues = {
      email: partnerData.email,
      partnerId: partnerData.partnerId,
      roleId: roleId ? roleId : 3,
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

  React.useEffect(() => {
    if (apiErrorMessage) {
      setErrors(apiErrorMessage);
    }
    if (apiSuccessMessage) {
      formik.resetForm();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return () => {};
  }, [apiErrorMessage, apiSuccessMessage]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      // formik.setFieldValue("loading", true);
      const commonSchema = Joi.object({
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .messages({
            "string.base": "Email should be a string.",
            "string.email": "Email must be a valid email.",
            "string.empty": "Email is not allowed to be empty.",
            "any.required": "Email is not allowed to be empty.",
          }),
        partnerId: Joi.number().required().messages({
          "number.base": "Please select a partner",
          "number.empty": "Partner is not allowed to be empty.",
          "any.required": "Partner is not allowed to be empty.",
        }),
        roleId: Joi.number().required().messages({
          "number.base": "Please select a role",
          "number.empty": "Role is not allowed to be empty.",
          "any.required": "Role is not allowed to be empty.",
        }),
      });

      const validationSchema = (id, values) => {
        if (typeof id !== "undefined" && values.password === undefined) {
          // Validation for updating without changing password
          return commonSchema
            .keys({
              password: Joi.string().allow("").optional(),
              password2: Joi.string().allow("").optional(),
            })
            .options({ abortEarly: false });
        } else {
          // Validation for creating or updating with a new password
          return commonSchema
            .keys({
              password: Joi.string().min(8).required().messages({
                "string.base": "Password should be a string.",
                "string.empty": "Password is not allowed to be empty.",
                "any.required": "Password is not allowed to be empty.",
                "string.min":
                  "Password should be at least {#limit} characters long.",
              }),
              password2: Joi.string()
                .valid(Joi.ref("password"))
                .required()
                .messages({
                  "string.base": "Repeat Password should be a string.",
                  "string.empty": "Repeat Password is required",
                  "any.only": "Repeat Password must match the password",
                  "any.required": "Repeat Password is not allowed to be empty.",
                }),
            })
            .options({ abortEarly: false });
        }
      };

      const schema = validationSchema(id, values);
      const { error } = schema.validate(values);

      const validationErrors = {};
      if (error) {
        error.details.forEach((detail) => {
          validationErrors[detail.path[0]] = detail.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({});
        onSubmit(values);
      }

      setTimeout(() => {
        //  formik.setFieldValue("loading", false);
        console.log("Loading set to false");
      }, 1000); // Adjust the delay as needed (1 second in this example)
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
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
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.partnerId) {
                    if (errors?.partnerId) {
                      const { partnerId, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
                  }
                }}
                style={getStyles(errors, "partnerId", errorMessage)}
                className="form-select"
              >
                <option>Select Partner</option>
                {partners &&
                  partners.map((partner) => (
                    <option value={partner.id} key={partner.id}>
                      {partner.name}
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
              Email <span className="text-danger">*</span>
            </h5>
            <div className="controls">
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter partner user email"
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
                readOnly={id !== undefined}
              />
              {errors?.email && <p className="invalid">{errors.email}</p>}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              Password
              {!id && <span className="text-danger">*</span>}
            </h5>
            <div className="controls">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter partner user password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.password) {
                    if (errors?.password) {
                      const { password, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
                  }
                }}
                style={getStyles(errors, "password", errorMessage)}
              />
              {errors?.password && <p className="invalid">{errors.password}</p>}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h5>
              Repeat Password
              {!id && <span className="text-danger">*</span>}
            </h5>
            <div className="controls">
              <input
                type="password"
                name="password2"
                value={formik.values.password2}
                placeholder="Enter partner user repeat password"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.errors.password2) {
                    if (errors?.password2) {
                      const { password2, ...remainingErrors } = errors;
                      setErrors(remainingErrors);
                    }
                  }
                }}
                style={getStyles(errors, "password2", errorMessage)}
                className="form-control"
              />
              {errors?.password2 && (
                <p className="invalid">{errors.password2}</p>
              )}
            </div>
          </div>
        </div>
      </div>
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

export default PartnerUserForm;
