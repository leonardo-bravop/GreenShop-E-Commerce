import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";

const NewProductForm = () => {
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [checkedState, setCheckedState] = useState({});

  useEffect(() => {
    axios
      .get("https://the-green-shop.herokuapp.com/api/category/getAll")
      .then(({ data }) => {
        setAllCategories(data);
        return data;
      })
      .then((categories) => {
        let auxObj = {};
        categories.forEach((categObj) => {
          auxObj[categObj.id] = false;
        });
        setCheckedState(auxObj);
      });
  }, []);

  const name = useInput("");
  const price = useInput(0);
  const stock = useInput(0);
  const imagePath1 = useInput("");
  const imagePath2 = useInput("");
  const imagePath3 = useInput("");
  const imagePath4 = useInput("");

  const description = useInput("");

  const [imgNumber, setImgNumber] = useState(["1"]);

  const handleNumberImg = (e) => {
    e.preventDefault();
    if (imgNumber.length < 7) {
      let otroArr = imgNumber.map((el) => el);
      otroArr.push("otro");
      setImgNumber(otroArr);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imagesArray = [];
    if (imagePath1.value) imagesArray.push(imagePath1.value);
    if (imagePath2.value) imagesArray.push(imagePath2.value);
    if (imagePath3.value) imagesArray.push(imagePath3.value);
    if (imagePath4.value) imagesArray.push(imagePath4.value);

    axios
      .post("https://the-green-shop.herokuapp.com/api/product/add", {
        name: name.value,
        description: description.value,
        price: price.value,
        stock: stock.value,
        img: imagesArray,
      })
      .then((res) => {
        const productId = res.data[0].id;
        axios.post("https://the-green-shop.herokuapp.com/api/category/addmanyRelations", {
          productId,
          objCategoryId: checkedState,
        });
      })
      .then(() => navigate("/admin/products"));
  };

  const handleOnChangeCheck = (categ) => {
    const updatedCheckedState = { ...checkedState };

    for (const property in updatedCheckedState) {
      if (property == categ)
        updatedCheckedState[categ] = !updatedCheckedState[categ];
    }

    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="container singleProductDiv">
      <h1 className="text-center product-name ">NEW PRODUCT</h1>
      <div className="d-flex" style={{ justifyContent: "center" }}>
        <form
          className="col-lg-7"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "50px",
          }}
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column labelAndInput">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Name of the product"
              name="name"
              className="productInput"
              {...name}
            />
          </div>
          <div className="d-flex flex-column labelAndInput">
            <label htmlFor="price">Price:</label>
            <span>
              (ARS) $
              <input
                type="number"
                step=".01"
                placeholder="0"
                min={0}
                name="price"
                className="productInput priceInput"
                {...price}
              />
            </span>
          </div>
          <div className="d-flex flex-column labelAndInput">
            <label htmlFor="category">Category:</label>

            {/* <select name="category" id="cars" style={{height: '60px', padding: '0 15px'}} multiple>
              {categorias.map(category=>{
                return (<option value={category}>{category}</option>)
              })} 
            </select>
             */}

            <div className="form-check">
              {allCategories.map((categoryObj) => {
                return (
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={categoryObj.name}
                      name={categoryObj.name}
                      checked={checkedState[categoryObj.id]}
                      onChange={() => handleOnChangeCheck(categoryObj.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {categoryObj.name}
                    </label>
                  </div>
                );
              })}
            </div>
            <div style={{ alignSelf: "flex-end" }}>
              <Link to="/admin/categories">
                <button className="btn btn-light">Edit categories</button>
              </Link>
              <Link to="/admin/categories/new-category">
                <button className="btn btn-dark">New category</button>
              </Link>{" "}
            </div>
          </div>
          <div className="d-flex flex-column labelAndInput">
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              placeholder="Stock del producto"
              min={0}
              name="stock"
              className="productInput"
              {...stock}
            />
          </div>
          <div className="d-flex flex-column labelAndInput">
            <label htmlFor="images">Images:</label>
            {/* {imgNumber.map((el) => {
              return (
                <input
                  type="text"
                  placeholder="https://path-to-img.png"
                  name="images"
                  className="imgProductInput"
                />
              );
            })}
            <div style={{ alignSelf: "flex-end" }}>
              <button className="btn btn-dark" onClick={handleNumberImg}>
                Agregar nuevo path
              </button>
            </div> */}

            <input
              type="text"
              placeholder="https://path-to-img.png"
              name="images"
              className="imgProductInput"
              {...imagePath1}
            />
            <input
              type="text"
              placeholder="https://path-to-img.png"
              name="images"
              className="imgProductInput"
              {...imagePath2}
            />
            <input
              type="text"
              placeholder="https://path-to-img.png"
              name="images"
              className="imgProductInput"
              {...imagePath3}
            />
            <input
              type="text"
              placeholder="https://path-to-img.png"
              name="images"
              className="imgProductInput"
              {...imagePath4}
            />
          </div>
          <div className="d-flex flex-column labelAndInput">
            <label htmlFor="description">Description:</label>
            <textarea type="text" placeholder="Description" {...description} />
          </div>

          <div>
            <div className="d-flex flex-row-reverse">
              <button
                className="btn btn-primary"
                type="submit"
                style={{ marginRight: "0px" }}
              >
                Create product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductForm;
