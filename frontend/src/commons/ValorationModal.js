import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import useInput from "../hooks/useInput";

const ValorationModal = ({
  userValoration,
  setUserValoration,
  setComments,
  setAverageValoration,
}) => {
  const [stars, setStars] = useState([true, true, true, false, false]);
  const comment = useInput("");
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  //Modal utils
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (user.id) {
      setShow(true);
    } else {
      alert("Please login to add a review");
    }
  };
  //

  const handleonChangeStars = (value) => {
    const auxStars = [...stars];
    for (let i = 0; i < 5; i++) {
      if (i + 1 > value) {
        auxStars[i] = false;
      } else auxStars[i] = true;
    }
    setStars(auxStars);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valoration = stars.reduce((prev, current) => {
      if (current) return prev + 1;
      else return prev;
    }, 0);
    if (user.id && comment.value) {
      if (userValoration) {
        setUserValoration(valoration);
        axios
          .put(`https://the-green-shop.herokuapp.com/api/productValoration/update/${id}`, {
            UserId: user.id,
            review: comment.value,
            valoration: valoration,
          })
          .then(() => {
            updateCommentsAndAverage(e);
            handleClose();
            setStars([true, true, true, false, false]);
          });
      } else {
        setUserValoration(valoration);
        axios
          .post(`https://the-green-shop.herokuapp.com/api/productValoration/add/${id}`, {
            UserId: user.id,
            review: comment.value,
            valoration: valoration,
          })
          .then(() => {
            updateCommentsAndAverage(e);
            handleClose();
            setStars([true, false, false, false, false]);
          });
      }
    }
  };

  const updateCommentsAndAverage = (e) => {
    document.querySelector(".formComments").value = "";
    comment.onChange(e);
    return axios
      .get(`https://the-green-shop.herokuapp.com/api/productValoration/getAll/${id}`)
      .then((res) => {
        setComments(res.data);
        return axios.get(`https://the-green-shop.herokuapp.com/api/productValoration/getAverage/${id}`);
      })
      .then(({ data }) => {
        if (data) {
          setAverageValoration(data.average);
        }
      });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant={!userValoration ? "outline-success" : "outline-secondary"}
          onClick={handleShow}
          style={{ width: !user.id? "190px" : "120px", marginBottom: "20px" }}
        >
          {!user.id? "Login to add a review" : !userValoration ? "Add a review" : "Edit review"}
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Your review helps us!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>Rate the product:</div>
            <div className="stars">
              {stars.map((star, index) => {
                return (
                  <button
                    className={stars[index] ? "activeStar" : "inactiveStar"}
                    onMouseOver={() => {
                      handleonChangeStars(index + 1);
                    }}
                    onClick={() => handleonChangeStars(index + 1)}
                    key={`star-${index}`}
                  >
                    <ion-icon name="star-sharp"></ion-icon>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div>Add a comment:</div>
            <form onSubmit={handleSubmit} className="formComments">
              <input className="inputComment" {...comment} />

              <Modal.Footer style={{ marginTop: "40px" }}>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => {}} type="submit">
                  Send
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ValorationModal;
