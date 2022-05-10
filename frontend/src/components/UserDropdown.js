import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import LoginModal from "./LoginModal";
import "../style/Login.css";
import RegisterModal from "./RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { sendLogoutRequest } from "../state/user";

const UserDropdown = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const handleLogout = () => {
    dispatch(sendLogoutRequest());
  };

  return (
    // <div style={{"overflowY": "hidden"}}>
    <div className="user-div">
      <Dropdown align={"end"}>
        <Dropdown.Toggle id="dropdown-basic" variant="secondary">
          <ion-icon name="person-outline"></ion-icon>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {!user.id ? (
            <>
              <Dropdown.ItemText>
                <LoginModal />
              </Dropdown.ItemText>
              <Dropdown.ItemText>
                <RegisterModal />
              </Dropdown.ItemText>
            </>
          ) : (
            <Dropdown.ItemText>
              <Button onClick={handleLogout} variant="danger">Logout</Button>
            </Dropdown.ItemText>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
