import "../style/AdminProducts.css";
import useInput from "../hooks/useInput";
import { Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminProducts = () => {
  const searchValue = useInput("");
  const [results, SetResults] = useState([]);

  const [auxProductId, setAuxProductId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.value.trim()) {
      axios
        .get(`https://the-green-shop.herokuapp.com/api/product/name/${searchValue.value.trim()}`)
        .then((res) => SetResults(res.data));
    }
  };

  //prueba de modal

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleDelete = () => {
    axios
      .delete(`https://the-green-shop.herokuapp.com/api/product/${auxProductId}`)
      .then(() => {
        console.log("eliminado");
      })
      .then(() => {
        if (searchValue.value) {
          axios
            .get(`https://the-green-shop.herokuapp.com/api/product/name/${searchValue.value}`)
            .then((res) => SetResults(res.data));
        } else {
          axios.get("https://the-green-shop.herokuapp.com/api/product/").then(({ data }) => SetResults(data));
        }
      });
    setShow(false);
  };

  const handleShow = () => setShow(true);

  //

  useEffect(() => {
    axios.get("https://the-green-shop.herokuapp.com/api/product/").then(({ data }) => {
      SetResults(data);
    });
  }, []);

  return (
    <div className="container usersTitleDiv">
      <h1>Products</h1>
      <div className="searchFormDiv">
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="searchUsersInput">Buscador de usuarios </label> */}
          <input
            type="text"
            name="products"
            id="searchProductsInput"
            className="searchFormInput"
            placeholder="Search a product"
            {...searchValue}
          />
          <button className="btn btn-primary searchFormBtn" type="submit">
            Search
          </button>
        </form>
        <Link to={"/admin/products/new-product"}>
          <button className="btn btn-success" style={{ marginTop: "20px" }}>
            New product
          </button>
        </Link>
      </div>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => {
            return (
              <tr key={result.id}>
                <td>
                  {
                    <Link to={`/product/${result.id}`}>
                      <img
                        src={result.img ? result.img[0] : ""}
                        style={{ width: "100%", maxWidth: "100px", height: "100px", objectFit: "contain" }}
                      />
                    </Link>
                  }
                </td>
                <td>
                  <div className="celdaContent">{result.name}</div>
                </td>
                <td>
                  <div className="celdaContent">
                    {result.description.length > 200
                      ? result.description.slice(0, 200)+"..."
                      : result.description}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setAuxProductId(result.id);
                        handleShow();
                      }}
                    >
                      Delete
                    </button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Confirm delete product?</Modal.Title>
                      </Modal.Header>
                      <Modal.Footer>
                        <button
                          className="btn btn-secondary"
                          onClick={handleClose}
                        >
                          Close
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete();
                          }}
                        >
                          Confirm
                        </button>
                      </Modal.Footer>
                    </Modal>

                    <Link to={`/admin/products/edit/${result.id}`}>
                      <button
                        className="btn btn-primary"
                        // id={result.id}
                        onClick={() => {}}
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminProducts;
