import React, { useState } from "react";
import { Badge, Button, Offcanvas } from "react-bootstrap";

import Cart from "./Cart";
import "../style/Sidebar.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [showSidebar, setShowSideBar] = useState(false);

  const handleClose = () => setShowSideBar(false);
  const handleShow = () => setShowSideBar(true);

  const cartItems = useSelector((state) => state.itemCarts);

  return (
    <div className="cart-nav-div">
      <Button
        variant="secondary"
        onClick={handleShow}
        style={{ position: "relative" }}
      >
        <ion-icon name="cart-outline"></ion-icon>

        <span style={{ position: "absolute", left: "30px", bottom: "20px" }}>
          <Badge bg={cartItems.length? "success" : "secondary"}>{cartItems.length}</Badge>
        </span>
      </Button>

      <Offcanvas show={showSidebar} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart setShowSideBar={setShowSideBar}/>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Sidebar;
