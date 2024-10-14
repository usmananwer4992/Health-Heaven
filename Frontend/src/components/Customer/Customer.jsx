import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  createPartner,
  deleteShippingDetail,
  fetchPartnerDetails,
  fetchStates,
  updatePartner,
} from "../../redux/partner/partnerActions";
import { fetchCustomerDetails } from "../../redux/customer.slice";
import Toast from "../Toast";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import CustomerForm from "./CustomerForm";
import ToastContainerWrapper from "../ToastContainerWrapper";
const Customer = () => {
  const dispatch = useDispatch();
  const partnerDetail = useSelector((state) => state.partners.partnerDetail);
  const states = useSelector((state) => state.partners.states);
  const navigationRef = React.useRef(null);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  let { id } = useParams();
  React.useEffect(() => {
    dispatch(fetchStates());

    if (typeof id !== "undefined") {
      dispatch(fetchCustomerDetails(id));
    }
  }, [dispatch]);

  const handleFormSubmit = async (formData) => {
    if (id) {
      try {
        await dispatch(updatePartner(id, formData));
        // Display success toast
        Toast({ type: "success", message: "Partner updated successfully" });
      } catch (error) {
        // Display error toast
        Toast({ type: "error", message: "Failed to update partner" });
      }
    } else {
      try {
        await dispatch(createPartner(formData));
        // Display success toast
        Toast({ type: "success", message: "Partner created successfully" });
        setSuccessMessage("success");
        //        history.push("/admin/partner/list");
      } catch (error) {
        // Display error toast
        Toast({ type: "error", message: "Failed to create partner" });
        setErrorMessage(error);
        setSuccessMessage("");
      }
    }
  };

  const removeShippingDetail = async (shippingId) => {
    if (shippingId) {
      await dispatch(deleteShippingDetail(shippingId));
      Toast({ type: "success", message: "Shipping deleted successfully" });
    }
  };
  return (
    <>
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              {typeof id !== "undefined" ? (
                <h4 className="page-title">Edit Customer</h4>
              ) : (
                <h4 className="page-title">Add New Customer</h4>
              )}

              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link to="/app/admin/customers">Customer</Link>
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
              <h4 className="box-title">Details</h4>
            </div>
            <div className="box-body">
              <div className="row">
                <div className="col">
                  <CustomerForm
                    // partnerData={partnerDetail}
                    states={states}
                    // id={id}
                    // apiErrorMessage={errorMessage}
                    // apiSuccessMessage={successMessage}
                    // onSubmit={handleFormSubmit}
                  />
                  <ToastContainerWrapper />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Customer;
