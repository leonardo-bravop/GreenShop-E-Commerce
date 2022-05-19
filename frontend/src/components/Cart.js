import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addOrCreateItemCart, deleteItemCart } from "../state/itemCart";
import { getShoppingCart } from "../state/shoppingCart";
import "../style/Sidebar.css";
import { addComasToPrice } from "../utils/PriceFormat";

const Cart = ({ setShowSideBar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const cartItems = useSelector((state) => state.itemCarts);

  useEffect(() => setItems(cartItems), [cartItems]);

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

  const handleOnCheckout = () => {
    setShowSideBar(false);
    navigate("./CartDetails");
  };

  return (
    <>
      <div className="containerSidebar">
        {cartItems.length ? (
          <>
            <div>
              <div className="titleCart">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              <>
                {items.map(({ id, quantity, product, ShoppingCartId }, i) => {
                  return (
                    <div key={id} className="containerCart">
                      <div className="itemImg-div">
                        <img
                          src={product.img ? product.img[0] : ""}
                          className="itemImg"
                        />
                      </div>
                      <div className="subContainerCart">
                        <div>
                          <li className="dataItem">{product.name}</li>
                          <li className="dataItem">
                            ${addComasToPrice(product.price)}
                          </li>
                          <li className="quantityItem">
                            <Button
                              type="button"
                              className="buttonQuantity"
                              onClick={() =>
                                resta(product, quantity, ShoppingCartId)
                              }
                            >
                              <FaMinus size="0.8em" />
                            </Button>
                            <p
                              className="quantity"
                              style={{
                                margin: 0,
                                padding: "5px 15px",
                                textAlign: "center",
                                border: "1px solid #ced4da",
                              }}
                            >
                              {quantity}
                            </p>
                            <Button
                              type="button"
                              className="buttonQuantity"
                              onClick={() =>
                                suma(product, quantity, ShoppingCartId)
                              }
                            >
                              <FaPlus size="0.8em" />
                            </Button>
                          </li>
                          {quantity === product.stock ? (
                            <li className="err">sin stock</li>
                          ) : null}
                        </div>
                        <div className="subtotal">
                          <li className="dataItem">
                            $
                            {addComasToPrice(
                              (product.price * quantity).toFixed(2)
                            )}
                          </li>
                          <button
                            className="trashIcon"
                            onClick={() => handleDelete(id)}
                          >
                            {/* <IoCloseSharp  size="1.2em" color="white"/> */}
                            remove
                            {/* <TiDelete size="1.5em" color="#939ca3" /> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            </div>
            <div>
              <div className="containerTotal">
                <span className="titleTotal">Total:</span>
                <span className="titleTotal">
                  $
                  {addComasToPrice(items
                    .map(({ quantity, product }) => quantity * product.price)
                    .reduce((total, i) => total + i, 0)
                    .toFixed(2))}
                </span>
              </div>
              <div className="subPrice">
                <div>
                  {addComasToPrice((
                    items
                      .map(({ quantity, product }) => quantity * product.price)
                      .reduce((total, i) => total + i, 0) / 6
                  ).toFixed(2))}{" "}
                  $/mo with SatcoCredit
                </div>

                <Button
                  // className="buttonQuantity starting"
                  variant="success"
                  style={{ margin: 0, marginTop: "10px" }}
                  onClick={handleOnCheckout}
                >
                  Checkout
                </Button>
              </div>
            </div>{" "}
          </>
        ) : (
          <>
            <div style={{ textAlign: "center" }}>
              <span>You have no items in your cart</span>
              <Link
                to="products/all"
                style={{
                  display: "flex",
                  margin: "20px",
                  justifyContent: "center",
                }}
              >
                <Button onClick={() => setShowSideBar(false)}>
                  Start Shopping
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
