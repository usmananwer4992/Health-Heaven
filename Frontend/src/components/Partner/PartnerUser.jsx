import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  createPartnerUser,
  fetchPartnerUserDetails,
  updatePartnerUser,
  fetchPartners,
  fetchPartnersAll
} from "../../redux/partner/partnerActions";
import PartnerUserForm from "./PartnerUserForm";

const PartnerUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const partnerDetail = useSelector((state) => state.partners.partnerDetail);
  const partners = useSelector((state) => state.partners.listPartner);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  let { id } = useParams();
  React.useEffect(() => {

    dispatch(fetchPartnersAll());
    if (typeof id !== "undefined") {
      dispatch(fetchPartnerUserDetails(id));
    }
    return () => {};
  }, [dispatch]);
  // const handleFormSubmit = async (formData) => {
  //   try {
  //     await dispatch(createPartnerUser(formData));
  //     setErrorMessage("");
  //     //setSuccessMessage("Partner user created successfully");
  //     history.push("/app/admin/partner/users");
  //   } catch (error) {
  //     setErrorMessage(error);
  //     setSuccessMessage("");
  //   }
  // };
  const handleFormSubmit = async (formData) => {
    if (id) {
      try {
        await dispatch(updatePartnerUser(id, formData));
        setErrorMessage("");
        history.push("/app/admin/partner/users");
      } catch (error) {
        if (error !== "User canceled") {
          setErrorMessage(error);
          setSuccessMessage("");
        }
      }
    } else {
      try {
        await dispatch(createPartnerUser(formData));
        setErrorMessage("");
        //setSuccessMessage("Partner user created successfully");
        history.push("/app/admin/partner/users");
      } catch (error) {
        console.log(error);
        if (error !== "User canceled") {
          setErrorMessage(error);
          setSuccessMessage("");
        } else {
          setErrorMessage("");
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
              {typeof id !== "undefined" && partnerDetail ? (
                <h4 className="page-title">Edit Partner User</h4>
              ) : (
                <h4 className="page-title">Add New Partner User</h4>
              )}
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/admin">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link to="/app/admin/partner/users">Partner Users</Link>
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
                  <PartnerUserForm
                    partnerData={partnerDetail}
                    partners={partners && partners}
                    id={id}
                    apiErrorMessage={errorMessage}
                    apiSuccessMessage={successMessage}
                    onSubmit={handleFormSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PartnerUser;
