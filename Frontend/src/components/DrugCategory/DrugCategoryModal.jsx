import React, { useState } from "react";
import Joi from "joi";
const schema = Joi.object({
  category: Joi.string().required().min(3).max(50).label("Category").messages({
    "string.base": "Category is not allowed to be empty.",
    "string.min": "Category name should be of alteast 3 characters.",
    "string.max": "Category name should not exceed more than 50 characters",
    "string.empty": "Category name is not allowed to be empty.",
    "any.required": "Category name is not allowed to be empty.",
  }),
});

function DrugCategoryModal({
  showModal,
  closeModal,
  category,
  setCategory,
  handleSaveCategory,
  isEditMode,
  apiErrorMessage,
}) {
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (!showModal) {
      // Clear errors when the modal is closed
      setErrors({});
    }
  }, [showModal]);

  React.useEffect(() => {
    // Set errors when apiErrorMessage changes
    console.log("Api err:", apiErrorMessage);
    if (apiErrorMessage) {
      setErrors({ category: apiErrorMessage });
    } else {
      setErrors({}); // Clear errors when there's no apiErrorMessage
    }
  }, [apiErrorMessage]);

  const validate = () => {
    const { error } = schema.validate({ category }, { abortEarly: false });

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

    handleSaveCategory();
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
      setErrors({ category: apiErrorMessage });
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
                {isEditMode ? "Edit Category" : "Add New Category"}
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
                  Category
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.category ? "is-invalid" : ""
                  }`}
                  id="nameInput"
                  placeholder="Enter category name"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setErrors({});
                  }}
                />
                {errors.category && (
                  <div className="invalid-feedback">{errors.category}</div>
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

export default DrugCategoryModal;
