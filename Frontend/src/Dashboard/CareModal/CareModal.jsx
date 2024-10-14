import PropTypes from "prop-types";

const CareModal = (props) => {
  return (
    <div className="modal" style={{ display: "block" }} id="result">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="result-popup">
              Radiology Investigations - Result
            </h4>
            <button
              type="button"
              onClick={() => props.setIsOpen(false)}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row justify-content-between">
              <div className="col-md-7 col-12">
                <h4>Test Name - Neck Scan</h4>
              </div>
              <div className="col-md-5 col-12">
                <h4 className="text-end">Lab Order Id : L0000002821</h4>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="bg-secondary">
                  <tr>
                    <th scope="col">Test</th>
                    <th scope="col">Result</th>
                    <th scope="col">Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Swelling Diameter</td>
                    <td>45 - 1000</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="comment">
              <p>
                <span className="fw-600">Comment</span> :{" "}
                <span className="comment-here text-mute">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.{" "}
                </span>
              </p>
            </div>
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <th colSpan="2" className="b-0">
                      Test By
                    </th>
                    <th colSpan="2" className="b-0">
                      Signed By
                    </th>
                  </tr>
                  <tr className="bg-secondary">
                    <td>Donald jr</td>
                    <td>Time : 11-8-2017 04:22</td>
                    <td>Lous Clark</td>
                    <td>Time : 11-8-2017 04:22</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger pull-right"
              data-bs-dismiss="modal"
              onClick={() => props.setIsOpen(false)}
            >
              Close
            </button>
            <button type="button" className="btn btn-info pull-right">
              Print
            </button>
            <button type="button" className="btn btn-success pull-right">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CareModal.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default CareModal;
