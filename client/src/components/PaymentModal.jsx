/* eslint-disable react/prop-types */
function PaymentModal({ show, setShow, selectedPaymentRef, handleConfirm }) {
  return (
    <>
      <div
        className={`modal fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Payment Method</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShow(false)}
              ></button>
            </div>
            <div className="modal-body">
              <select className="form-select" ref={selectedPaymentRef}>
                <option value="">Select</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShow(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default PaymentModal;
