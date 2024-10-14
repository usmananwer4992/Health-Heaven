import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import React from "react";

const ConfirmationDialog = (props) => {
  const { title, text, onConfirm, itemId, index, confirmText, style } = props;

  const showConfirmationDialog = () => {
    Swal.fire({
      title: title || "Are you sure?",
      text: text || "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText || "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(itemId, index);
      }
    });
  };

  return (
    <button
      onClick={showConfirmationDialog}
      className={style || "remove-button-compact"}
      type="button"
    >
      {props.children}
    </button>
  );
};

export default ConfirmationDialog;
