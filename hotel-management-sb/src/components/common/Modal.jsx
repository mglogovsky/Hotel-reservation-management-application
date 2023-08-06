import useOutsideClick from "../../hooks/useOutsideClick";
import ReactPortal from "../ReactPortal";

const Modal = ({
  title = "",
  show = false,
  handleClose = () => {},
  children,
  preventDefault = false,
}) => {
  const ref = useOutsideClick(handleClose);
  return (
    show && (
      <ReactPortal>
        <div
          className="modal fade show"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-modal="true"
          role="dialog"
          style={{ display: "block", background: "#0000008c" }}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
            ref={!preventDefault ? ref : null}
          >
            <div className="modal-content">
              {title && (
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {title}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleClose}
                  />
                </div>
              )}
              <div className="modal-body p-0">{children}</div>
            </div>
          </div>
        </div>
      </ReactPortal>
    )
  );
};

export default Modal;
