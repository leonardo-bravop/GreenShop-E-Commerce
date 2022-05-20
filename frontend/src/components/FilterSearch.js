import { Accordion, Form, Offcanvas, Spinner } from "react-bootstrap";
import Grid from "./Grid";
import { useState, useEffect } from "react";
import axios from "axios";
// import { handleOnChangeCheck } from "../utils/FIlterProducts";

import "../style/FilterSearch.css";

const FilterSearch = ({}) => {
  //Mobile Filter Offcanvas
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const handleClose = () => setShowMobileFilter(false);
  const handleShow = () => setShowMobileFilter(true);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const [plantCategories, setPlantsCategories] = useState([]);
  const [accesoriesCategories, setAccesoriesCategories] = useState([]);

  const [checkedState, setCheckedState] = useState({});
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(true);

  useEffect(() => {
    const auxObj = {};
    // const auxArr = [];
    setLoadingCategories(true);
    axios
      .get("https://the-green-shop.herokuapp.com/api/category/getbyFamilyId/1")
      .then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          auxObj[data[i].id] = false;
        }
        setPlantsCategories(data);
        return axios.get("https://the-green-shop.herokuapp.com/api/category/getbyFamilyId/2");
      })
      .then(({ data }) => {
        for (let j = 0; j < data.length; j++) {
          auxObj[data[j].id] = false;
        }
        setAccesoriesCategories(data);
        setCheckedState(auxObj);
        setLoadingCategories(false);
        // setAllCategories(auxArr);
      })
      .catch((error) => {
        setLoadingCategories(false);
        console.log(`server error, couldn't load categories`);
      });
  }, []);

  useEffect(() => {
    setLoadingProducts(true);
    axios
      .get("https://the-green-shop.herokuapp.com/api/product/")
      .then(({ data }) => {
        setLatestProducts(data);
        setProducts(data);
        setAllProducts(data);
        setLoadingProducts(false);
      })
      .catch((error) => {
        setLoadingProducts(false);
        console.log(`server error, couldn't load products`);
      });
  }, []);

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

  return (
    <div>
      <div className="options">
        <div
          className="filter-header"
          onClick={handleShowFilter}
          style={{ cursor: "pointer" }}
        >
          <ion-icon
            name="filter-outline"
            className="filter-icon"
            size="small"
          ></ion-icon>
          <span style={{ marginLeft: "10px" }}>Filter</span>
        </div>
        <div
          className="filter-mobile-header"
          onClick={handleShow}
          style={{ cursor: "pointer" }}
        >
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
                    {!loadingCategories && (
                      <>
                        <span
                          style={{
                            marginBottom: "15px",
                            display: "inline-block",
                            fontWeight: "500",
                          }}
                        >
                          Plants
                        </span>
                        {plantCategories.length
                          ? plantCategories.map((category) => {
                              return (
                                <Form.Check
                                  key={`${category.categoryfamilyId}-${category.id}`}
                                  type={"checkbox"}
                                  label={category.name}
                                  id={category.id}
                                  value={category?.id}
                                  checked={checkedState[category.id] || false}
                                  onChange={() =>
                                    handleOnChangeCheck(category.id)
                                  }
                                />
                              );
                            })
                          : null}
                        <span
                          style={{
                            margin: "15px 0",
                            display: "inline-block",
                            fontWeight: "500",
                          }}
                        >
                          Accesories
                        </span>
                        {accesoriesCategories.length
                          ? accesoriesCategories.map((category) => {
                              return (
                                <Form.Check
                                  key={`${category.categoryfamilyId}-${category.id}`}
                                  type={"checkbox"}
                                  label={category.name}
                                  id={category.id}
                                  value={category?.id}
                                  checked={checkedState[category.id] || false}
                                  onChange={() =>
                                    handleOnChangeCheck(category.id)
                                  }
                                />
                              );
                            })
                          : null}
                      </>
                    )}
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
                      {!loadingCategories && (
                        <>
                          <span
                            style={{
                              marginBottom: "15px",
                              display: "inline-block",
                              fontWeight: "500",
                            }}
                          >
                            Plants
                          </span>
                          {plantCategories.length
                            ? plantCategories.map((category) => {
                                return (
                                  <Form.Check
                                    key={`${category.categoryfamilyId}-${category.id}`}
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
                          <span
                            style={{
                              margin: "15px 0",
                              display: "inline-block",
                              fontWeight: "500",
                            }}
                          >
                            Accesories
                          </span>
                          {accesoriesCategories.length
                            ? accesoriesCategories.map((category) => {
                                return (
                                  <Form.Check
                                    key={`${category.categoryfamilyId}-${category.id}`}
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
                        </>
                      )}
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
                  {products.length === 1 ? "Result" : "Results"} found
                </span>
                {/* <div>
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div> */}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Grid products={products} />
                {/* } */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
