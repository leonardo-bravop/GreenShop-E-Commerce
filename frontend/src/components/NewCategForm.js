import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";

const NewCategForm = () => {
  const navigate = useNavigate();

  const name = useInput("");
  const description = useInput("");
  const [checkedState, setCheckedState] = useState("");
  const [categoryFamilies, setCategoryFamilies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/category/new", {
        name: name.value,
        description: description.value,
        categoryfamilyId: checkedState,
      })
      .then(() => navigate("/admin/categories"));
  };

  useEffect(() => {
    axios.get("/api/categoryFamily/getAll").then(({ data }) => {
      setCategoryFamilies(data);
    });
  }, []);

  const handleOnChangeCheck = (e) => {
    setCheckedState(e.target.value);
  };

  return (
    <div className="container singleProductDiv">
      <h1 className="text-center product-name ">CREAR CATEGORIA</h1>
      <div className="d-flex" style={{ justifyContent: "center" }}>
        <form
          className="col-lg-7"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column labelAndInput">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              placeholder="Nombre del producto"
              name="name"
              className="productInput"
              {...name}
            />
          </div>
          <div style={{ marginBottom: "5px" }}>
            <span>Category family:</span>
          </div>
          {categoryFamilies.map((family) => {
            return (
              <div>
                <input
                  type="radio"
                  name={family.name}
                  value={family.id}
                  checked={checkedState == family.id}
                  id={family.name}
                  // checked={checkedState[category.id]}
                  onChange={handleOnChangeCheck}
                />
                <label style={{ marginLeft: "6px" }}>{family.name}</label>
              </div>
            );
          })}

          <div className="d-flex flex-column labelAndInput">
            <label htmlFor="description">Descripción:</label>
            <textarea type="text" placeholder="Description" {...description} />
          </div>

          <div>
            <div className="d-flex flex-row-reverse">
              <button
                className="btn btn-primary"
                type="submit"
                style={{ marginRight: "0px" }}
              >
                Crear categoría
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategForm;
