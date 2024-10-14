import React from "react";
import Joi from "joi";
import { useSelector } from "react-redux";
import { useFormik, getIn } from "formik";
import { v4 as uuidv4 } from "uuid";
import ConfirmationDialog from "../ConfirmationDialog";

const TransferForm = ({
  transferDetail,
  id,
  partners,
  drugs,
  patients,
  pharmacies,
  statuses,
  sigs,
  days,
  apiErrorMessage,
  apiSuccessMessage,
  onSubmit,
}) => {
  let initialValues = {
    drugId: "",
    partnerId: "",
    registeredPatientId: 0,
    registeredPharmacyId: 0,
    transferStatusId: 1,
    transferDayId: 1,
    sigId: 0,
    patientFirstName: "",
    patientLastName: "",
    patientEmail: "",
    patientPhone: "",
    patientDateOfBirth: "",
    pharmacyName: "",
    pharmacyPhone: "",
    providerName: "",
    providerPhone: "",
    notes: "",
    quantity: "",
    refills: "",
  };

  // Check if id and transferDetail are not empty
  if (id && transferDetail) {
    // Update initialValues with data from transferDetail.drug, transferDetail.status, transferDetail.sig, transferDetail.customer & transferDetail.pharmacy
    if (transferDetail.Drug) {
      initialValues = {
        ...initialValues,
        drugId: transferDetail.Drug.id,
      };
    }

    if (transferDetail.Partner) {
      initialValues = {
        ...initialValues,
        partnerId: transferDetail.Partner.id || "",
      };
    }

    if (transferDetail.TransferStatus) {
      initialValues = {
        ...initialValues,
        transferStatusId: transferDetail.TransferStatus.id || "",
      };
    }

    if (transferDetail.Sig) {
      initialValues = {
        ...initialValues,
        sigId: transferDetail.Sig.id || "",
      };
    }

    if (transferDetail.TransferDay) {
      initialValues = {
        ...initialValues,
        transferDayId: transferDetail.TransferDay.id || "",
      };
    }

    if (transferDetail.Customer) {
      initialValues = {
        ...initialValues,
        patientFirstName: transferDetail.Customer?.firstName || "",
        patientLastName: transferDetail.Customer?.lastName || "",
        patientEmail: transferDetail.Customer?.email || "",
        patientPhone: transferDetail.Customer?.phone || "",
        patientDateOfBirth: transferDetail.Customer?.dob || "",
        registeredPatientId: transferDetail.Customer?.id || 0,
      };
    }

    if (transferDetail.Pharmacy) {
      initialValues = {
        ...initialValues,
        pharmacyName: transferDetail.Pharmacy.name || "",
        pharmacyPhone: transferDetail.Pharmacy.phone || "",
        registeredPharmacyId: transferDetail.Pharmacy.id || 0,
      };
    }

    initialValues = {
      ...initialValues,
      providerName: transferDetail.providerName || "",
      providerPhone: transferDetail.providerPhone || "",
      notes: transferDetail.notes || "",
      refills: transferDetail.refills || "",
      quantity: transferDetail.quantity || "",
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
  const [isInputDisabled, setIsInputDisabled] = React.useState(false);
  const [isInputDisabled1, setIsInputDisabled1] = React.useState(false);
  const { errorMessage } = useSelector((state) => state.user);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,

    onSubmit: (values) => {
      const commonSchema = Joi.object({
        drugId: Joi.number().required().messages({
          "number.base": "Please select Drug",
          "number.empty": "Drug is not allowed to be empty.",
          "any.required": "Drug is not allowed to be empty.",
        }),
        partnerId: Joi.number().optional(),
        transferStatusId: Joi.number().allow(null),
        transferDayId: Joi.number().allow(null),
        sigId: Joi.number().required().messages({
          "number.base": "Please select Sigs",
          "number.empty": "Sigs is not allowed to be empty.",
          "any.required": "Sigs is not allowed to be empty.",
        }),
        registeredPatientId: Joi.number().allow(null),
        registeredPharmacyId: Joi.number().allow(null),
        patientFirstName: Joi.string().required().messages({
          "string.base": "First Name should be a string.",
          "string.empty": "First Name is not allowed to be empty.",
          "any.required": "First Name is not allowed to be empty.",
        }),
        patientLastName: Joi.string().required().messages({
          "string.base": "Last Name should be a string.",
          "string.empty": "Last Name is not allowed to be empty.",
          "any.required": "Last Name is not allowed to be empty.",
        }),
        patientPhone: Joi.string().required().messages({
          "string.base": "Phone should be a number.",
          "string.empty": "Phone is not allowed to be empty.",
          "any.required": "Phone is not allowed to be empty.",
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
        patientDateOfBirth: Joi.date().required().messages({
          "date.base": "Date of Birth should be a valid date.",
          "date.empty": "Date of Birth is not allowed to be empty.",
          "any.required": "Date of Birth is not allowed to be empty.",
        }),
        pharmacyName: Joi.string().required().messages({
          "string.base": "Pharmacy Name should be a string.",
          "string.empty": "Pharmacy Name is not allowed to be empty.",
          "any.required": "Pharmacy Name is not allowed to be empty.",
        }),
        pharmacyPhone: Joi.string().required().messages({
          "string.base": "Pharmacy Phone should be a string.",
          "string.empty": "Pharmacy Phone is not allowed to be empty.",
          "any.required": "Pharmacy Phone is not allowed to be empty.",
        }),
        // quantity: Joi.string().required().messages({
        //   "string.base": "Quantity should be a string.",
        //   "string.empty": "Quantity is not allowed to be empty.",
        //   "any.required": "Quantity is required.",
        // }),
        // refills: Joi.number().integer().optional().allow(null).messages({
        //   "any.required": "Refills is required.",
        // }),
      });

      const validationSchema = (id, values) => {
        if (typeof id !== "undefined" && id > 0) {
          return commonSchema
            .keys({
              notes: Joi.string().optional().allow(""),
              transferStatusId: Joi.number().required().messages({
                "number.base": "Please select Status",
                "number.empty": "Status is not allowed to be empty.",
                "any.required": "Status is not allowed to be empty.",
              }),
              sigId: Joi.number().required().messages({
                "number.base": "Please select Sigs",
                "number.empty": "Sigs is not allowed to be empty.",
                "any.required": "Sigs is not allowed to be empty.",
              }),
              providerName: Joi.string().optional().allow(""),
              providerPhone: Joi.string().optional().allow(""),
              quantity: Joi.string().optional().allow(""),
              refills: Joi.number().integer().optional().allow(""),
            })
            .options({ abortEarly: false });
        } else {
          return commonSchema
            .keys({
              notes: Joi.string().optional().allow(""),
              providerName: Joi.string().optional().allow(""),
              providerPhone: Joi.string().optional().allow(""),
              quantity: Joi.string().optional().allow(""),
              refills: Joi.number().integer().optional().allow(""),
              partnerId: Joi.number().required().messages({
                "number.base": "Please select Partner",
                "number.empty": "Partner is not allowed to be empty.",
                "any.required": "Partner is not allowed to be empty.",
              }),
            })
            .options({ abortEarly: false });
        }
      };
      console.log("values", values)
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
    },
  });
  const handleRegisteredPatientChange = (selectedPatientId) => {
    if (selectedPatientId === "0") {
      formik.setValues({
        ...formik.values,
        patientFirstName: "",
        patientLastName: "",
        patientEmail: "",
        patientPhone: "",
        patientDateOfBirth: "",
        registeredPatientId: 0,
      });
      setIsInputDisabled1(false);
    } else {
      const selectedPatient = patients.find(
        (patient) => patient.id == selectedPatientId
      );
      // Update form fields with selected patient's data
      formik.setValues({
        ...formik.values,
        patientFirstName: selectedPatient.firstName,
        patientLastName: selectedPatient.lastName,
        patientEmail: selectedPatient.email,
        patientPhone: selectedPatient.phone,
        patientDateOfBirth: selectedPatient.dob,
        registeredPatientId: selectedPatient.id,
      });
      setIsInputDisabled1(true);
    }
    // Find the selected patient based on the ID

    // Reset validation errors for patient-related fields
    setErrors((prevErrors) => ({
      ...prevErrors,
      patientFirstName: null,
      patientLastName: null,
      patientEmail: null,
      patientPhone: null,
      patientDateOfBirth: null,
    }));
  };

  const handleRegisteredPharmacyChange = (selectedPharmacyId) => {
    if (selectedPharmacyId === "0") {
      // If "Select Registered Pharmacy" is selected, reset values to empty strings
      formik.setValues({
        ...formik.values,
        pharmacyName: "",
        pharmacyPhone: "",
        registeredPharmacyId: 0,
      });
      setIsInputDisabled(false);
    } else {
      // Find the selected pharmacy based on the ID
      const selectedPharmacy = pharmacies.find(
        (pharmacy) => pharmacy.id == selectedPharmacyId
      );
      console.log("selectedPharmacy", selectedPharmacy);
      // Update form fields with selected pharmacy's data
      formik.setValues({
        ...formik.values,
        pharmacyName: selectedPharmacy.name,
        pharmacyPhone: selectedPharmacy.phone,
        registeredPharmacyId: selectedPharmacy.id,
      });
      setIsInputDisabled(true);
    }

    // Reset validation errors for pharmacy-related fields
    setErrors((prevErrors) => ({
      ...prevErrors,
      pharmacyName: null,
      pharmacyPhone: null,
    }));
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12">
              {!id && (
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
                      onBlur={formik.handleBlur}
                      className="form-select"
                    >
                      <option value="">Select Partner</option>
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
              )}

              <div className="form-group">
                <h5>
                  Drug <span className="text-danger">*</span>
                </h5>
                <div className="controls">
                  <select
                    name="drugId"
                    id="drugId"
                    value={formik.values.drugId}
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      if (!formik.errors.drugId) {
                        if (errors?.drugId) {
                          const { drugId, ...remainingErrors } = errors;
                          setErrors(remainingErrors);
                        }
                      }
                    }}
                    style={getStyles(errors, "drugId", errorMessage)}
                    className="form-select"
                  >
                    <option>Select Drug</option>
                    {drugs &&
                      drugs.map((drug) => (
                        <option value={drug.id} key={drug.id}>
                          {drug.name}
                        </option>
                      ))}
                  </select>
                  {errors?.drugId && <p className="invalid">{errors.drugId}</p>}
                </div>
              </div>
              <div className="form-group">
                <h5>
                  Registered Patient{" "}
                  {id ? <span className="text-danger">*</span> : null}
                </h5>
                <div className="controls">
                  <select
                    name="registeredPatientId"
                    id="registeredPatientId"
                    value={formik.values.registeredPatientId}
                    onChange={(e) => {
                      // Handle change and auto-populate patient info
                      formik.handleChange(e);
                      handleRegisteredPatientChange(e.target.value);
                    }}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      if (!formik.errors.registeredPatientId) {
                        if (errors?.registeredPatientId) {
                          const { registeredPatientId, ...remainingErrors } =
                            errors;
                          setErrors(remainingErrors);
                        }
                      }
                    }}
                    style={getStyles(
                      errors,
                      "registeredPatientId",
                      errorMessage
                    )}
                    className="form-select"
                  >
                    <option value="0">Select Registered Patient</option>
                    {patients &&
                      patients.map((patient) => (
                        <option value={patient.id} key={patient.id}>
                          {patient.firstName +
                            " " +
                            patient.lastName +
                            " / " +
                            patient.email}
                          {patient.Partner && patient.Partner.name && (
                            <> Partner: {patient.Partner.name}</>
                          )}
                        </option>
                      ))}
                  </select>
                  {errors?.registeredPatientId && (
                    <p className="invalid">{errors.registeredPatientId}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <h5>
                  Registered Pharmacy{" "}
                  {id ? <span className="text-danger">*</span> : null}
                </h5>
                <div className="controls">
                  <select
                    name="registeredPharmacyId"
                    id="registeredPharmacyId"
                    value={formik.values.registeredPharmacyId}
                    onChange={(e) => {
                      // Handle change and auto-populate patient info
                      formik.handleChange(e);
                      handleRegisteredPharmacyChange(e.target.value);
                    }}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      if (!formik.errors.registeredPharmacyId) {
                        if (errors?.registeredPharmacyId) {
                          const { registeredPharmacyId, ...remainingErrors } =
                            errors;
                          setErrors(remainingErrors);
                        }
                      }
                    }}
                    style={getStyles(
                      errors,
                      "registeredPharmacyId",
                      errorMessage
                    )}
                    className="form-select"
                  >
                    <option value="0">Select Registered Pharmacy</option>
                    {pharmacies &&
                      pharmacies.map((pharmacy) => (
                        <option value={pharmacy.id} key={pharmacy.id}>
                          {pharmacy.name}
                        </option>
                      ))}
                  </select>
                  {errors?.registeredPharmacyId && (
                    <p className="invalid">{errors.registeredPharmacyId}</p>
                  )}
                </div>
              </div>
              {/* Conditionally render the dropdown if it's an edit operation */}
              {id ? (
                <>
                  <div className="form-group">
                    <h5>
                      Transfer Status <span className="text-danger">*</span>
                    </h5>
                    <div className="controls">
                      <select
                        name="transferStatusId"
                        id="transferStatusId"
                        value={formik.values.transferStatusId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-select"
                      >
                        <option value="">Select Transfer Status</option>
                        {statuses &&
                          statuses.map((status) => (
                            <option value={status.id} key={status.id}>
                              {status.name}
                            </option>
                          ))}
                      </select>

                      {errors?.transferStatusId && (
                        <p className="invalid">{errors.transferStatusId}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="providerName">Provider Name</label>
                    <div className="controls">
                      <input
                        type="text"
                        name="providerName"
                        id="providerName"
                        className="form-control"
                        placeholder="Enter provider's name"
                        value={formik.values.providerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={getStyles(errors, "providerName", errorMessage)}
                      />
                      {errors?.providerName && (
                        <p className="invalid">{errors.providerName}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="providerPhone">Provider Phone</label>
                    <div className="controls">
                      <input
                        type="tel"
                        name="providerPhone"
                        id="providerPhone"
                        className="form-control"
                        placeholder="Enter provider's phone"
                        value={formik.values.providerPhone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={getStyles(errors, "providerPhone", errorMessage)}
                      />
                      {errors?.providerPhone && (
                        <p className="invalid">{errors.providerPhone}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <h5>
                      Sigs <span className="text-danger">*</span>
                    </h5>
                    <div className="controls">
                      <select
                        name="sigId"
                        id="sigId"
                        value={formik.values.sigId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-select"
                      >
                        <option value="0">Select Sigs</option>
                        {sigs &&
                          sigs.map((sig) => (
                            <option value={sig.id} key={sig.id}>
                              {sig.name}
                            </option>
                          ))}
                      </select>

                      {errors?.sigId && (
                        <p className="invalid">{errors.sigId}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <h5>
                      Day Supply <span className="text-danger">*</span>
                    </h5>
                    <div className="controls">
                      <select
                        name="transferDayId"
                        id="transferDayId"
                        value={formik.values.transferDayId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-select"
                      >
                        <option value="">Select Days</option>
                        {days &&
                          days.map((day) => (
                            <option value={day.id} key={day.id}>
                              {day.name}
                            </option>
                          ))}
                      </select>

                      {errors?.transferDayId && (
                        <p className="invalid">{errors.transferDayId}</p>
                      )}
                    </div>
                  </div>
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
                  <div className="form-group">
                    <h5>
                      Quantity
                      {/* <span className="text-danger">*</span> */}
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
                  <div className="form-group mb-40">
                    <h5>Replace notes with new notes</h5>
                    <div className="controls">
                      <textarea
                        name="notes"
                        id="textarea"
                        className="form-control"
                        value={formik.values.notes}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h5>Patient & Pharmacy Info</h5>
                  <div className="form-group">
                    <label htmlFor="patientFirstName">
                      Patient First Name <span className="text-danger">*</span>
                    </label>
                    <div className="controls">
                      <input
                        type="text"
                        name="patientFirstName"
                        id="patientFirstName"
                        className="form-control"
                        placeholder="Enter patient's first name"
                        value={formik.values.patientFirstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={getStyles(
                          errors,
                          "patientFirstName",
                          errorMessage
                        )}
                        disabled={isInputDisabled1}
                      />
                      {errors?.patientFirstName && (
                        <p className="invalid">{errors.patientFirstName}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="patientLastName">
                      Patient Last Name <span className="text-danger">*</span>
                    </label>
                    <div className="controls">
                      <input
                        type="text"
                        name="patientLastName"
                        id="patientLastName"
                        className="form-control"
                        placeholder="Enter patient's last name"
                        value={formik.values.patientLastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={getStyles(
                          errors,
                          "patientLastName",
                          errorMessage
                        )}
                        disabled={isInputDisabled1}
                      />
                      {errors?.patientLastName && (
                        <p className="invalid">{errors.patientLastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="patientEmail">
                      Patient Email <span className="text-danger">*</span>
                    </label>
                    <div className="controls">
                      <input
                        type="text"
                        name="patientEmail"
                        id="patientEmail"
                        className="form-control"
                        placeholder="Enter patient's email"
                        value={formik.values.patientEmail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={getStyles(errors, "patientEmail", errorMessage)}
                        disabled={isInputDisabled1}
                      />
                      {errors?.patientEmail && (
                        <p className="invalid">{errors.patientEmail}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="patientPhone">
                      Patient Phone <span className="text-danger">*</span>
                    </label>
                    <div className="controls">
                      <input
                        type="text"
                        name="patientPhone"
                        id="patientPhone"
                        className="form-control"
                        placeholder="Enter patient's Phone"
                        value={formik.values.patientPhone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={getStyles(errors, "patientPhone", errorMessage)}
                        disabled={isInputDisabled1}
                      />
                      {errors?.patientPhone && (
                        <p className="invalid">{errors.patientPhone}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="patientDateOfBirth">
                      Patient Date of Birth{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="controls">
                      <input
                        type="date"
                        name="patientDateOfBirth"
                        id="patientDateOfBirth"
                        className="form-control"
                        value={formik.values.patientDateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={getStyles(
                          errors,
                          "patientDateOfBirth",
                          errorMessage
                        )}
                        disabled={isInputDisabled1}
                      />
                      {errors?.patientDateOfBirth && (
                        <p className="invalid">{errors.patientDateOfBirth}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pharmacyName">
                      Pharmacy Name <span className="text-danger">*</span>
                    </label>
                    <div className="controls">
                      <input
                        type="text"
                        name="pharmacyName"
                        id="pharmacyName"
                        className="form-control"
                        placeholder="Enter pharmacy name"
                        value={formik.values.pharmacyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={getStyles(errors, "pharmacyName", errorMessage)}
                        disabled={isInputDisabled}
                      />
                      {errors?.pharmacyName && (
                        <p className="invalid">{errors.pharmacyName}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pharmacyPhone">
                      Pharmacy Phone <span className="text-danger">*</span>
                    </label>
                    <div className="controls">
                      <input
                        type="tel"
                        name="pharmacyPhone"
                        id="pharmacyPhone"
                        className="form-control"
                        placeholder="Enter pharmacy phone"
                        value={formik.values.pharmacyPhone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={getStyles(errors, "pharmacyPhone", errorMessage)}
                        disabled={isInputDisabled}
                      />
                      {errors?.pharmacyPhone && (
                        <p className="invalid">{errors.pharmacyPhone}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
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
  );
};

export default TransferForm;
