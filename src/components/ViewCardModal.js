import React from 'react'

function ViewCardModal(props) {

    return (
        <div
            className="modal modal-blur fade"
            id="modal-card-details"
            role="dialog"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered --listcard-modal-dialog"
              role="document"
            >
              <div className="modal-content">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
                <div className="modal-body text-left py-4 --flex-modal-body">
                  <div className="modal-body-left">
                    <h3>{props.cardTitle}</h3>
                    <label for="card-description">Description</label>
                    <div id="card-description" className="text-muted">cardBody</div>
                  </div>
                  <div className="modal-body-right">
                  <div>
                      <h4>Assignee: <span className="text-muted">cardAssignee</span></h4>
                    </div>
                    <div>
                      <h4>Reporter: <span className="text-muted">Tony Quach</span></h4>
                    </div>
                  </div>
                </div>
                {/* <div className="modal-footer">
                  <div className="w-100">
                    <div className="row">
                      <div className="col">
                        <a
                          href="#"
                          className="btn btn-white w-100"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </a>
                      </div>
                      <div className="col">
                        <a
                          href="#"
                          className="btn btn-danger w-100"
                          data-bs-dismiss="modal"
                        >
                          Delete 84 items
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
    )
}

export default ViewCardModal
