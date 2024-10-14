import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetErrorMessage } from "../redux/authActions";
import Joi from "joi";
import { useFormik, getIn } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import hhLogo from "../assets/images/hh-logo.png";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const location = useLocation();
  const rememberedUser = Cookies.get("rememberedUser");
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: !!rememberedUser,
      loading: false, // Initialize loading property
    },

    onSubmit: async (values) => {
      // Set loading to true when the form is submitted
      formik.setFieldValue("loading", true);
      const validationSchema = Joi.object({
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .messages({
            "string.base": "Email should be a string.",
            "string.email": "Email must be a valid email.",
            "string.empty": "Email is not allowed to be empty.",
            "any.required": "Email is not allowed to be empty.",
          }),
        password: Joi.string().required().messages({
          "string.base": "Password should be a string.",
          "string.empty": "Password is not allowed to be empty.",
          "any.required": "is not allowed to be empty.",
        }),
        rememberMe: Joi.boolean(),
      })
        .with("email", "password")
        .options({ abortEarly: false });

      const { error } = validationSchema.validate(values, {
        // Allow unknown fields (e.g., "loading") in the values object
        allowUnknown: true,
      });
      const { email, password, rememberMe } = values;
      const validationErrors = {};
      if (error) {
        error.details.forEach((detail) => {
          validationErrors[detail.path[0]] = detail.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({});
        dispatch(loginUser(email, password, navigate, location));

        if (rememberMe) {
          Cookies.set("rememberedUser", JSON.stringify({ email, password }));
        }
      }
      // Introduce a delay before setting loading to false
      setTimeout(() => {
        formik.setFieldValue("loading", false);
        console.log("Loading set to false");
      }, 1000); // Adjust the delay as needed (1 second in this example)
    },
  });
  const handlePageRefresh = () => {
    // Dispatch the resetErrorMessage action to set errorMessage to null
    dispatch(resetErrorMessage());
  };

  React.useEffect(() => {
    document.querySelector("body").classList.add("login-banner");
    const rememberedUser = Cookies.get("rememberedUser");
    if (rememberedUser && !formik.values.email && !formik.values.password) {
      const { email, password } = JSON.parse(rememberedUser);
      formik.setValues({ email, password });
      //console.log(formik.values.email);
      //      setRememberMe(true); // Set the checkbox as checked
    } else {
      //    setRememberMe(false); // Set the checkbox as unchecked if no remembered user
    }

    window.addEventListener("beforeunload", handlePageRefresh);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("beforeunload", handlePageRefresh);
      document.querySelector("body").classList.remove("login-banner");
    };
  }, [
    dispatch,
    formik.values.email,
    formik.values.password,
    formik.setValues,
    formik.values.rememberMe,
  ]);
  let [errors, setErrors] = React.useState();
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
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const successMessage = useSelector((state) => state.successMessage);
  const { errorMessage } = useSelector((state) => state.user);

  const [emailValue, setEmailValue] = React.useState(formik.values.email);
  const [passwordValue, setPasswordValue] = React.useState(
    formik.values.password
  );

  return (
    <div className="container h-p100vh">
      <div className="row align-items-center justify-content-md-center h-p100">
        <div className="col-12">
          <div className="row justify-content-center g-0">
            <div className="col-lg-5 col-md-5 col-12">
              <div className="bg-white rounded10 shadow-lg">
                <div className="content-top-agile p-20 pb-0">
                  <div className="logo-mini wt-50 apexcharts-canvas">
                    <img src={hhLogo} alt="logo" />
                  </div>
                  <p className="mb-0">
                    Please sign-in to your account and start the adventure
                  </p>
                </div>
                <div className="p-40">
                  {successMessage && (
                    <p className="alert alert-info" role="alert">
                      {successMessage}
                    </p>
                  )}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault(); // Prevent the form from submitting
                      setFormSubmitted(true); // Set the formSubmitted flag to true
                      formik.handleSubmit(e); // Manually trigger formik's submit handler
                    }}
                  >
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-transparent">
                          <i className="ti-user"></i>
                        </span>
                        <input
                          type="text"
                          name="email"
                          className="form-control ps-15 bg-transparent"
                          value={emailValue}
                          onChange={(e) => {
                            setEmailValue(e.target.value);
                            formik.handleChange(e);
                          }}
                          onBlur={(e) => {
                            formik.handleBlur(e);
                            if (!formik.errors.email && e.target.value === "") {
                              if (errors?.email) {
                                const { email, ...remainingErrors } = errors;
                                setErrors(remainingErrors);
                              }
                              if (
                                errorMessage?.email ||
                                e.target.value === ""
                              ) {
                                handlePageRefresh();
                              }
                            } else if (!formik.errors.email) {
                              // Clear the email error when the field is blurred and the email is valid
                              setErrors({ ...errors, email: null });
                            }
                          }}
                          placeholder="Email"
                          style={getStyles(errors, "email", errorMessage)}
                        />
                      </div>
                      {errors?.email && (
                        <p className="invalid">{errors.email}</p>
                      )}
                      {formSubmitted &&
                        errorMessage?.email &&
                        !errors?.email && (
                          <p className="invalid">{errorMessage.email}</p>
                        )}
                    </div>
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <span className="input-group-text  bg-transparent">
                          <i className="ti-lock"></i>
                        </span>
                        <input
                          type="password"
                          name="password"
                          value={passwordValue}
                          onChange={(e) => {
                            setPasswordValue(e.target.value);
                            formik.handleChange(e);
                          }}
                          onBlur={(e) => {
                            formik.handleBlur(e);
                            if (
                              !formik.errors.password &&
                              e.target.value === ""
                            ) {
                              if (errors?.password) {
                                const { password, ...remainingErrors } = errors;
                                setErrors(remainingErrors);
                              }
                              if (e.target.value === "") {
                                handlePageRefresh();
                              }
                            }
                          }}
                          className="form-control ps-15 bg-transparent"
                          placeholder="Password"
                          style={getStyles(errors, "password", errorMessage)}
                        />
                      </div>
                      {errors?.password && (
                        <p className="invalid">{errors.password}</p>
                      )}
                      {errorMessage?.password && !errors?.password && (
                        <p className="invalid">{errorMessage.password}</p>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            name="rememberMe"
                            id="basic_checkbox_1"
                            value={formik.values.rememberMe}
                            onChange={formik.handleChange}
                          />
                          <label htmlFor="basic_checkbox_1">Remember me</label>
                        </div>
                      </div>
                      <div className="col-12 text-center">
                        <button
                          type="submit"
                          className="btn btn-danger mt-10"
                          disabled={formik.values.loading}
                        >
                          {formik.values.loading ? (
                            <>
                              Signing In&nbsp;
                              <span
                                className="spinner-border spinner-border-sm ml-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Loading...</span>
                            </>
                          ) : (
                            "SIGN IN"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
