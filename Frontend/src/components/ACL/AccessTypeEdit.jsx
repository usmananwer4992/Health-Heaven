import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  fetchRoleById,
  setRolePermissions,
  createRolePermissions,
  fetchRolePartnerUsers,
} from "../../redux/rolesSlice";
import ConfirmationDialog from "../ConfirmationDialog";
const labelStyle = {
  height: 0,
  minHeight: 0,
  minWidth: 0,
  paddingLeft: 0,
};
const basicRoles = ["SUPER-ADMIN", "STAFF", "PARTNER"];
const AccessTypeEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let [errors, setErrors] = React.useState();
  const [disabled, setDisabled] = useState([
    {
      moduleName: 'default',
      permission: 'read'
    }
  ])

  React.useEffect(() => {
    dispatch(fetchRoleById(id, "admin"));
    dispatch(fetchRolePartnerUsers());
  }, []);
  // window.location.reload()
  const {
    role,
    modules,
    uniquePermissions,
    modulePermissions,
    allPartnersForAccessEdit,
  } = useSelector((state) => state.roles);

  const handlePermissionChange = (module, permission) => {
    // console.log({ module, permission });
    dispatch(setRolePermissions({ module, permission }));
  };

  const navigate = useHistory();

  const submitChnages = () => {
    if (role.slug.toUpperCase() !== "ADMIN") {
      if (selectedOption !== null) {
        dispatch(
          createRolePermissions({
            partnerId: selectedOption,
            roleId: id,
            rolePermissions: modulePermissions,
            navigate,
          })
        );
      } else {
        setErrors(" Partner Is required");
      }
    } else {
      dispatch(
        createRolePermissions({
          partnerId: selectedOption,
          roleId: id,
          rolePermissions: modulePermissions,
          navigate,
        })
      );
    }
  };

  const [selectedOption, setSelectedOption] = useState(null); // Default selected option

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setErrors(null);
  };

  return (
    <>
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">
                        <i className="mdi mdi-home-outline"></i>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link to="/app/admin/access/types">Edit Privileges</Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="box">
                <div className="box-body">
                  <h4>Role: {role?.name} </h4>
                </div>
              </div>
              {role.slug === "PARTNER" && (
                <div className="box">
                  <div className="box-body">
                    <div className="form-group">
                      <h5>
                        {/* Select Partner <span className="text-danger">*</span> */}
                      </h5>
                      <div className="controls">
                        <select
                          name="stateId"
                          id="stateId"
                          value={selectedOption}
                          onChange={handleSelectChange}
                          className="form-select"
                        >
                          <option>Select Partner....</option>
                          {allPartnersForAccessEdit &&
                            allPartnersForAccessEdit.map((st) => (
                              <option value={st.id} key={st.id}>
                                {st.name}
                              </option>
                            ))}
                        </select>
                        {errors && <p className="invalid">{errors}</p>}
                      </div>
                    </div>{" "}
                  </div>
                </div>
              )}
              <div className="box">
                <div className="box-body">
                  <div className="table-responsive rounded card-table">
                    <table className="table border-no" id="example1">
                      <thead>
                        <tr>
                          <th>Module Name</th>
                          {uniquePermissions.map((permission) => (
                            <th key={permission} className="text-capitalize">
                              {permission}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {modules.map((moduleName) => (
                          <tr key={moduleName} className="hover-primary">
                            <td className="text-capitalize">{moduleName}</td>
                            {uniquePermissions.map((permission) => (
                              <td key={permission}>
                                <div className="demo-checkbox">
                                  <input
                                    type="checkbox"
                                    id={permission + moduleName}
                                    defaultChecked={
                                      modulePermissions[moduleName][permission]
                                    }
                                    value={
                                      modulePermissions[moduleName][
                                        permission
                                      ] || false
                                    }
                                    onChange={() => {
                                      handlePermissionChange(
                                        moduleName,
                                        permission
                                      );
                                    }}
                                    disabled={disabled.some(item => item.moduleName === moduleName && item.permission === permission)}
                                  />
                                  <label
                                    htmlFor={permission + moduleName}
                                    style={labelStyle}
                                  >
                                    {/* {console.log(modulePermissions)} */}
                                  </label>
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="row">
                      <div className="col-sm-12 col-md-12 text-center">
                        <div className="clearfix">
                          <button
                            type="button"
                            className="waves-effect waves-light btn btn-default mb-5 w-100"
                            onClick={() => navigate.goBack()}
                          >
                            Cancel
                          </button>
                          <ConfirmationDialog
                            title="Update Role"
                            text="Are you sure you want to Update this Role?"
                            confirmText=" Yes! update it."
                            // itemId={drugCategory?.id}
                            style={"computed-button"}
                            onConfirm={submitChnages}
                          >
                            <button
                              type="button"
                              className="waves-effect waves-light btn btn-primary mb-5 w-100 ms-2"
                            >
                              Save
                            </button>
                          </ConfirmationDialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AccessTypeEdit;
