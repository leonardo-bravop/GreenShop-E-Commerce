import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addComasToPrice } from "../utils/PriceFormat";
import "./CategoryCard.css";
const ProductsRow = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://the-green-shop.herokuapp.com/api/product/latest")
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(`server error, couldn't load latest products`);
      });
  }, []);

  return (
    <>
      {loading && (
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
      {!loading && (
        <div className="row-div">
          {products?.map((el) => {
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
                  <div className="latestcard-name">
                    {el.name.length > 35
                      ? el.name.substring(0, 35).trim() + "..."
                      : el.name}
                  </div>
                </Link>
                <div
                  style={{
                    fontSize: "1.4em",
                    color: "rgb(11, 87, 49)",
                    marginTop: "10px",
                  }}
                >
                  $ {addComasToPrice(el.price)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductsRow;
