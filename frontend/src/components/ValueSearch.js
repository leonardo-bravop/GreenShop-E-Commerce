import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Grid from "./Grid";

const ValueSearch = () => {
  const { value } = useParams();
  const [found, setFound] = useState([]);

  useEffect(() => {
    axios.get(`/api/product/name/${value}`).then(({ data }) => {
      setFound(data);
    });
  }, [value]);

  return (
    <div
      className="found"
      style={{ marginTop: "50px", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Results for "{value}"</h2>
      <p>({found.length} results)</p>
    <div style={{ width: "90%", marginTop: "30px", marginBottom: "50px", textAlign: "center" }}>
        {/* {found?.map((product) => {
          return (
            <div style={{ display: "flex" }}>
              <img
                src={product.img ? product.img[0] : ""}
                style={{
                  height: "200px",
                  width: "200px",
                  objectFit: "contain",
                }}
              />
              <div style={{ flex: 1 }}>
                <span>{product.name}</span>
                <p>{product.description}</p>
              </div>
            </div>
          );
        })} */}
        <Grid products={found}/>
      </div>
    </div>
  );
};

export default ValueSearch;
