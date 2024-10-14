import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  createTransfer,
  fetchTransferDetail,
  updateTransfer,
  fetchDrugs,
  fetchPatients,
  fetchPharmacies,
  fetchStatuses,
  fetchSigs,
  fetchDays,
  fetchPrerequisite
} from "../../../redux/transfer/transferActions";
import PartnerTransferForm from "./PartnerTransferForm";
import TransferDetail from "./../../Transfer/TransferDetail";
import Toast from "../../Toast";
import ToastContainerWrapper from "../../ToastContainerWrapper";

const PartnerTransfer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const transferDetail = useSelector((state) => state.transfers.transferDetail);
  const drugs = useSelector((state) => state.transfers.drugs);
  const patients = useSelector((state) => state.transfers.patients);
  const pharmacies = useSelector((state) => state.transfers.pharmacies);
  const statuses = useSelector((state) => state.transfers.statuses);
  const sigs = useSelector((state) => state.transfers.sigs);
  const days = useSelector((state) => state.transfers.days);
  const getPrerequisite = useSelector((state) => state.transfers.transferPrequesite);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  let { id } = useParams();
  const isEditMode = window.location.pathname.includes("edit");

  React.useEffect(() => {
    const fetchData = async () => {
      if (typeof id !== "undefined") {
        await dispatch(fetchTransferDetail(id));
      }

      // Dispatch other actions in parallel for improved efficiency
      await Promise.all([
        dispatch(fetchPrerequisite()),
        dispatch(fetchDrugs()),
        dispatch(fetchPatients()),
        dispatch(fetchPharmacies()),
        dispatch(fetchStatuses()),
        dispatch(fetchSigs()),
        dispatch(fetchDays()),
      ]);
    };

    fetchData();
  }, [dispatch, id]);

  const handleFormSubmit = async (formData) => {
    if (id) {
      try {
        await dispatch(updateTransfer(id, formData));
        setErrorMessage("");
        Toast({ type: "success", message: "Transfer updated successfully" });
      } catch (error) {
        if (error !== "User canceled") {
          setErrorMessage(error);
          setSuccessMessage("");
          Toast({ type: "error", message: "Failed to update transfer" });
        }
      }
    } else {
      try {
        await dispatch(createTransfer(formData));
        setErrorMessage("");
        history.push("/app/partner/transfers");
      } catch (error) {
        if (error !== "User canceled") {
          setErrorMessage(error);
          setSuccessMessage("");
        }
      }
    }
  };

  return (
    <>
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              {typeof id !== "undefined" && transferDetail ? (
                <h4 className="page-title">
                  {isEditMode ? "Edit " : "View "}Transfer
                </h4>
              ) : (
                <h4 className="page-title">Add New Transfer</h4>
              )}
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/partner">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link to="/app/partner/transfers">Transfers</Link>
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
                  {successMessage && (
                    <div className="p-20">
                      <p className="alert alert-info" role="alert">
                        {successMessage}
                      </p>
                    </div>
                  )}
                  {true &&
                    // Render the TransferDetail or TransferForm based on the mode
                    (isEditMode || typeof id === "undefined" ? (
                      <PartnerTransferForm
                        transferDetail={transferDetail}
                        id={id}
                        drugs={getPrerequisite && getPrerequisite.drugs}
                        patients={getPrerequisite && getPrerequisite.customers}
                        pharmacies={getPrerequisite && getPrerequisite.pharmacy}
                        statuses={statuses}
                        sigs={sigs}
                        days={days}
                        apiErrorMessage={errorMessage}
                        apiSuccessMessage={successMessage}
                        onSubmit={handleFormSubmit}
                      />
                    ) : (
                      <TransferDetail transferDetail={transferDetail} />
                    ))}

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

export default PartnerTransfer;
