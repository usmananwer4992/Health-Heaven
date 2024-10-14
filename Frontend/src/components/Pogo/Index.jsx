import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/POGO-Automatic-logo-lockup_Blue.png";
import hhlogo from "../../assets/images/Home-Page-2-1-2.webp";
import bannerImage from "../../assets/images/IMI_rectangle box_vA_for_HH_LPwform.svg";
import lowerbannerImage from "../../assets/images/IMI Landingpage Infographic_Logos.png";
import style from "./Index.module.css";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import logoHealthHaven from "../../assets/images/Logo-health.png";
import Footer from "./Footer";
import Select from "react-select";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useFormik, getIn } from "formik";
import Joi from "joi";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Pogo() {
  const navigate = useHistory();
  const [isChecked, setIsChecked] = useState(true);
  const [isLoader, setLoader] = useState(false);

  const [errors, setErrors] = useState();
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    email: "",
    phone: "",
    street_address: "",
    apartment: "",
    city: "",
    state: "",
    zip_code: "",
    physician_name: "",
    physician_city: "",
    physician_state: "",
    physician_phone: "",
    patient_id: "",
    rx_bin: "",
    pcn: "",
    rx_group: "",
  });
  // const [show, setShow] = useState(true);
  const [physicianStates, setPhysicianStates] = useState([]);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const handleChange = (e) => {
  //   setFormValues({ ...formValues, [e.target.name]: e.target.value });
  // };

  const handleCheckboxChange = () => {
    // If you want to toggle the checkbox when it's clicked
    setIsChecked(!isChecked);
  };
  const [isChecked1, setIsChecked1] = useState(true);

  const handleCheckboxChange1 = () => {
    // If you want to toggle the checkbox when it's clicked
    setIsChecked1(!isChecked1);
  };

  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");

    // Set the script content
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-M522CKH');
    `;

    // Append the script to the head of the document
    document.head.appendChild(script);

    // Create noscript element
    const noscript = document.createElement("noscript");

    // Set the noscript content
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M522CKH"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;

    // Append the noscript to the body of the document
    // document.body.appendChild(noscript);
    const body = document.querySelector("body");
    body.insertBefore(noscript, body.firstChild);
    // Cleanup functions to remove the script and noscript when the component unmounts
    return () => {
      document.head.removeChild(script);
      document.body.removeChild(noscript);
    };
  }, []);

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

  const initialValues = {
    patientFirstName: "",
    patientLastName: "",
    patientPhone: "",
    patientDob: "",
    patientEmail: "",
    patientStreetAddress: "",
    patientSecondaryAddress: "",
    patientCity: "",
    patientStateId: "",
    patientZipCode: "",
    patientCardId: "",
    patientRxBin: "",
    patientPcn: "",
    patientRxGroup: "",
    physicanName: "",
    physicanCity: "",
    physicanStateId: "",
    physicanPhone: "",
    firstCheckBox: false,
    secondCheckBox: true,
    thirdCheckBox: true,
  };

  const { errorMessage } = useSelector((state) => state.user);

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

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const validationSchema = Joi.object({
        patientFirstName: Joi.string().required().messages({
          "string.empty": "Patient first name is required.",
        }),
        patientLastName: Joi.string().required().messages({
          "string.empty": "Patient last name is required.",
        }),
        patientPhone: Joi.string()
          .regex(/^\+1\d{10}$/)
          .required()
          .messages({
            "string.base": "Patient phone should be a valid string.",
            "string.empty": "Patient phone is not allowed to be empty.",
            "any.required": "Patient phone is required.",
            "string.pattern.base":
              "Invalid phone number. The number should be in right format(1 (702) 103 1111)",
          }),
        patientDob: Joi.date().required().messages({
          "date.base": "Date of Birth must be a valid format.",
          "any.required": "Date of Birth is required.",
        }),
        patientEmail: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .messages({
            "string.base": "Patient Email should be a string.",
            "string.email": "Patient Email must be a valid email.",
            "string.empty": "Patient Email is not allowed to be empty.",
            "any.required": "Patient Email is not allowed to be empty.",
          }),
        patientStreetAddress: Joi.string().required().messages({
          "string.empty": "Patient Adress is required.",
        }),
        patientSecondaryAddress: Joi.string()
          .optional()
          .allow("")
          .default(null),
        patientCity: Joi.string().required().messages({
          "string.empty": "Patient city is required.",
        }),
        patientStateId: Joi.string().required().messages({
          "string.empty": "Patient state is required.",
        }),
        patientZipCode: Joi.string().required().messages({
          "string.empty": "Patient zipcode is required.",
        }),
        patientCardId: Joi.string()
          .optional()
          .allow("")
          .default(null)
          .messages({
            "string.empty": "Patient Card ID is required.",
          }),
        patientRxBin: Joi.string().optional().allow("").default(null).messages({
          "string.empty": "Patient Rx bin is required.",
        }),
        patientPcn: Joi.string().optional().allow("").default(null).messages({
          "string.empty": "Patient PCN is required.",
        }),
        patientRxGroup: Joi.string()
          .optional()
          .allow("")
          .default(null)
          .messages({
            "string.empty": "Patient Rx Group is required.",
          }),

        // Physician's Information
        physicanName: Joi.string().required().messages({
          "string.empty": "Physician name is required.",
        }),
        physicanCity: Joi.string().required().messages({
          "string.empty": "Physician city is required.",
        }),
        physicanStateId: Joi.string().required().messages({
          "string.empty": "Physician state is required.",
        }),
        physicanPhone: Joi.string()
        .optional()
        .allow("")
        .regex(/^\+1\d{10}$/)
        .messages({
          "string.base": "Physician phone should be a valid string.",
          "any.required": "Physician phone is required.",
          "string.pattern.base":
            "Invalid phone number. The number should be in the right format (e.g., +1 (702) 103 1111)",
        }),

        // Checkbox
        firstCheckBox: Joi.boolean().optional().allow(false),
        secondCheckBox: Joi.boolean().required(),
        thirdCheckBox: Joi.boolean().optional().allow(false),
      }).options({ abortEarly: false });

      const { error } = validationSchema.validate(values);
      const {
        patientFirstName,
        patientLastName,
        patientPhone,
        patientDob,
        patientEmail,
        patientStreetAddress,
        patientSecondaryAddress,
        patientCity,
        patientStateId,
        patientZipCode,
        patientCardId,
        patientRxBin,
        patientPcn,
        patientRxGroup,
        physicanName,
        physicanCity,
        physicanStateId,
        physicanPhone,
        firstCheckBox,
        secondCheckBox,
        thirdCheckBox,
      } = values;
      console.log(values, "values");
      const validationErrors = {};
      if (error) {
        error.details.forEach((detail) => {
          validationErrors[detail.path[0]] = detail.message;
        });
        setErrors(validationErrors);
        console.log(error, values);
      } else {
        setErrors({});
        console.log("hello");
        try {
          setLoader(true);
          let request = {};
          (request["patientFirstName"] = patientFirstName),
            (request["patientLastName"] = patientLastName),
            (request["patientPhone"] = patientPhone),
            (request["patientDob"] = patientDob),
            (request["patientEmail"] = patientEmail),
            (request["patientStreetAddress"] = patientStreetAddress),
            (request["patientSecondaryAddress"] = patientSecondaryAddress),
            (request["patientCity"] = patientCity),
            (request["patientState"] = patientStateId),
            (request["patientZipCode"] = patientZipCode),
            (request["patientCardId"] = patientCardId),
            (request["patientRxBin"] = patientRxBin),
            (request["patientPcn"] = patientPcn),
            (request["patientRxGroup"] = patientRxGroup),
            (request["physicianName"] = physicanName),
            (request["physicianCity"] = physicanCity),
            (request["physicianStateId"] = physicanStateId),
            (request["physicianPhone"] = physicanPhone),
            (request["firstCheckBox"] = firstCheckBox),
            (request["secondCheckBox"] = secondCheckBox),
            (request["thirdCheckBox"] = thirdCheckBox);
          const headers = { accept: "application/json" };
          let { data } = await axios.post(`${API_BASE_URL}/imi`, request, {
            headers,
          });
          setLoader(false);
          console.log(data.statusCode);
          if (data.statusCode === 200) {
            navigate.push("/pogo-automatic/thank-you");
          }
        } catch (e) {
          console.error(e);
        }
        // Call your asynchronous function
        // updateOrder();
        // Toast({ type: "success", message: "Order updated successfully" });
      }
    },
  });

  // useEffect(() => {
  //   console.log(formik)
  // }, [formik])

  return (
    <section className={`${style.pogo_section}`}>
      <div>
        {/* <Helmet>
          <noscript>{`<iframe
        title="GoogleTagManager"
        src="https://www.googletagmanager.com/ns.html?id=GTM-M522CKH"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe>`}</noscript>
        </Helmet> */}
        <header>
          <nav className="navbar navbar-light py-0">
            <div className="container-fluid p-0">
              <div className={`${style.header_nav}`}>
                <div>
                  <a className="navbar-brand" href="#">
                    <img src={Logo} alt="" className={`${style.pogo_logo}`} />
                  </a>
                </div>
                <div>
                  <a href="">
                    <img
                      src={hhlogo}
                      alt=""
                      className={`${style.health_heven_logo}`}
                    />
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className={`${style.wrapper}`}>
          <div id="section-1">
            <div className="container-fluid p-0">
              <div className="row mt-5">
                <div className="col-md-12">
                  <div>
                    <h1 className={`${style.banner_heading}`}>
                      Let's Get Started!
                    </h1>
                  </div>

                  <div className="row">
                    <div className="col-md-6 cutom_p_section">
                      <p className={`${style.custom_paragraph_first}`}>
                        Use our partner pharmacy to get <br /> your POGO
                        Automatic® Monitor using your <br /> private health
                        insurance (Medicare and <br /> Medicaid not currently
                        eligible) and{" "}
                        <b>
                          pay no <br /> more than $49.99 for up to 100 tests.
                        </b>{" "}
                         
                      </p>
                      <div>
                        <p className={`${style.custom_paragraph} mb-0"`}>
                          And with our partner pharmacy, Health Haven <br />{" "}
                          Pharmacy, you can:
                        </p>
                        <div>
                          <ul className={`${style.unordr_list} p-0`}>
                            <li className="custom_list mt-3">
                              Enjoy the convenience of free direct shipping with
                              a monthly refill option
                            </li>
                            <li className="custom_list mt-3">
                              Trust an accredited pharmacy committed to
                              excellence
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 custom_column">
                      <div className="et_pb_image_container">
                        <img
                          src={bannerImage}
                          height="290px"
                          className="float-end"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid cutom_p_section p-0">
            <div className="row">
              <div className="col lp_infographic_content">
                <h2 className={`${style.custom_main_heading}`}>
                  Follow these steps for your prescription:
                </h2>
              </div>
              <div className="col-md-12 lp_infographic_container">
                <img
                  src={lowerbannerImage}
                  alt=""
                  className="LP_infographic mb-4"
                  width="100%"
                />
                <p>
                  To request your POGO Automatic, simply fill out the form below
                  and Health Haven Pharmacy will acquire your prescription from
                  your physician and confirm your health insurance coverage.
                </p>
              </div>
            </div>
          </div>
          <div id="form-section" className={`${style.form_section}`}>
            <div className={`container-fluid p-0`}>
              <h1>Your Information</h1>
              <hr />
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className={`${style.required} form-label`}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="patientFirstName"
                        aria-describedby="Patient First Name"
                        placeholder="First"
                        name="patientFirstName"
                        value={formik.values.patientFirstName.toString()}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.patientFirstName &&
                            errors?.patientFirstName
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(
                          errors,
                          "patientFirstName",
                          errorMessage
                        )}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientFirstName && (
                        <p className="invalid">{errors.patientFirstName}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 mt-2">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      ></label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        aria-describedby="emailHelp"
                        placeholder="Last"
                        name="patientLastName"
                        value={formik.values.patientLastName.toString()}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.patientLastName &&
                            errors?.patientLastName
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(
                          errors,
                          "patientLastName",
                          errorMessage
                        )}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientLastName && (
                        <p className="invalid">{errors.patientLastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="col-md-12">
                        <label
                          htmlFor="exampleInputEmail1"
                          className={`${style.required} form-label`}
                        >
                          Date of Birth
                        </label>
                      </div>
                      <div className="col-md-12">
                        <DatePicker
                          selected={formik.values.patientDob} // Pass the selected date value
                          onChange={(date) => {
                            formik.setFieldValue("patientDob", date); // Set the formik field value
                          }}
                          maxDate={new Date()}
                          onBlur={formik.handleBlur}
                          className="form-control"
                          id="dateOfBirth"
                          aria-describedby="emailHelp"
                          placeholderText="Select Date" // Placeholder text for the date picker
                          name="patientDob"
                          style={{
                            width: "100%",
                            ...getStyles(errors, "patientDob", errorMessage),
                          }}
                          dateFormat="MM-dd-yyyy" // Specify the date format if needed
                          data-validation-required-message="This field is required"
                        />
                      </div>

                      {errors?.patientDob && (
                        <p className="invalid">{errors.patientDob}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className={`${style.required} form-label`}
                      >
                        Your Email Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="YourEmail@Example.com"
                        name="patientEmail"
                        value={formik.values.patientEmail.toString()}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.patientEmail &&
                            errors?.patientEmail
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(errors, "patientEmail", errorMessage)}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientEmail && (
                        <p className="invalid">{errors.patientEmail}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className={`${style.required} form-label`}
                      >
                        Your Mobile Phone Number
                      </label>
                      <PhoneInput
                        className={`${
                          errors?.patientPhone ? style.test_error : ""
                        }`}
                        onlyCountries={["us"]}
                        value={formik.values.patientPhone}
                        onChange={(value) => {
                          // Concatenate "+" with the received value
                          const formattedValue = `+${value}`;
                          if (value.startsWith("+1")) {
                            // Set the formatted value to the formik field
                            formik.setFieldValue("patientPhone", value);
                          } else {
                            // Optionally, you can provide feedback to the user or handle the invalid input in some way
                            console.log(
                              "Invalid phone number. Please enter a US number starting with +1"
                            );
                          }
                          // Set the formatted value to the formik field
                          formik.setFieldValue("patientPhone", formattedValue);

                          // Set the field as touched
                          formik.setFieldTouched("patientPhone", true);
                        }}
                      />
                      {errors?.patientPhone && (
                        <p className="invalid">{errors.patientPhone}</p>
                      )}
                      {/* {formik.touched.patientPhone &&
                        formik.errors.patientPhone && (
                          <p className="invalid">
                            {formik.errors.patientPhone}
                          </p>
                        )} */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className={`${style.required} form-label`}
                      >
                        Your Shipping Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Street Address"
                        name="patientStreetAddress"
                        value={formik.values.patientStreetAddress}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.patientStreetAddress &&
                            errors?.patientStreetAddress
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(
                          errors,
                          "patientStreetAddress",
                          errorMessage
                        )}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientStreetAddress && (
                        <p className="invalid">{errors.patientStreetAddress}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 mt-2">
                      <label htmlFor=""></label>
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Apartment, suite, etc."
                        name="patientSecondaryAddress"
                        value={formik.values.patientSecondaryAddress}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.patientSecondaryAddress &&
                            errors?.patientSecondaryAddress
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(
                          errors,
                          "patientSecondaryAddress",
                          errorMessage
                        )}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientSecondaryAddress && (
                        <p className="invalid">
                          {errors.patientSecondaryAddress}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="City"
                        name="patientCity"
                        value={formik.values.patientCity}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.patientCity &&
                            errors?.patientCity
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(errors, "patientCity", errorMessage)}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientCity && (
                        <p className="invalid">{errors.patientCity}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className={`mb-3 pogo-select position-relative`}>
                      {formik.values.patientStateId == "" && (
                        <label
                          htmlFor=""
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            top: "5px",
                            left: "10px",
                            fontWeight: "400",
                            color: "gray",
                          }}
                        >
                          Patient State
                        </label>
                      )}

                      <Select
                        className={`${
                          errors?.patientStateId ? style.test_error : ""
                        }`}
                        placeholder="State"
                        name="patientStateId"
                        options={physicianStates?.map((st) => ({
                          value: st.id,
                          label: st.name,
                        }))}
                        value={{
                          label:
                            physicianStates.find(
                              (st) => st.id == formik.values.patientStateId
                            )?.name || "",
                          value:
                            formik?.values?.patientStateId !== ""
                              ? formik?.values?.patientStateId
                              : null,
                        }}
                        onChange={(e) => {
                          formik.setFieldValue("patientStateId", `${e.value}`);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.patientStateId &&
                            errors?.patientStateId
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={{
                          ...getStyles(errors, "patientStateId", errorMessage),
                          border: errors?.patientStateId
                            ? "1px solid red"
                            : "initial", // Add border color based on the presence of errors
                        }}
                        className={errors?.patientStateId ? "redBorder" : ""}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientStateId && (
                        <p className="invalid">{errors.patientStateId}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Zip Code"
                        name="patientZipCode"
                        value={formik.values.patientZipCode}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.patientZipCode &&
                            errors?.patientZipCode
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(
                          errors,
                          "patientZipCode",
                          errorMessage
                        )}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientZipCode && (
                        <p className="invalid">{errors.patientZipCode}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h1>Physician's Information</h1>
                    <hr />
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className={`${style.required} form-label`}
                      >
                        Physician Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="First and Last Name"
                        name="physicanName"
                        value={formik.values.physicanName}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.physicanName &&
                            errors?.physicanName
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(errors, "physicanName", errorMessage)}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.physicanName && (
                        <p className="invalid">{errors.physicanName}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className={`${style.required} form-label`}
                      >
                        Physician City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="City"
                        name="physicanCity"
                        value={formik.values.physicanCity}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.physicanCity &&
                            errors?.physicanCity
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(errors, "physicanCity", errorMessage)}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.physicanCity && (
                        <p className="invalid">{errors.physicanCity}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className={`${style.required} form-label`}
                      >
                        Physician State
                      </label>
                      <div
                        className={`${style.select} pogo-select position-relative`}
                      >
                        {formik.values.physicanStateId == "" && (
                          <label
                            htmlFor=""
                            style={{
                              position: "absolute",
                              zIndex: "1",
                              top: "5px",
                              left: "10px",
                              fontWeight: "400",
                              color: "gray",
                            }}
                          >
                            Physician State
                          </label>
                        )}
                        <Select
                          className={`${
                            errors?.physicanStateId ? style.test_error : ""
                          }`}
                          placeholder="State"
                          name="physicanStateId"
                          options={physicianStates?.map((st) => ({
                            value: st.id,
                            label: st.name,
                          }))}
                          value={{
                            label:
                              physicianStates.find(
                                (st) => st.id == formik.values.physicanStateId
                              )?.name || undefined,
                            value: formik.values.physicanStateId || undefined,
                          }}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "physicanStateId",
                              `${e.value}`
                            );
                            formik.handleBlur(e);
                            if (
                              !formik.errors.physicanStateId &&
                              errors?.physicanStateId
                            ) {
                              const { name, ...remainingErrors } = errors;
                              setErrors(remainingErrors);
                            }
                          }}
                          style={getStyles(
                            errors,
                            "physicanStateId",
                            errorMessage
                          )}
                          data-validation-required-message="This field is required"
                        />
                        {errors?.physicanStateId && (
                          <p className="invalid">{errors.physicanStateId}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Physician Phone Number
                      </label>
                      <PhoneInput
                        className={`${
                          errors?.physicanPhone ? style.test_error : ""
                        }`}
                        // onlyCountries={["us"]}
                        // country={"us"} // Set the default country to US
                        value={formik.values.physicanPhone}
                        onChange={(value) => {
                          // Concatenate "+1" with the received value
                          const formattedValue = `+${value}`;

                          // Set the formatted value to the formik field
                          formik.setFieldValue("physicanPhone", formattedValue);

                          // Set the field as touched
                          formik.setFieldTouched("physicanPhone", true);
                        }}
                      />

                      {errors?.physicanPhone && (
                        <p className="invalid">{errors.physicanPhone}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h1>Health Insurance Card Information</h1>
                    <hr />
                    <p>
                      <i>
                        Please refer to your insurance card for these details.
                      </i>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 mt-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Patient ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Your ID # on card"
                        name="patientCardId"
                        value={formik.values.patientCardId}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.patientCardId &&
                            errors?.patientCardId
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(errors, "patientCardId", errorMessage)}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientCardId && (
                        <p className="invalid">{errors.patientCardId}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6" />
                  <div className="col-md-4">
                    <div className="mb-3 mt-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Rx BIN
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        name="patientRxBin"
                        value={formik.values.patientRxBin}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.patientRxBin &&
                            errors?.patientRxBin
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(errors, "patientRxBin", errorMessage)}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientRxBin && (
                        <p className="invalid">{errors.patientRxBin}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3 mt-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        PCN
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        name="patientPcn"
                        value={formik.values.patientPcn}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (!formik.errors.patientPcn && errors?.patientPcn) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(errors, "patientPcn", errorMessage)}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientPcn && (
                        <p className="invalid">{errors.patientPcn}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3 mt-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Rx Group
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        name="patientRxGroup"
                        value={formik.values.patientRxGroup}
                        onChange={(e) => {
                          formik.handleChange(e);
                          formik.handleBlur(e);
                          if (
                            !formik.errors.patientRxGroup &&
                            errors?.patientRxGroup
                          ) {
                            const { name, ...remainingErrors } = errors;
                            setErrors(remainingErrors);
                          }
                        }}
                        style={getStyles(
                          errors,
                          "patientRxGroup",
                          errorMessage
                        )}
                        data-validation-required-message="This field is required"
                      />
                      {errors?.patientRxGroup && (
                        <p className="invalid">{errors.patientRxGroup}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3 form-check ps-0">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        name="firstCheckBox"
                        value={formik.values.firstCheckBox}
                        onChange={formik.handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        SIGN UP FOR TEXT MESSAGES FROM POGO AUTOMATIC. By
                        checking this box, you agree to recieve recurring
                        automated promotional and personalized marketing text
                        messages from POGO Automatic at the cell number used
                        when signing up. Consent is not a condition of any
                        purchase. Reply HELP for help and STOP to cancel. Msg
                        frequency varies. Msg & data rates may apply
                        <small className="d-block">
                          View{" "}
                          <a
                            style={{ textDecoration: "underline" }}
                            href="https://attnl.tv/p/HUD"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Privacy Policy
                          </a>{" "}
                          and{" "}
                          <a
                            style={{ textDecoration: "underline" }}
                            href="https://attnl.tv/t/HUD"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Terms of Service
                          </a>
                        </small>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3 form-check ps-0">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck2"
                        name="secondCheckBox"
                        checked={formik.values.secondCheckBox || false}
                        value={formik.values.secondCheckBox}
                        onChange={(e) => {
                          formik.handleChange(e); // Pass the event to handleChange
                          handleCheckboxChange();
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck2"
                      >
                        By checking this box, I am authorizing Health Haven
                        Pharmacy, POGO Automatic, or their partners to contact
                        my insurance company or doctor's office on my behalf in
                        order to facilitate obtaining the product. I understand
                        that Health Haven Pharmacy or their partners may contact
                        me via phone, autocall, text, or email regarding this
                        prescription.
                      </label>

                      {!isChecked && (
                        <div className="mt-3">
                          <span className={`${style.not_checked}`}>
                            This box must be checked in order for Health Haven
                            Pharmacy to verify your benefits coverage.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3 form-check ps-0">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck3"
                        checked={isChecked1}
                        value={formik.values.thirdCheckBox}
                        onChange={(e) => {
                          handleCheckboxChange1();
                          formik.handleChange(e);
                        }}
                        name="thirdCheckBox"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck3"
                      >
                        Keep me up to date on news and offers on POGO Automatic.
                        <small className="d-block">
                          View POGO Automatic / Intuity Medical{" "}
                          <a
                            style={{ textDecoration: "underline" }}
                            href="https://presspogo.com/pages/privacy-policy"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Privacy Policy
                          </a>{" "}
                          and{" "}
                          <a
                            style={{ textDecoration: "underline" }}
                            href="https://presspogo.com/pages/term-of-use"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Terms of Service
                          </a>
                        </small>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <button
                      type="submit"
                      className="btn btn-primary my-4"
                      style={{
                        backgroundColor: "#27AAE1",
                        borderRadius: "0px",
                      }}
                      disabled={!isChecked || isLoader}
                    >
                      Submit &nbsp;
                      {isLoader == true && (
                        <span
                          className="spinner-border spinner-border-sm ml-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                    </button>
                  </div>

                  <div className="col-md-6 mb-2">
                    <div className="text-end">
                      <img
                        src={logoHealthHaven}
                        height="100"
                        width="120"
                        className="float-end"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
        <div>
          <Footer />
        </div>
      </div>
    </section>
  );
}

export default Pogo;
