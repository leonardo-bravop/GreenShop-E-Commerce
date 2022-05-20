import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../style/CardOrderDetail.css";
import "../SingleProduct.css";
import CartItems from "./CartItems";
import {HiArrowNarrowLeft} from "react-icons/hi"

const CartDetailsHeader = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart);

  return shoppingCart.id ? (
    <div className="orderContainer2">
      <div className="cart-title">
        <span className="" style={{fontSize: "1.4em", fontWeight: "500", marginBottom: "10px"}}>ShoppingCart</span>
        <Link to="/products/all" style={{textDecoration: "none"}}>
          <Button style={{ display: "flex", alignItems: "center", margin: 0 }} variant="outline-primary">
            <HiArrowNarrowLeft style={{marginRight: "10px"}}/>Continue Shopping
          </Button>
        </Link>
      </div>
      <CartItems />
     
    </div>
  ) : null;
};

export default CartDetailsHeader;
