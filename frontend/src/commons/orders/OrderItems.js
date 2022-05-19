import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import "../../style/OrderHistorial.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { addComasToPrice } from "../../utils/PriceFormat";

const OrderItems = () => {
  const { id } = useParams();

  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    axios.get(`/api/orderItem/getAll/${id}`).then((res) => {
      setOrderItems(res.data);
    });
  }, [id]);

  return orderItems[0] ? (
    <div className="">
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
          {orderItems.map((item, i) => (
            <>
              <tr key={item.id}>
                <td>
                  <Link
                    to={`/product/${item.productId}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <img
                      className="order-card-img"
                      alt=""
                      src={item.product.img[0]}
                    />
                    <span style={{ fontSize: "1.1em", fontWeight: "400" }}>
                      {item.product.name}
                    </span>
                  </Link>
                </td>
                {/* <div style={{ flex: 1 }}> */}
                <td align="right" style={{ verticalAlign: "middle" }}>
                  $ {addComasToPrice(item?.product.price)}
                </td>
                <td
                  align="center"
                  style={{
                    verticalAlign: "middle",
                    paddingLeft: "10px",
                    paddingRight: "10PX",
                  }}
                >
                  <span
                    style={{
                      padding: "5px 15px",
                      height: "38px",
                      display: "inline-block",
                    }}
                  >
                    {item.quantity}
                  </span>
                </td>
                <td align="right" style={{ verticalAlign: "middle" }}>
                  ${addComasToPrice((item?.product.price * item.quantity).toFixed(2))}
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
        {orderItems.map((item, i) => (
          <div
            key={item.id}
            style={{ display: "flex", padding: "5px 0", marginTop: "10px" }}
          >
            <div>
              <Link to={`/product/${item.productId}`}>
                <img className="order-card-img" alt="" src={item.product.img[0]} />
              </Link>
            </div>
            {/* <div style={{ flex: 1 }}> */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "1.1em", fontWeight: "500" }}>
                {item.product.name}
              </div>
              <div style={{ margin: "5px 0" }}>$ {addComasToPrice(item?.product.price)}</div>
              <div
                style={{
                  margin: "5px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    padding: "5px 0",
                    display: "inline-block",
                    height: "32.4px",
                  }}
                >
                  Quantity: {item.quantity}
                </span>
              </div>
              <div style={{ margin: "5px 0" }}>
                $
                {addComasToPrice(
                  (item?.product.price * item.quantity).toFixed(2)
                )}
              </div>
              {/* </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default OrderItems;
