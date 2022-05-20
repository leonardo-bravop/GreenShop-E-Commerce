import "../style/Grid.css";
import { Link } from "react-router-dom";
import { addComasToPrice } from "../utils/PriceFormat";

const Card = ({ data }) => {
  return (
    <Link to={`/product/${data.id}`} className="product-card">
      <div className="card-img-container">
        <img
          className="card-img"
          src={
            data.img
              ? data.img[0]
              : "https://peugeot.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png"
          }
          alt="product main preview"
        />
      </div>
      <div className="card-info">
        <div className="product-card-title">
          {data.name.length > 30 ? data.name.slice(0, 30) + "..." : data.name}
        </div>
        <div style={{ fontSize: "1.4em" }}>$ {addComasToPrice(data.price)}</div>
      </div>
    </Link>
  );
};

export default Card;
