import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addComasToPrice } from "../utils/PriceFormat";
import "./CategoryCard.css";
const ProductsRow = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/product/latest").then(({ data }) => setProducts(data));
  }, []);

  return (
    <div className="row-div">
      {products.map((el) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={el.id}
          >
            <Link className="latest-card-wrapper" to={`/product/${el.id}`}>
              <div
                style={{
                  backgroundImage: `url(${el.img[0]})`,
                }}
                className="latestcard-container"
              ></div>
              <div className="latestcard-name">{el.name}</div>
            </Link>
            <div style={{ fontSize: "1.4em", color: "rgb(11, 87, 49)" }}>
              {addComasToPrice(el.price)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsRow;
