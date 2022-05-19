import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import "../../style/CardOrderDetail.css";
import { addComasToPrice } from "../../utils/PriceFormat";
import "../SingleProduct.css";
import OrderItems from "./OrderItems";

const OrderDetailsHeader = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = useSelector((state) => state.user);

  const [order, setOrder] = useState({});

  useEffect(() => {
    if (user.id) {
      axios
        .get(`/api/orderDetail/getorder/${id}/user/${user.id}`)
        .then((res) => {
          setOrder(res.data);
        });
    }
  }, [id]);

  const confirm = () => {
    navigate("/");
  };

  return order.id ? (
    <>
      <div style={{ marginTop: "50px" }}>
        <h2 style={{ color: "#157347" }}>Your products are on your way!</h2>
      </div>
      <div className="orderContainer2">
        <h5 className="">Order ID : {order.id}</h5>

        <div className="">
          <div>
            <div>
              Order Confirmation Date:{" "}
              {order.createdAt?.substring(0, 10) +
                " " +
                order.createdAt?.substring(11, 19)}
            </div>
          </div>
        </div>
        <OrderItems />
        <div style={{ alignSelf: "flex-end" }}>
          Total Price:{" "}
          <span style={{ fontSize: "1.2em" }}>
            $ {order.total ? addComasToPrice(order.total) : null}
          </span>
        </div>
        <Button
          onClick={confirm}
          style={{
            alignSelf: "flex-end",
            width: "120px",
            margin: 0,
            marginTop: "10px",
          }}
        >
          OK!
        </Button>
      </div>
    </>
  ) : (
    <div style={{ textAlign: "center" }}>
      <p style={{ marginTop: "30px", fontSize: "1.4em" }}>
        It seems like there's nothing here.
      </p>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </Button>
    </div>
  );
};

export default OrderDetailsHeader;
