import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { sendLoginRequest } from "../state/user";
import { validateEmail } from "../utils/InputValidations";

const LoginModal = () => {
  const [loading, setLoading] = useState(false);

  //Modal utils
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //

  //Login utils
  const email = useInput("");
  const password = useInput("");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(false);

    if (!validateEmail(email.value)) return;
    dispatch(
      sendLoginRequest({
        email: email.value,
        password: password.value,
      })
    ).then((data) => {
      setLoading(false);
      if (data.payload) setShow(false);
    });
    setLoading(true);
  };
  //

  return (
    <>
      <Button variant="outline-success" onClick={handleShow} style={{ width: "80%" }}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="recipient-name"
                {...email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="recipient-name"
                {...password}
              />
            </div>
            {loading && (
              <div style={{ textAlign: "center", margin: "20px 0 -15px 0" }}>
                <Spinner animation="border" variant="secondary" />{" "}
              </div>
            )}
            <Modal.Footer style={{ marginTop: "40px" }}>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleLogin} type="submit">
                Login
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
