import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAllRoles } from "../../redux/rolesSlice";
import Loader from "../shared/Loader";

const AccessTypes = () => {
  const dispatch = useDispatch();
  // const permissions = useSelector((state) => state.allPermissions?.permissions);
  const roles = useSelector((state) => state.roles?.allRoles);
  const isLoading = useSelector((state) => state.roles?.loading);

  const navigationRef = React.useRef(null);
  const [sortConfig, setSortConfig] = React.useState({
    column: "",
    order: "asc",
  });
  useEffect(() => {
    dispatch(fetchAllRoles(sortConfig));
  }, [sortConfig]);

  const handleSortChange = (columnName) => {
    if (sortConfig.column === columnName) {
      // Toggle the sorting order if the same column is clicked again
      setSortConfig({
        ...sortConfig,
        order: sortConfig.order === "asc" ? "desc" : "asc",
      });
    } else {
      // If a new column is clicked, set it as the sorting column and reset the order to 'asc'
      setSortConfig({ column: columnName, order: "asc" });
    }
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
                      <Link to="/app/app/app/app/admin/access/types">
                        Access Types
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        
        {isLoading && <Loader isLoading={isLoading} />}
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="box">
                <div className="box-body">
                  <div className="table-responsive rounded card-table">
                    <table className="table border-no" id="example1">
                      <thead>
                        <tr>
                          <th
                            className={
                              sortConfig.column === "id"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("id")}
                          >
                            Access Type ID
                          </th>
                          <th
                            className={
                              sortConfig.column === "name"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("name")}
                          >
                            Name
                          </th>
                          <th
                            className={
                              sortConfig.column === "updatedAt"
                                ? `sorting_${
                                    sortConfig.order === "asc" ? "asc" : "desc"
                                  }`
                                : "sorting"
                            }
                            onClick={() => handleSortChange("updatedAt")}
                          >
                            Updated At
                          </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.length !== 0 &&
                          roles.map((role, index) => (
                            <tr className="hover-primary" key={index}>
                              <td>{role.id}</td>
                              <td>{role.name}</td>
                              <td>{role.updatedAt}</td>
                              <td>
                                <Link
                                  to={"/app/admin/access/types/edit/" + role.id}
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="row">
                      <div className="col-sm-12 col-md-5">
                        <div
                          className="dataTables_info"
                          id="example1_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing 1 to 10 of 12 entries
                        </div>
                      </div>
                      <div className="col-md-2 offset-5">
                        <div
                          className="dataTables_paginate paging_simple_numbers "
                          id="example1_paginate"
                        >
                          <ul className="pagination">
                            <li
                              className="paginate_button page-item previous disabled"
                              id="example1_previous"
                            >
                              <a
                                href="#"
                                aria-controls="example1"
                                data-dt-idx="0"
                                tabIndex="0"
                                className="page-link"
                              >
                                Previous
                              </a>
                            </li>
                            <li className="paginate_button page-item active">
                              <a
                                href="#"
                                aria-controls="example1"
                                data-dt-idx="1"
                                tabIndex="0"
                                className="page-link"
                              >
                                1
                              </a>
                            </li>
                            <li className="paginate_button page-item ">
                              <a
                                href="#"
                                aria-controls="example1"
                                data-dt-idx="2"
                                tabIndex="0"
                                className="page-link"
                              >
                                2
                              </a>
                            </li>
                            <li
                              className="paginate_button page-item next"
                              id="example1_next"
                            >
                              <a
                                href="#"
                                aria-controls="example1"
                                data-dt-idx="3"
                                tabIndex="0"
                                className="page-link"
                              >
                                Next
                              </a>
                            </li>
                          </ul>
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

export default AccessTypes;
