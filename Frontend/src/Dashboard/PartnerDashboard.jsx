import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import MedicalIcon1 from "../assets/images/svg-icon/medical/icon-1.svg";
import MedicalIcon2 from "../assets/images/svg-icon/medical/icon-2.svg";
import MedicalIcon3 from "../assets/images/svg-icon/medical/icon-3.svg";
import MedicalIcon4 from "../assets/images/svg-icon/medical/icon-4.svg";
import CareModal from "./CareModal/CareModal";
import CommentModal from "./CommentModal/CommentModal";

const PartnerDashboard = () => {
  React.useEffect(() => {
    document.querySelector("body").classList =
      "light-skin sidebar-mini theme-success fixed";
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const [isCommentOpen, setIsCommentOpen] = React.useState(false);

  const openCommentModal = () => {
    setIsCommentOpen(true);
  };

  return (
    <>
      <div className="container-full" style={{cursor:'not-allowed'}}>
        <section className="content">
          <div className="row">
            <div className="col-xl-12 col-12">
              <div className="row">
                <div className="col-xl-3 col-md-6 col-6">
                  <div className="box">
                    <div className="box-body text-center">
                      <div className="bg-primary-light rounded10 p-20 mx-auto w-100 h-100">
                        <img src={MedicalIcon1} className="" alt="" />
                      </div>
                      <p className="text-fade mt-15 mb-5">Total Patients</p>
                      <h2 className="mt-0">1,548</h2>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-6">
                  <div className="box">
                    <div className="box-body text-center">
                      <div className="bg-danger-light rounded10 p-20 mx-auto w-100 h-100">
                        <img src={MedicalIcon2} className="" alt="" />
                      </div>
                      <p className="text-fade mt-15 mb-5">Consulation</p>
                      <h2 className="mt-0">448</h2>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-6">
                  <div className="box">
                    <div className="box-body text-center">
                      <div className="bg-warning-light rounded10 p-20 mx-auto w-100 h-100">
                        <img src={MedicalIcon3} className="" alt="" />
                      </div>
                      <p className="text-fade mt-15 mb-5">Staff</p>
                      <h2 className="mt-0">848</h2>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-6">
                  <div className="box">
                    <div className="box-body text-center">
                      <div className="bg-info-light rounded10 p-20 mx-auto w-100 h-100">
                        <img src={MedicalIcon4} className="" alt="" />
                      </div>
                      <p className="text-fade mt-15 mb-5">Total Rooms</p>
                      <h2 className="mt-0">3,100</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="box">
                <div className="box-body">
                  <h4 className="box-title">Radiology List</h4>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th className="bb-2">No.</th>
                          <th className="bb-2">Test</th>
                          <th className="bb-2">Lab</th>
                          <th className="bb-2">Priority</th>
                          <th className="bb-2">Cost</th>
                          <th className="bb-2">Handling</th>
                          <th className="bb-2">Coll. By</th>
                          <th className="bb-2">Status</th>
                          <th className="bb-2">Result</th>
                          <th className="bb-2">Signed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Blood Count</td>
                          <td>Microbiology</td>
                          <td>
                            <span className="badge badge-warning">Law</span>
                          </td>
                          <td>N500</td>
                          <td>Johen Doe</td>
                          <td>5.45pm 11/05</td>
                          <td>
                            <span className="badge badge-success">
                              Result Added
                            </span>
                          </td>
                          <td>
                            <a
                              onClick={openModal}
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#result"
                              className="text-info"
                            >
                              Result{" "}
                            </a>
                            <a
                              onClick={openCommentModal}
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#comment-dialog"
                              className="text-info"
                            >
                              Comment{" "}
                            </a>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-toggle"
                              data-bs-toggle="button"
                              aria-pressed="false"
                              autoComplete="off"
                            >
                              <div className="handle"></div>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Blood Count</td>
                          <td>Microbiology</td>
                          <td>
                            <span className="badge badge-danger">High</span>
                          </td>
                          <td>N500</td>
                          <td>Johen Doe</td>
                          <td>5.45pm 11/05</td>
                          <td>
                            <span className="badge badge-success">
                              Result Added
                            </span>
                          </td>
                          <td>
                            <a
                              onClick={openModal}
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#result"
                              className="text-info"
                            >
                              Result{" "}
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#comment-dialog"
                              className="text-info"
                              onClick={openCommentModal}
                            >
                              Comment{" "}
                            </a>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-toggle"
                              data-bs-toggle="button"
                              aria-pressed="false"
                              autoComplete="off"
                            >
                              <div className="handle"></div>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Blood Count</td>
                          <td>Microbiology</td>
                          <td>
                            <span className="badge badge-warning">Law</span>
                          </td>
                          <td>N500</td>
                          <td>Johen Doe</td>
                          <td>5.45pm 11/05</td>
                          <td>
                            <span className="badge badge-success">
                              Result Added
                            </span>
                          </td>
                          <td>
                            <a
                              onClick={openModal}
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#result"
                              className="text-info"
                            >
                              Result{" "}
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#comment-dialog"
                              className="text-info"
                              onClick={openCommentModal}
                            >
                              Comment{" "}
                            </a>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-toggle"
                              data-bs-toggle="button"
                              aria-pressed="false"
                              autoComplete="off"
                            >
                              <div className="handle"></div>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Blood Count</td>
                          <td>Microbiology</td>
                          <td>
                            <span className="badge badge-danger">High</span>
                          </td>
                          <td>N500</td>
                          <td>Johen Doe</td>
                          <td>5.45pm 11/05</td>
                          <td>
                            <span className="badge badge-success">
                              Result Added
                            </span>
                          </td>
                          <td>
                            <a
                              onClick={openModal}
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#result"
                              className="text-info"
                            >
                              Result{" "}
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#comment-dialog"
                              className="text-info"
                              onClick={openCommentModal}
                            >
                              Comment{" "}
                            </a>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-toggle"
                              data-bs-toggle="button"
                              aria-pressed="false"
                              autoComplete="off"
                            >
                              <div className="handle"></div>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Blood Count</td>
                          <td>Microbiology</td>
                          <td>
                            <span className="badge badge-danger">High</span>
                          </td>
                          <td>N500</td>
                          <td>Johen Doe</td>
                          <td>5.45pm 11/05</td>
                          <td>
                            <span className="badge badge-success">
                              Result Added
                            </span>
                          </td>
                          <td>
                            <a
                              onClick={openModal}
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#result"
                              className="text-info"
                            >
                              Result{" "}
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#comment-dialog"
                              className="text-info"
                              onClick={openCommentModal}
                            >
                              Comment{" "}
                            </a>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-toggle"
                              data-bs-toggle="button"
                              aria-pressed="false"
                              autoComplete="off"
                            >
                              <div className="handle"></div>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Blood Count</td>
                          <td>Microbiology</td>
                          <td>
                            <span className="badge badge-warning">Law</span>
                          </td>
                          <td>N500</td>
                          <td>Johen Doe</td>
                          <td>5.45pm 11/05</td>
                          <td>
                            <span className="badge badge-success">
                              Result Added
                            </span>
                          </td>
                          <td>
                            <a
                              onClick={openModal}
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#result"
                              className="text-info"
                            >
                              Result{" "}
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#comment-dialog"
                              className="text-info"
                              onClick={openCommentModal}
                            >
                              Comment{" "}
                            </a>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-toggle"
                              data-bs-toggle="button"
                              aria-pressed="false"
                              autoComplete="off"
                            >
                              <div className="handle"></div>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Blood Count</td>
                          <td>Microbiology</td>
                          <td>
                            <span className="badge badge-warning">Law</span>
                          </td>
                          <td>N500</td>
                          <td>Johen Doe</td>
                          <td>5.45pm 11/05</td>
                          <td>
                            <span className="badge badge-success">
                              Result Added
                            </span>
                          </td>
                          <td>
                            <a
                              onClick={openModal}
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#result"
                              className="text-info"
                            >
                              Result{" "}
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#comment-dialog"
                              className="text-info"
                              onClick={openCommentModal}
                            >
                              Comment{" "}
                            </a>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-toggle"
                              data-bs-toggle="button"
                              aria-pressed="false"
                              autoComplete="off"
                            >
                              <div className="handle"></div>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {isOpen && <CareModal setIsOpen={setIsOpen} />}
            {isCommentOpen && (
              <CommentModal setIsCommentOpen={setIsCommentOpen} />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default PartnerDashboard;
