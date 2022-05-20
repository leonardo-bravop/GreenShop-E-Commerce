import { Accordion, Form, Offcanvas, Spinner } from "react-bootstrap";
import Grid from "./Grid";
import { useState, useEffect } from "react";
import axios from "axios";

import "../style/FilterSearch.css";
import { useParams } from "react-router";

const FilterSearchCategory = ({ family }) => {
  // const { id } = useParams();
  const { name } = useParams();
  //Mobile Filter Offcanvas
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const handleClose = () => setShowMobileFilter(false);
  const handleShow = () => setShowMobileFilter(true);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [allCategories, setAllCategories] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(true);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleSort = (e) => {
    if (e.target.value === "lowest") {
      setProducts(
        [...products].sort((a, b) => {
          return a.price.replace(",", "") - b.price.replace(",", "");
        })
      );
    } else if (e.target.value === "latest") {
      setProducts(latestProducts);
    } else if (e.target.value === "highest") {
      setProducts(
        [...products].sort((a, b) => {
          return b.price.replace(",", "") - a.price.replace(",", "");
        })
      );
    }
  };

  const handleOnChangeCheck = (categ) => {
    const categoriesId = [];
    const updatedCheckedState = { ...checkedState };

    for (const property in updatedCheckedState) {
      if (parseInt(property) === categ)
        updatedCheckedState[categ] = !updatedCheckedState[categ];
      if (updatedCheckedState[property]) categoriesId.push(parseInt(property));
    }

    setCheckedState(updatedCheckedState);

    if (!categoriesId[0]) {
      setProducts(allProducts);
      setLatestProducts(allProducts);
      return;
    }

    let auxProducts = allProducts.filter((product) => {
      for (let i = 0; i < product.categorias.length; i++) {
        if (categoriesId.includes(product.categorias[i].id)) return true;
      }
    });

    setProducts(auxProducts);
    setLatestProducts(auxProducts);
  };

  useEffect(() => {
    let categoryId;
    setLoadingCategories(true);
    setLoadingProducts(true);

    axios
      .get(`https://the-green-shop.herokuapp.com/api/category/getByName/${name.replace("_", " ")}`)
      .then(({ data }) => {
        categoryId = data.id;
        return axios.get(`https://the-green-shop.herokuapp.com/api/product/getbyFamilyId/${family.id}`);
      })
      .then(({ data }) => {
        const categoriesId = [parseInt(categoryId)];
        setAllProducts(data);

        let auxProducts = data.filter((product) => {
          for (let i = 0; i < product.categorias.length; i++) {
            if (categoriesId.includes(product.categorias[i].id)) return true;
          }
        });
        setProducts(auxProducts);
        setLatestProducts(auxProducts);
        setLoadingProducts(false);

        return axios.get(`https://the-green-shop.herokuapp.com/api/category/getbyFamilyId/${family.id}`);
      })
      .then(({ data }) => {
        const auxObj = {};
        for (let i = 0; i < data.length; i++) {
          auxObj[data[i].id] =
            data[i].id === parseInt(categoryId) ? true : false;
        }
        setCheckedState(auxObj);
        setAllCategories(data);
        setLoadingCategories(false);
      })
      .catch((error) => {});
  }, [name]);

  return (
    <div>
      <div className="options">
        <div className="filter-header" onClick={handleShowFilter}>
          <ion-icon
            name="filter-outline"
            className="filter-icon"
            size="small"
          ></ion-icon>
          <span style={{ marginLeft: "10px" }}>Filter</span>
        </div>
        <div className="filter-mobile-header" onClick={handleShow}>
          <ion-icon
            name="filter-outline"
            className="filter-icon"
            size="small"
          ></ion-icon>
          <span style={{ marginLeft: "10px" }}>Filter</span>
        </div>
        <Offcanvas
          show={showMobileFilter}
          onHide={handleClose}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Category</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    {loadingCategories && (
                      <div style={{ textAlign: "center" }}>
                        <Spinner animation="border" variant="secondary" />
                      </div>
                    )}
                    {!loadingCategories && allCategories.length
                      ? allCategories.map((category) => {
                          return (
                            <Form.Check
                              key={category.id}
                              type={"checkbox"}
                              label={category.name}
                              id={category.id}
                              value={category.id}
                              checked={checkedState[category.id] || false}
                              onChange={() => handleOnChangeCheck(category.id)}
                            />
                          );
                        })
                      : null}
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Offcanvas.Body>
        </Offcanvas>
        <div className="sort-div">
          <div style={{ width: "80px", marginRight: "10px" }}>Sort by:</div>
          <Form.Select style={{ width: "60%" }} onChange={(e) => handleSort(e)}>
            <option value="latest">Latest</option>
            <option value="lowest">Lowest price</option>
            <option value="highest">Highest price</option>
          </Form.Select>
        </div>
      </div>
      <div className="filterContainer1">
        {showFilter && (
          <div className="filter-options">
            <div className="accordion-div">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Category</Accordion.Header>
                  <Accordion.Body>
                    <Form>
                      {loadingCategories && (
                        <div style={{ textAlign: "center" }}>
                          <Spinner animation="border" variant="secondary" />
                        </div>
                      )}
                      {!loadingCategories && allCategories.length
                        ? allCategories.map((category) => {
                            return (
                              <Form.Check
                                key={category.id}
                                type={"checkbox"}
                                label={category.name}
                                id={category.id}
                                value={category.id}
                                checked={checkedState[category.id] || false}
                                onChange={() =>
                                  handleOnChangeCheck(category.id)
                                }
                              />
                            );
                          })
                        : null}
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        )}
        <div className="filtered-div">
          {loadingProducts && (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" variant="secondary" />
            </div>
          )}
          {!loadingProducts && (
            <>
              <div className="pagination">
                <span>
                  {products.length}{" "}
                  {products.length === 1 ? "Result" : "Results"}
                </span>
                {/* <div>
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div> */}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Grid products={products} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSearchCategory;
