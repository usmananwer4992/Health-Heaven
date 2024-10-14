import React, { useState, useEffect } from "react";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Pharmacy Name should be a string.",
    "string.empty": "Pharmacy Name is not allowed to be empty.",
    "any.required": "Pharmacy Name is required.",
  }),
  phone: Joi.string().required().messages({
    "string.empty": "Phone is not allowed to be empty.",
    "any.required": "Phone is required.",
  }),
});

const PharmacyModal = ({
  showModal,
  closeModal,
  pharmacy,
  setPharmacy,
  handleSavePharmacy,
  isEditMode,
  apiErrorMessage,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = schema.validate(
      { name: pharmacy?.name, phone: pharmacy?.phone },
      options
    );

    if (!error) return null;

    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }

    return validationErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();

    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    handleSavePharmacy();
  };

  useEffect(() => {
    if (showModal) {
      // Handle the modal visibility using Bootstrap's default behavior
      const modalElement = document.getElementById("modal-center");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      if (apiErrorMessage) {
        // Assuming apiErrorMessage is an object with fields like name, phone, etc.
        setErrors({ ...apiErrorMessage });
      }
    }
  }, [showModal, apiErrorMessage]);

  return (
    <>
      <div
        className={`modal center-modal ${showModal ? "show" : "fade"}`}
        id="modal-center"
        tabIndex="-1"
        aria-hidden="true"
        onClick={closeModal}
      >
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditMode ? "Edit Pharmacy" : "Add New Pharmacy"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                  Pharmacy Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="nameInput"
                  placeholder="Enter Pharmacy Name"
                  value={pharmacy && pharmacy.name}
                  onChange={(e) => {
                    setPharmacy({ ...pharmacy, name: e.target.value });
                    setErrors({ ...errors, name: "" }); // Clear the error on change
                  }}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="phoneInput" className="form-label">
                  Pharmacy Phone
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  id="phoneInput"
                  placeholder="Enter Pharmacy Phone"
                  value={pharmacy && pharmacy.phone}
                  onChange={(e) => {
                    setPharmacy({ ...pharmacy, phone: e.target.value });
                    setErrors({ ...errors, phone: "" }); // Clear the error on change
                  }}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {isEditMode ? "Save Changes" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacyModal;
