import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/AdminCategories.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`https://the-green-shop.herokuapp.com/api/category/getAll/`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  const [auxCategId, setAuxCategId] = useState("");

  //del modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleDelete = () => {
    axios
      .delete(`https://the-green-shop.herokuapp.com/api/category/${auxCategId}`)
      .then(() => {
        console.log("eliminado");
      })
      .then(() => {
        axios.get(`https://the-green-shop.herokuapp.com/api/category/getAll/`).then((res) => {
          setCategories(res.data);
        });
      });
    setShow(false);
  };

  const handleShow = () => setShow(true);

  //

  const handleEdit = (e) => {
    const productId = e.target.id;
  };

  return (
    <div className="container categoriesDiv">
      <h1 style={{ paddingBottom: "40px" }}>Categories</h1>
      <Link to={"/admin/categories/new-category"}>
        <button className="btn btn-success" style={{ marginBottom: "40px" }}>
          New Category
        </button>
      </Link>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((result) => {
            return (
              <tr key={result.id}>
                <td>
                  <div className="categoriesCelda">{result.id}</div>
                </td>
                <td>
                  <div className="categoriesCelda">{result.name}</div>
                </td>
                <td>
                  <div className="categoriesCelda description-td">
                    {result.description.length > 50
                      ? result.description.slice(0, 50) + "..."
                      : result.description}
                  </div>
                </td>
                <td>
                  <div className="categoriesCelda action-buttons">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setAuxCategId(result.id);
                        handleShow();
                      }}
                    >
                      Delete
                    </button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Confirm delete category?</Modal.Title>
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
                          onClick={handleDelete}
                        >
                          Confirm
                        </button>
                      </Modal.Footer>
                    </Modal>

                    <Link to={`/admin/categories/edit/${result.id}`}>
                      <button
                        className="btn btn-primary"
                        id={result.id}
                        onClick={handleEdit}
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

export default AdminCategories;
