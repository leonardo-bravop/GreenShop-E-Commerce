import { Container } from "react-bootstrap";
import CategoryCard from "../commons/CategoryCard";
import ProductsRow from "../commons/ProductsRow";
import "../style/Home.css";

const Home = () => {
  return (
    <>
      <div className="home-imgwrapper">
        <div className="home-imgdiv"></div>
        <h1
          style={{
            padding: "10px",
            position: "absolute",
            color: "white",
          }}
        >
          Green life, happy life
        </h1>
      </div>
      {/* <CarouselComponent /> */}
      <Container style={{ marginTop: "50px" }}>
        <h2>Shop by category</h2>
        <CategoryCard />
      </Container>

      <div className="largetext-wrapper">
        <div
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
          }}
          className="largetext-container"
        ></div>
        <div className="largetext-title">
          Everything your plants need, in one place
        </div>
      </div>

      <Container style={{ marginTop: "30px" }}>
        <h2>Latest</h2>
        <ProductsRow />
      </Container>
    </>
  );
};

export default Home;
