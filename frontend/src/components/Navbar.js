import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import UserDropdown from "./UserDropdown";
import Sidebar from "./Sidebar";
import axios from "axios";
import useInput from "../hooks/useInput";
import { useSelector } from "react-redux";

const NavbarComp = () => {
  const user = useSelector((state) => state.user);
  const [categoryFamilies, setCategoryFamilies] = useState([]);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [visibleSearch, setVisibleSearch] = useState(false);
  const searchValue = useInput("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.value && searchValue.value.trim()) {
      navigate(`/search/value/${searchValue.value.trim()}`);
      document.querySelector(".search-form").value = "";
      searchValue.onChange(e);
      handleClose();
    }
  };
  const handleVisible = () => {
    setVisibleSearch(!visibleSearch);
  };
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    setLoadingCategories(true);
    axios
      .get("https://the-green-shop.herokuapp.com/api/categoryFamily/getAllCategories")
      .then(({ data }) => {
        const orderedFamilies = data.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        setCategoryFamilies(data);
        setLoadingCategories(false);
      })
      .catch((error) => {
        setLoadingCategories(false);
        console.log(`server error, ${error}`);
      });
  }, []);

  const handleShow = () => setShow(true);

  return (
    <>
      <div className="navbar-container">
        <Link to="/" className="title">
          GreenShop
        </Link>

        <Navbar bg="light" expand={"xl"} style={{ flex: 1 }}>
          <Container fluid style={{ paddingRight: "0" }}>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${"lg"}`}
              style={{ position: "absolute", marginLeft: "10px" }}
              onClick={handleShow}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${"lg"}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
              placement="start"
              show={show ? "true" : null}
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3 centered-nav">
                  {loadingCategories && (
                    <div style={{ textAlign: "center" }}>
                      <Spinner animation="border" variant="secondary" />
                    </div>
                  )}
                  {!loadingCategories && (
                    <>
                      <Link
                        to={`/products/all`}
                        className="nav-link"
                        style={{ textDecoration: "none", marginInline: "5px" }}
                        onClick={handleClose}
                      >
                        PRODUCTS
                      </Link>
                      {categoryFamilies.map((categoryFamily) => {
                        return (
                          <NavDropdown
                            title={categoryFamily.name.toUpperCase()}
                            id={`offcanvasNavbarDropdown-expand-${"lg"}`}
                            key={categoryFamily.id}
                            style={{ marginInline: "5px" }}
                          >
                            {categoryFamily.categories.map((category) => {
                              return (
                                <Link
                                  to={`/${
                                    categoryFamily.name
                                  }/${category.name.replace(" ", "_")}`}
                                  className="category-navlink"
                                  key={category.id}
                                  onClick={handleClose}
                                >
                                  {category.name}
                                </Link>
                              );
                            })}
                          </NavDropdown>
                        );
                      })}

                      {user.roleId === 2 || user.roleId === 3 ? (
                        <NavDropdown
                          title="ADMIN"
                          id="admin-dropdown"
                          style={{ marginInline: "5px" }}
                        >
                          <Link
                            to={`/admin/products`}
                            className="admin-dropitem"
                            onClick={handleClose}
                          >
                            Products
                          </Link>
                          <Link
                            to={`/admin/users`}
                            className="admin-dropitem"
                            onClick={handleClose}
                          >
                            Users
                          </Link>
                          <Link
                            to={`/admin/orders`}
                            className="admin-dropitem"
                            onClick={handleClose}
                          >
                            Orders
                          </Link>
                          <Link
                            to={`/admin/categories`}
                            className="admin-dropitem"
                            onClick={handleClose}
                          >
                            Categories
                          </Link>
                        </NavDropdown>
                      ) : null}
                    </>
                  )}
                </Nav>
                <div id="mobile-searchform">
                  <form className="d-flex search-form" onSubmit={handleSubmit}>
                    <input
                      className="form-control me-2 search-input"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      {...searchValue}
                    />

                    <Button
                      className="iconNavbar"
                      id="search-button"
                      type="submit"
                      variant="success"
                    >
                      <ion-icon name="search-outline"></ion-icon>
                    </Button>
                  </form>
                </div>
                <div id="desktop-searchform">
                  <form className="d-flex search-form" onSubmit={handleSubmit}>
                    {visibleSearch && (
                      <input
                        className="form-control me-2 search-input"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        {...searchValue}
                      />
                    )}
                    <Button
                      className="iconNavbar"
                      id="search-button"
                      type="submit"
                      variant="success"
                      onClick={handleVisible}
                    >
                      <ion-icon name="search-outline"></ion-icon>
                    </Button>
                  </form>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <Sidebar />
        <UserDropdown />
      </div>
    </>
  );
};

export default NavbarComp;
