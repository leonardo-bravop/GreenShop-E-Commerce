import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/Navbar.css";
import UserDropdown from "./UserDropdown";
// import Sidebar from "./Sidebar-backup";
import Sidebar from "./Sidebar";
import axios from "axios";
import useInput from "../hooks/useInput";

const NavbarComp = ({ setProducts }) => {
  const [visibleSearch, setVisibleSearch] = useState(false);
  const searchValue = useInput();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.value !== "") {
      axios
        .get(`/api/product/name/${searchValue.value}`)
        .then((res) => setProducts(res.data));
    }
  };
  const handleVisible = () => {
    setVisibleSearch(!visibleSearch);
  };
  return (
    <>
      {/* <Container fluid> */}
      <div className="navbar-container">
        <Link to="/" className="title">
          GreenShop
        </Link>

        <Navbar bg="light" expand={"lg"} style={{ flex: 1 }}>
          <Container fluid style={{ paddingRight: "0" }}>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${"lg"}`}
              style={{ position: "absolute", marginLeft: "10px" }}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${"lg"}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                {/* <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"lg"}`}>
                  Menu
                </Offcanvas.Title> */}
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className="justify-content-center flex-grow-1 pe-3 centered-nav"
                  // style={{ alignItems: "center" }} poner en breakpoint porque en columna se centra
                >
                  <Link
                    to={`/products/popular`}
                    className="nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Products
                  </Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Categories"
                    id={`offcanvasNavbarDropdown-expand-${"lg"}`}
                  >
                    <NavDropdown.Item href="#action3">Plants</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Fertilizers
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <form className="d-flex" onSubmit={handleSubmit}>
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
                    type="submit"
                    variant="success"
                    onClick={handleVisible}
                  >
                    <ion-icon name="search-outline"></ion-icon>
                  </Button>
                </form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <Sidebar />
        <UserDropdown />
      </div>
      {/* </Container> */}
    </>
  );
};

export default NavbarComp;
