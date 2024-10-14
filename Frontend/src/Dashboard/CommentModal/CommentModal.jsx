import PropTypes from 'prop-types'


const CommentModal = (props) => {
  return (
    <div className="modal" style={{display:"block"}} id="comment-dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="comment-popup">
              Radiology Investigations - Comment
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={()=>props.setIsCommentOpen(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row justify-content-between">
              <div className="col-12">
                <h4>Comment</h4>
              </div>
            </div>
            <form>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="comment-area"
                  rows="3"
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger pull-right"
              data-bs-dismiss="modal"
              onClick={()=>props.setIsCommentOpen(false)}
            >
              Close
            </button>
            <button type="button" className="btn btn-success pull-right me-10">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentModal.propTypes = {
  setIsCommentOpen : PropTypes.func.isRequired
}

export default CommentModal;


