import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import Grid from "./Grid";

const ValueSearch = () => {
  const { value } = useParams();
  const [found, setFound] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://the-green-shop.herokuapp.com/api/product/name/${value}`)
      .then(({ data }) => {
        setFound(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Server error, couldn't load the results");
      });
  }, [value]);

  return (
    <div
      className="found"
      style={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Results for "{value}"</h2>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
      {!loading && (
        <>
          {" "}
          <p>({found.length} results)</p>
          <div
            style={{
              width: "90%",
              marginTop: "30px",
              marginBottom: "50px",
              textAlign: "center",
            }}
          >
            <Grid products={found} />
          </div>
        </>
      )}
    </div>
  );
};

export default ValueSearch;
