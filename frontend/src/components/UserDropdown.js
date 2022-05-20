import { Button, Dropdown } from "react-bootstrap";
import LoginModal from "./LoginModal";
import "../style/Login.css";
import RegisterModal from "./RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { sendLogoutRequest } from "../state/user";
import { resetShoppingCart } from "../state/shoppingCart";
import { resetItemCarts } from "../state/itemCart";
import { useNavigate } from "react-router";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate=useNavigate()
  const handleLogout = () => {
    dispatch(sendLogoutRequest())
      .then(() => {
        return dispatch(resetShoppingCart());
      })
      .then(() => {
        return dispatch(resetItemCarts());
      }).then(()=>{
        navigate("/")
      })
  };

  return (
    // <div style={{"overflowY": "hidden"}}>
    <div className="user-div">
      <Dropdown align={"end"}>
        <Dropdown.Toggle
          id="dropdown-basic"
          variant={user.id ? "success" : "secondary"}
        >
          <ion-icon name="person-outline"></ion-icon>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ textAlign: "center" }}>
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
            <>
              <Dropdown.ItemText>
                <span>{user.name}</span>
              </Dropdown.ItemText>
              <Dropdown.ItemText>
                <Button onClick={handleLogout} variant="danger">
                  Logout
                </Button>
              </Dropdown.ItemText>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
