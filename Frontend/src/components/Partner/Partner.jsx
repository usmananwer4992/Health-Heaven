import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import Toast from "../Toast";
import ToastContainerWrapper from "../ToastContainerWrapper";
import {
  createPartner,
  fetchPartnerDetails,
  updatePartner,
  fetchStates,
  deleteShippingDetail,
} from "../../redux/partner/partnerActions";
import PartnerForm from "./PartnerForm";

const Partner = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const partnerDetail = useSelector((state) => state.partners.partnerDetail);
  const states = useSelector((state) => state.partners.states);
  const navigationRef = React.useRef(null);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  let { id } = useParams();

  React.useEffect(() => {
    dispatch(fetchStates());

    if (typeof id !== "undefined") {
      dispatch(fetchPartnerDetails(id));
    }
  }, [dispatch]);

  const handleFormSubmit = async (formData) => {
    if (id) {
      try {
        await dispatch(updatePartner(id, formData));
        // Display success toast
        Toast({ type: "success", message: "Partner updated successfully" });
        history.push("/app/admin/partners");
      } catch (error) {
        if (error !== "User canceled") {
          // Display error toast
          Toast({ type: "error", message: "Failed to update partner" });
        }
      }
    } else {
      try {
        await dispatch(createPartner(formData));
        // Display success toast
        //Toast({ type: "success", message: "Partner created successfully" });
        //setSuccessMessage("success");
        history.push("/app/admin/partners");
      } catch (error) {
        if (error !== "User canceled") {
          // Display error toast
          Toast({ type: "error", message: "Failed to create partner" });
          setErrorMessage(error);
          setSuccessMessage("");
        } else {
          setErrorMessage("");
          // Reset error message to empty if "User canceled"
        }
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
              {typeof id !== "undefined" && partnerDetail ? (
                <h4 className="page-title">Edit Partner</h4>
              ) : (
                <h4 className="page-title">Add New Partner</h4>
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
                      <Link to="/app/admin/partners">Partners</Link>
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
                  <PartnerForm
                    partnerData={partnerDetail}
                    states={states}
                    id={id}
                    apiErrorMessage={errorMessage}
                    apiSuccessMessage={successMessage}
                    removeShippingDetail={removeShippingDetail}
                    onSubmit={handleFormSubmit}
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

export default Partner;
