import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import "../../style/OrderHistorial.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { persistUser } from "../../state/user";
import { getShoppingCart } from "../../state/shoppingCart";
import {
  addOrCreateItemCart,
  deleteItemCart,
  getItemCart,
} from "../../state/itemCart";
import { FaMinus, FaPlus } from "react-icons/fa";
import { addComasToPrice } from "../../utils/PriceFormat";

const CartItems = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const cartItems = useSelector((state) => state.itemCarts);

  const handleOnBuy = () => {
    let orderId;
    axios
      .post(`/api/orderDetail/createOrderDetail`, {
        UserId: user.id,
        total: shoppingCart.total,
      })
      .then((order) => {
        orderId = order.data.id;
        return Promise.all(
          cartItems.map((item) => {
            axios.post(`/api/orderItem/add`, {
              price: item.product.price,
              quantity: item.quantity,
              productId: item.productId,
              orderdetailId: order.data.id,
            });
          })
        );
      })
      .then(() => {
        return Promise.all(
          cartItems.map((item) => {
            axios.delete(`/api/itemCart/remove/${item.id}`);
          })
        );
      })
      .then(() => {
        return axios.delete(`/api/shoppingCart/${shoppingCart.id}`);
      })
      .then(() => {
        return dispatch(getShoppingCart());
      })
      .then(({ payload }) => {
        dispatch(getItemCart(payload.id));
      })
      .then(() => navigate(`/orderDetails/${orderId}`));
  };


  const suma = (product, quantity, ShoppingCartId) => {
    if (quantity >= product.stock) return;
    dispatch(
      addOrCreateItemCart({
        ShoppingCartId,
        productId: product.id,
        quantity: quantity + 1,
      })
    ).then(() => {
      dispatch(getShoppingCart());
    });
  };
  const resta = (product, quantity, ShoppingCartId) => {
    if (quantity <= 1) return;
    dispatch(
      addOrCreateItemCart({
        ShoppingCartId,
        productId: product.id,
        quantity: quantity - 1,
      })
    ).then(() => {
      dispatch(getShoppingCart());
    });
  };
  const handleDelete = (id) => {
    dispatch(deleteItemCart(id)).then(() => {
      dispatch(getShoppingCart());
    });
  };
  return cartItems ? (
    <>
      <Table
        style={{ marginTop: "20px" }}
        size="sm"
        responsive
        className="items-table"
      >
        <thead>
          <tr>
            <th style={{ paddingLeft: "20px" }}>Product</th>
            <th style={{ textAlign: "right" }}>Price</th>
            <th
              style={{
                textAlign: "center",
                paddingLeft: "10px",
                paddingRight: "10PX",
              }}
            >
              Quantity
            </th>
            <th style={{ textAlign: "right" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, i) => (
            <>
              <tr key={item.id}>
                <td style={{ width: "500px" }}>
                  <Link
                    to={`/product/${item.productId}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <img
                      className="order-card-img"
                      alt=""
                      src={item.product.img[0]}
                    />
                    <span
                      style={{
                        fontSize: "1.1em",
                        fontWeight: "400",
                        maxWidth: "80%",
                        display: "inline-block",
                        verticalAlign: "middle",
                      }}
                    >
                      {item.product.name}
                    </span>
                  </Link>
                </td>
                {/* <div style={{ flex: 1 }}> */}
                <td
                  align="right"
                  style={{ verticalAlign: "middle", width: "80px" }}
                >
                  $ {addComasToPrice(item.product.price)}
                </td>
                <td
                  align="center"
                  style={{
                    verticalAlign: "middle",
                    paddingLeft: "10px",
                    paddingRight: "10PX",
                    width: "180px",
                  }}
                >
                  <Button
                    type="button"
                    variant="outline-primary"
                    className="buttonQuantity"
                    style={{ margin: 0 }}
                    onClick={() =>
                      resta(item.product, item.quantity, item.ShoppingCartId)
                    }
                  >
                    <FaMinus size={"0.8em"} />
                  </Button>
                  <span
                    style={{
                      padding: "5px 15px",
                      width: "50px",
                      backgroundColor: "white",
                      height: "38px",
                      display: "inline-block",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <Button
                    type="button"
                    className="buttonQuantity"
                    style={{ margin: 0 }}
                    variant="outline-primary"
                    onClick={() =>
                      suma(item.product, item.quantity, item.ShoppingCartId)
                    }
                  >
                    <FaPlus size={"0.8em"} />
                  </Button>
                </td>
                <td
                  align="right"
                  style={{
                    verticalAlign: "middle",
                    width: "100px",
                    position: "relative",
                  }}
                >
                  $
                  {addComasToPrice(
                    (item.product.price * item.quantity).toFixed(2)
                  )}
                  <div
                    style={{
                      position: "absolute",
                      right: "0",
                      bottom: "5px",
                    }}
                  >
                    <button
                      className="trashIcon"
                      onClick={() => handleDelete(item.id)}
                    >
                      remove
                    </button>
                  </div>
                </td>
                {/* </div> */}
              </tr>
            </>
          ))}
          {/* </div> */}
        </tbody>
      </Table>
      {/* {Mobile items} */}
      <div className="mobile-items">
        {cartItems.map((item, i) => (
          <div
            key={`mobile-${item.id}`}
            style={{ display: "flex", padding: "5px 0", marginTop: "10px" }}
          >
            <div>
              <Link to={`/product/${item.productId}`}>
                <img
                  className="order-card-img"
                  alt=""
                  src={item.product.img[0]}
                />
              </Link>
            </div>
            {/* <div style={{ flex: 1 }}> */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "1.1em", fontWeight: "500" }}>
                {item.product.name}
              </div>
              <div style={{ margin: "5px 0" }}>
                $ {addComasToPrice(item.product.price)}
              </div>
              <div
                style={{
                  margin: "5px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  type="button"
                  variant="outline-primary"
                  className="mobile-cartitembtn buttonQuantity"
                  style={{ margin: 0 }}
                  onClick={() =>
                    resta(item.product, item.quantity, item.ShoppingCartId)
                  }
                >
                  <FaMinus size={"0.8em"} />
                </Button>
                <span
                  style={{
                    padding: "5px 15px",
                    backgroundColor: "white",
                    display: "inline-block",
                    height: "32.4px",
                  }}
                >
                  {item.quantity}
                </span>
                <Button
                  type="button"
                  variant="outline-primary"
                  className="mobile-cartitembtn buttonQuantity"
                  onClick={() =>
                    suma(item.product, item.quantity, item.ShoppingCartId)
                  }
                >
                  <FaPlus size={"0.8em"} />
                </Button>
              </div>
              <div style={{ margin: "5px 0" }}>
                Subtotal: $
                {addComasToPrice(
                  (item.product.price * item.quantity).toFixed(2)
                )}
              </div>
              <div>
                <button
                  className="trashIcon"
                  style={{ padding: 0 }}
                  onClick={() => handleDelete(item.id)}
                >
                  remove
                </button>
              </div>
              {/* </div> */}
            </div>
          </div>
        ))}
      </div>{" "}
      <div style={{ alignSelf: "flex-end" }}>
        Total:{" "}
        <span style={{ fontSize: "1.2em" }}>
          $ {addComasToPrice(shoppingCart.total)}
        </span>
      </div>
      <Button
        variant="success"
        onClick={handleOnBuy}
        style={{
          width: "120px",
          alignSelf: "flex-end",
          margin: 0,
          marginTop: "10px",
        }}
      >
        Checkout
      </Button>
    </>
  ) : null;
};
export default CartItems;
