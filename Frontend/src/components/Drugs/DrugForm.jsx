import React, { useEffect } from "react";
import Joi from "joi";
import { getIn, useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationDialog from "../ConfirmationDialog";
import { Link, useParams, useHistory } from "react-router-dom";
import { createDrug } from "../../redux/drugs/actions/drugsActions";
import { updateDrug } from "../../redux/drugs/actions/drugsActions";
import { fetchDrugTypes } from "../../redux/drugType/actions/drugTypeActions";
import { fetchDrugForms } from "../../redux/drugForm/actions/drugFormActions";
import { fetchDrugClasses } from "../../redux/drugClass/actions/drugClassActions";
import { fetchDrugCategories } from "../../redux/drugCategory/actions/drugCategoryActions";
import { fetchAgeGroups } from "../../redux/ageGroup/actions/ageGroupAction";
import { fetchDrugDetails } from "../../redux/drugs/actions/drugsActions";

const DrugForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  React.useEffect(() => {
    if (typeof id !== "undefined") {
      dispatch(fetchDrugDetails(id));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDrugTypes());
    dispatch(fetchDrugForms());
    dispatch(fetchDrugCategories());
    dispatch(fetchDrugClasses());
    dispatch(fetchAgeGroups());
  }, []);

  const drugTypes = useSelector((state) => state.drugType.drugTypes);
  const drugForms = useSelector((state) => state.drugForm.drugForms);
  const drugClasses = useSelector((state) => state.drugClass.drugClasses);
  const ageGroups = useSelector((state) => state.ageGroup.ageGroups);
  const drugCategorys = useSelector(
    (state) => state.drugCategory.drugCategories
  );
  const drugDetail = useSelector((state) => state.drugs.drugDetail);
  let initialValues = {};
  if (typeof id !== "undefined") {
    initialValues = {
      name: drugDetail && drugDetail.name,
      label: drugDetail && drugDetail.label,
      price: drugDetail && drugDetail.price,
      quantity: drugDetail && drugDetail.quantity,
      ndc: drugDetail && drugDetail.ndc,
      dosage: drugDetail && drugDetail.dosage,
      drugFormId: drugDetail && drugDetail.drugFormId,
      drugCategoryId: drugDetail && drugDetail.drugCategoryId,
      drugClassId: drugDetail && drugDetail.drugClassId,
      drugTypeId: drugDetail && drugDetail.drugTypeId,
      ageGroupId: drugDetail && drugDetail.ageGroupId,
      refillable: drugDetail && drugDetail.refillable,
      refillLimit: drugDetail && drugDetail.refillLimit,
      tierOne: drugDetail && drugDetail.tierOne,
      tierTwo: drugDetail && drugDetail.tierTwo,
      tierThree: drugDetail && drugDetail.tierThree,
      tierFour: drugDetail && drugDetail.tierFour,
      tierFive: drugDetail && drugDetail.tierFive,
      erxRequired: drugDetail && drugDetail.erxRequired,
      active: drugDetail && drugDetail.active,
      minQuantity: drugDetail && drugDetail.minQuantity,
      maxQuantity: drugDetail && drugDetail.maxQuantity,
      quantityAllowed: drugDetail && drugDetail.quantityAllowed,
    };
  } else {
    initialValues = {
      name: "",
      label: "",
      price: "",
      quantity: "",
      ndc: "",
      dosage: "",
      drugFormId: "",
      drugCategoryId: "",
      drugClassId: "",
      drugTypeId: "",
      ageGroupId: "",
      refillable: "",
      refillLimit: "",
      tierOne: "",
      tierTwo: "",
      tierThree: "",
      tierFour: "",
      tierFive: "",
      erxRequired: "",
      active: "",
      minQuantity: "",
      maxQuantity: "",
      quantityAllowed: "",
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
    // loading: false,

    onSubmit: async (values) => {
      const validationSchema = Joi.object({
        name: Joi.string().required().messages({
          "string.base": "Name should be a string.",
          "string.empty": "Name is not allowed to be empty.",
          "any.required": "Name is required.",
        }),
        label: Joi.string().required().messages({
          "string.base": "Label should be a string.",
          "string.empty": "Label is not allowed to be empty.",
          "any.required": "Label is required.",
        }),
        price: Joi.string().required().messages({
          "string.base": "Price should be a string.",
          "string.empty": "Price is not allowed to be empty.",
          "any.required": "Price is required.",
        }),
        quantity: Joi.string().required().messages({
          "string.base": "Quantity should be a string.",
          "string.empty": "Quantity is not allowed to be empty.",
          "any.required": "Quantity is required.",
        }),
        ndc: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .required()
          .messages({
            "string.length": "NDC must be exactly 10 dig.",
            
          }),
        dosage: Joi.string().required().messages({
          "string.base": "Address should be a string.",
          "string.empty": "Address is not allowed to be empty.",
          "any.required": "Address is required.",
        }),
        drugFormId: Joi.number().integer().required().messages({
          "any.required": "Drug Forms required.",
        }),
        drugCategoryId: Joi.number().integer().required().messages({
          "any.required": "Drug Category required.",
        }),
        drugClassId: Joi.number().integer().required().messages({
          "any.required": "Drug Class required.",
        }),
        drugTypeId: Joi.number().integer().required().messages({
          "any.required": "Drug Type required.",
        }),
        ageGroupId: Joi.number().integer().required().messages({
          "any.required": "Age Group required.",
        }),
        refillable: Joi.boolean().required().messages({
          "boolean.base":
            '"Refillable" must be a boolean value (true or false)',
          "any.required": '"Refillable" is required',
        }),
        refillLimit: Joi.number().integer().required().messages({
          "number.base": '"RefillLimit" must be a number',
          "number.integer": '"RefillLimit" must be an integer',
          "any.required": '"RefillLimit" is required',
        }),
        tierOne: Joi.number().integer().required().messages({
          "number.base": '"Tear One" must be a number',
          "number.integer": '"Tear One" must be an integer',
          "any.required": '"Tear One" is required',
        }),
        tierTwo: Joi.number().integer().required().messages({
          "number.base": '"Tear Two" must be a number',
          "number.integer": '"Tear Two" must be an integer',
          "any.required": '"Tear Two" is required',
        }),
        tierThree: Joi.number().integer().required().messages({
          "number.base": '"Tear Three" must be a number',
          "number.integer": '"Tear Three" must be an integer',
          "any.required": '"Tear Three" is required',
        }),
        tierFour: Joi.number().integer().required().messages({
          "number.base": '"Tear Four" must be a number',
          "number.integer": '"Tear Four" must be an integer',
          "any.required": '"Tear Four" is required',
        }),
        tierFive: Joi.number().integer().required().messages({
          "number.base": '"Tear Five" must be a number',
          "number.integer": '"Tear Five" must be an integer',
          "any.required": '"Tear Five" is required',
        }),
        erxRequired: Joi.number().integer().required().messages({
          "number.base": '"Erx_Required" must be a number',
          "number.integer": '"Erx_Required" must be an integer',
          "any.required": '"Erx_Required" is required',
        }),
        active: Joi.boolean().required().messages({
          "boolean.base": '"Active" must be a boolean value (true or false)',
          "any.required": '"Active" is required',
        }),
        minQuantity: Joi.number().integer().required().messages({
          "number.base": '"Min Qunatity" must be a number',
          "number.integer": '"Min Qunatity" must be an integer',
          "any.required": '"Min Qunatity" is required',
        }),
        maxQuantity: Joi.number().integer().required().messages({
          "number.base": '"Max Qunatity" must be a number',
          "number.integer": '"Max Qunatity" must be an integer',
          "any.required": '"Max Qunatity" is required',
        }),
        quantityAllowed: Joi.number().integer().required().messages({
          "number.base": '"Qunatity Allowed" must be a number',
          "number.integer": '"Qunatity Allowed" must be an integer',
          "any.required": '"Qunatity Allowed" is required',
        }),
      }).options({ abortEarly: false });

      const { error } = validationSchema.validate(values);
      const {
        name,
        label,
        price,
        quantity,
        ndc,
        dosage,
        drugFormId,
        drugCategoryId,
        drugClassId,
        drugTypeId,
        ageGroupId,
        refillable,
        refillLimit,
        tierOne,
        tierTwo,
        tierThree,
        tierFour,
        tierFive,
        erxRequired,
        active,
        minQuantity,
        maxQuantity,
        quantityAllowed,
      } = values;

      const validationErrors = {};
      if (error) {
        error.details.forEach((detail) => {
          validationErrors[detail.path[0]] = detail.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({});
        // formik.setFieldValue("loading", true);
        if (typeof id !== "undefined") {
          try {
            await dispatch(
              updateDrug(id, {
                name,
                label,
                price,
                quantity,
                ndc,
                dosage,
                drugFormId,
                drugCategoryId,
                drugClassId,
                drugTypeId,
                ageGroupId,
                refillable,
                refillLimit,
                tierOne,
                tierTwo,
                tierThree,
                tierFour,
                tierFive,
                erxRequired,
                active,
                minQuantity,
                maxQuantity,
                quantityAllowed,
              })
            );
            history.push("/app/admin/drug/drugs");
          } catch (error) {
            setErrors(error);
          }
        } else {
          try {
            await dispatch(
              createDrug({
                name,
                label,
                price,
                quantity,
                ndc,
                dosage,
                drugFormId,
                drugCategoryId,
                drugClassId,
                drugTypeId,
                ageGroupId,
                refillable,
                refillLimit,
                tierOne,
                tierTwo,
                tierThree,
                tierFour,
                tierFive,
                erxRequired,
                active,
                minQuantity,
                maxQuantity,
                quantityAllowed,
              })
            );
            history.push("/app/admin/drug/drugs");
          } catch (error) {
            setErrors(error);
          }
          // formik.setFieldValue("loading", true);
        }
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
            <h4 className="page-title">Add New Drug</h4>

            <div className="d-inline-block align-items-center">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">
                      <i className="mdi mdi-home-outline"></i>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link to="/app/admin/drug/drugs">Drugs</Link>
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
            <h4 className="box-title">Drug Details</h4>
          </div>
          <div className="box-body">
            <div className="row">
              <div className="col">
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
                            className="form-control"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.name) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "name", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.name && (
                            <p className="invalid">{errors.name}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Label
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="label"
                            className="form-control"
                            value={formik.values.label}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.label) {
                                if (errors?.name) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "label", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.label && (
                            <p className="invalid">{errors.label}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Price
                          <span className="text-danger">*</span>
                        </h5>
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
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "price", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.price && (
                            <p className="invalid">{errors.price}</p>
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
                          NDC
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="tel"
                            name="ndc"
                            className="form-control"
                            maxLength="10"
                            value={formik.values.ndc}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.ndc) {
                                if (errors?.ndc) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "ndc", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.ndc && (
                            <p className="invalid">{errors.ndc}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Dosage
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="dosage"
                            className="form-control"
                            value={formik.values.dosage}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.dosage) {
                                if (errors?.dosage) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "dosage", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.dosage && (
                            <p className="invalid">{errors.dosage}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="box-header with-border mb-20">
                      <h4 className="box-title">Drug Mapping</h4>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Drug Form <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="drugFormId"
                            id="drugFormId"
                            value={formik.values.drugFormId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.drugFormId) {
                                if (errors?.drugFormId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "drugFormId",
                              errorMessage
                            )}
                            className="form-select"
                          >
                            <option>Select Drug Form</option>
                            {drugForms &&
                              drugForms.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.name}
                                </option>
                              ))}
                          </select>
                          {errors?.drugFormId && (
                            <p className="invalid">{errors.drugFormId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Drug Type <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="drugTypeId"
                            id="drugTypeId"
                            value={formik.values.drugTypeId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.drugTypeId) {
                                if (errors?.drugTypeId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "drugTypeId",
                              errorMessage
                            )}
                            className="form-select"
                          >
                            <option>Select Drug Type</option>
                            {drugTypes &&
                              drugTypes.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.name}
                                </option>
                              ))}
                          </select>
                          {errors?.drugTypeId && (
                            <p className="invalid">{errors.drugTypeId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Drug Category <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="drugCategoryId"
                            id="drugCategoryId"
                            value={formik.values.drugCategoryId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.drugCategoryId) {
                                if (errors?.drugCategoryId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "drugCategoryId",
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
                          {errors?.drugCategoryId && (
                            <p className="invalid">{errors.drugCategoryId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Drug Class <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="drugClassId"
                            id="drugClassId"
                            value={formik.values.drugClassId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.drugClassId) {
                                if (errors?.drugClassId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "drugClassId",
                              errorMessage
                            )}
                            className="form-select"
                          >
                            <option>Select Drug Class</option>
                            {drugClasses &&
                              drugClasses.map((st) => (
                                <option value={st.id} key={st.id}>
                                  {st.name}
                                </option>
                              ))}
                          </select>
                          {errors?.drugClassId && (
                            <p className="invalid">{errors.drugClassId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Age Groups <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <select
                            name="ageGroupId"
                            id="ageGroupId"
                            value={formik.values.ageGroupId}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.ageGroupId) {
                                if (errors?.ageGroupId) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "ageGroupId",
                              errorMessage
                            )}
                            className="form-select"
                          >
                            <option>Select Age Groups</option>
                            {/* TODO: add ageGroups  */}
                            {ageGroups &&
                              ageGroups.map((a) => (
                                <option value={a.id} key={a.id}>
                                  {a.name}
                                </option>
                              ))}
                          </select>
                          {errors?.ageGroupId && (
                            <p className="invalid">{errors.ageGroupId}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="box-header with-border mb-20">
                      <h4 className="box-title">Tier Pricing</h4>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Tier One
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="tierOne"
                            className="form-control"
                            value={formik.values.tierOne}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.tierOne) {
                                if (errors?.tierOne) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "tierOne", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.tierOne && (
                            <p className="invalid">{errors.tierOne}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Tier Two
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="tierTwo"
                            className="form-control"
                            value={formik.values.tierTwo}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.tierTwo) {
                                if (errors?.tierTwo) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "tierTwo", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.tierTwo && (
                            <p className="invalid">{errors.tierTwo}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Tier Three
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="tierThree"
                            className="form-control"
                            value={formik.values.tierThree}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.tierThree) {
                                if (errors?.tierThree) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "tierThree", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.tierThree && (
                            <p className="invalid">{errors.tierThree}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Tier Four
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="tierFour"
                            className="form-control"
                            value={formik.values.tierFour}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.tierFour) {
                                if (errors?.tierFour) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "tierFour", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.tierFour && (
                            <p className="invalid">{errors.tierFour}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Tier Five
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="tierFive"
                            className="form-control"
                            value={formik.values.tierFive}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.tierFive) {
                                if (errors?.tierFive) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(errors, "tierFive", errorMessage)}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.tierFive && (
                            <p className="invalid">{errors.tierFive}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="box-header with-border mb-20">
                      <h4 className="box-title">Drug Api Setting</h4>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Erx Required
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="erxRequired"
                            className="form-control"
                            value={formik.values.erxRequired}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.erxRequired) {
                                if (errors?.erxRequired) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "erxRequired",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.erxRequired && (
                            <p className="invalid">{errors.erxRequired}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Quantity Allowed
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="quantityAllowed"
                            className="form-control"
                            value={formik.values.quantityAllowed}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.quantityAllowed) {
                                if (errors?.quantityAllowed) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "quantityAllowed",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.quantityAllowed && (
                            <p className="invalid">{errors.quantityAllowed}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Minimum Quanitity
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="minQuantity"
                            className="form-control"
                            value={formik.values.minQuantity}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.minQuantity) {
                                if (errors?.minQuantity) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "minQuantity",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.minQuantity && (
                            <p className="invalid">{errors.minQuantity}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Maximum Quantity
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="maxQuantity"
                            className="form-control"
                            value={formik.values.maxQuantity}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.maxQuantity) {
                                if (errors?.maxQuantity) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "maxQuantity",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.maxQuantity && (
                            <p className="invalid">{errors.maxQuantity}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Refillable
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="refillable"
                              id="refillableYes"
                              value="true"
                              // checked={formik.values.refillable}
                              checked={
                                formik.values.refillable === "true" ||
                                formik.values.refillable === true
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="refillableYes"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="refillable"
                              id="refillableNo"
                              value="false"
                              //   checked={formik.values.refillable}
                              checked={
                                formik.values.refillable === "false" ||
                                formik.values.refillable === false
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="refillableNo"
                            >
                              No
                            </label>
                          </div>
                          {errors?.refillable && (
                            <p className="invalid">{errors.refillable}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Refill Limit
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <input
                            type="text"
                            name="refillLimit"
                            className="form-control"
                            value={formik.values.refillLimit}
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              if (!formik.errors.refillLimit) {
                                if (errors?.refillLimit) {
                                  const { ...remainingErrors } = errors;
                                  setErrors(remainingErrors);
                                }
                              }
                            }}
                            style={getStyles(
                              errors,
                              "refillLimit",
                              errorMessage
                            )}
                            data-validation-required-message="This field is required"
                          />
                          {errors?.refillLimit && (
                            <p className="invalid">{errors.refillLimit}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <h5>
                          Active
                          <span className="text-danger">*</span>
                        </h5>
                        <div className="controls">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="active"
                              id="activeYes"
                              value="true"
                              checked={
                                formik.values.active === "true" ||
                                formik.values.active === true
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="activeYes"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="active"
                              id="activeNo"
                              value="false"
                              checked={
                                formik.values.active === "false" ||
                                formik.values.active === false
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="activeNo"
                            >
                              No
                            </label>
                          </div>
                          {errors?.active && (
                            <p className="invalid">{errors.active}</p>
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
                          Saving&nbsp;
                          <span
                            className="spinner-border spinner-border-sm ml-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="sr-only">Loading...</span>
                        </>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DrugForm;
