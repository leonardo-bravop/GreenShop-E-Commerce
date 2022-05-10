import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";

import Cart from "./Cart";
import "../style/Sidebar.css"

const Sidebar = () => {
  const [showSidebar, setShowSideBar] = useState(false);

  const handleClose = () => setShowSideBar(false);
  const handleShow = () => setShowSideBar(true);

  return (
    <div className="cart-nav-div">
      <Button variant="secondary" onClick={handleShow}>
        <ion-icon name="cart-outline"></ion-icon>
      </Button>

      <Offcanvas show={showSidebar} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <Cart/>
        </Offcanvas.Body>
      </Offcanvas>
    
    </div>
  );
};

export default Sidebar;
