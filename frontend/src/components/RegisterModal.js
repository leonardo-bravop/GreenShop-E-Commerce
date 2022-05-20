import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { sendLoginRequest, sendSignUpRequest } from "../state/user";
import { validateEmail, validateString } from "../utils/InputValidations";

const RegisterModal = () => {
  const [loading, setLoading] = useState(false);

  //Modal utils
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //

  //Login utils
  const first_name = useInput("");
  const last_name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateString(first_name.value)) return;
    if (!validateString(last_name.value)) return;
    if (!validateEmail(email.value)) return;
    if (!password.value || password.value.length<8) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    dispatch(
      sendSignUpRequest({
        name: first_name.value,
        lastname: last_name.value,
        email: email.value,
        password: password.value,
      })
    )
      .then((user) =>
        dispatch(
          sendLoginRequest({ email: user.email, password: user.password })
        )
      )
      .then((data) => {
        setLoading(false);
        setShow(false);
      });
    setLoading(true);
  };
  //

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ width: "100%", margin: 0 }}
      >
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Create an account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                Name
              </label>
              <input
                type="text"
                minLength="2"
                maxLength="30"
                className="form-control"
                id="recipient-name"
                required
                {...first_name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-lastname" className="col-form-label">
                Lastname
              </label>
              <input
                type="text"
                className="form-control"
                id="recipient-lastname"
                minLength="2"
                maxLength="30"
                required
                {...last_name}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="recipient-email"
                className="col-form-label"
                data-error="wrong"
                data-success="right"
              >
                Email
              </label>
              <input
                type="email"
                className="form-control validate"
                id="recipient-email"
                {...email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-password" className="col-form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                id="recipient-password"
                {...password}
                placeholder="8+ characters"
                minLength={8}
              />
              {passwordError && (
                <div style={{ color: "red" }}>
                  Please enter a valid password
                </div>
              )}
            </div>
            {loading && (
              <div style={{ textAlign: "center", margin: "20px 0 -15px 0" }}>
                <Spinner animation="border" variant="secondary" />
              </div>
            )}
            <Modal.Footer style={{ marginTop: "40px" }}>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleRegister} type="submit">
                Register
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
