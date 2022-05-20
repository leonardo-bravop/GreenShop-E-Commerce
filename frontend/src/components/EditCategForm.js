import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditCategForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [checkedState, setCheckedState] = useState("");

  const [category, setCategory] = useState({ name: "", description: "" });
  const [categoryFamilies, setCategoryFamilies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://the-green-shop.herokuapp.com/api/category/${id}`)
      .then((res) => {
        setCategory(res.data);
        return axios.get(
          "https://the-green-shop.herokuapp.com/api/categoryFamily/getAll"
        );
      })
      .then(({ data }) => {
        setCategoryFamilies(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://the-green-shop.herokuapp.com/api/category/${id}`, category)
      .then(() => navigate("/admin/categories"));
  };

  return (
    <div className="container singleProductDiv">
      <h1 className="text-center product-name ">EDIT CATEGORY</h1>
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
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Name fo the product"
              value={category.name}
              name="name"
              className="productInput"
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          </div>
          <div>
            <div style={{ marginBottom: "5px" }}>Category Family:</div>
            {categoryFamilies.map((family) => {
              return (
                <div>
                  <input
                    type="radio"
                    name={family.name}
                    value={family.id}
                    checked={
                      // category.categoryFamily?
                      category.categoryfamilyId === family.id
                      // : false
                    }
                    id={family.name}
                    disabled
                    // checked={checkedState[category.id]}
                    // onChange={handleOnChangeCheck}
                  />
                  <label style={{ marginLeft: "6px" }}>{family.name}</label>
                </div>
              );
            })}
          </div>
          <div className="d-flex flex-column labelAndInput">
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              value={category.description}
              placeholder="Description"
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
            />
          </div>

          <div>
            <div className="d-flex flex-row-reverse">
              <button
                className="btn btn-primary"
                type="submit"
                style={{ marginRight: "0px" }}
              >
                Edit category
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategForm;
