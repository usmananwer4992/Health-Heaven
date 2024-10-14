import React, { useState } from "react";
import Joi from "joi";

const schema = Joi.object({
  drugClass: Joi.string()
    .required()
    .min(3)
    .max(50)
    .label("Drug Class")
    .messages({
      "string.base": "Drug class is not allowed to be empty.",
      "string.min": "Drug class name should be of alteast 3 characters.",
      "string.max": "Drug class name should not exceed more than 50 characters",
      "string.empty": "Drug class name is not allowed to be empty.",
      "any.required": "Drug class name is not allowed to be empty.",
    }),
});

function DrugClassModal({
  showModal,
  closeModal,
  drugClass,
  setDrugClass,
  handleSaveClass,
  isEditMode,
  apiErrorMessage,
}) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = schema.validate({ drugClass }, options);

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

    handleSaveClass();
  };

  // Create a ref to track whether the modal has been shown
  const modalShownRef = React.useRef(false);

  // This useEffect handles showing the modal
  React.useEffect(() => {
    if (showModal && !modalShownRef.current) {
      // Handle the modal visibility using Bootstrap's default behavior
      const modalElement = document.getElementById("modal-center");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      // Update the ref to indicate that the modal has been shown
      modalShownRef.current = true;
    }
  }, [showModal]);

  // This useEffect handles setting errors
  React.useEffect(() => {
    if (apiErrorMessage) {
      setErrors({ drugClass: apiErrorMessage });
    }
  }, [apiErrorMessage]);

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
                {isEditMode ? "Edit Drug class" : "Add New Drug class"}
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
                  Drug class
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.drugClass ? "is-invalid" : ""
                  }`}
                  id="nameInput"
                  placeholder="Enter drug class name"
                  value={drugClass}
                  onChange={(e) => {
                    setDrugClass(e.target.value);
                    setErrors({});
                  }}
                />
                {errors.drugClass && (
                  <div className="invalid-feedback">{errors.drugClass}</div>
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
}

export default DrugClassModal;
