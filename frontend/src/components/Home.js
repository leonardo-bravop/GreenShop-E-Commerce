import { Container } from "react-bootstrap";
import CategoryCard from "../commons/CategoryCard";
import ProductsRow from "../commons/ProductsRow";
import Grid from "./Grid";

const Home = () => {
  return (
    <>
      <div style={{display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30vh",
            width: "100%",}}>
        <div
          style={{
          
            height: "100%",
            width: "100%",
            backgroundPositionY: "80%",
            // backgroundPositionX: "500px",
            // backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage:
              // "url(https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80)"
              "url(https://images.unsplash.com/photo-1504541891213-1b1dfdadb739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
            // "url(https://images.unsplash.com/photo-1457530378978-8bac673b8062?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
            filter: "brightness(70%)",
          }}
        ></div>
        <h1
          style={{
            padding: "10px",
            position: "absolute",
            // backgroundColor: "rgba(0,0,0,0.4)",
            color: "white",
          }}
        >
          Green life, happy life.
        </h1>
      </div>
      {/* <CarouselComponent /> */}
      <Container style={{ marginTop: "30px" }}>
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
        <div className="largetext-title">All your plants need in one place</div>
      </div>

      <Container style={{marginTop: "30px"}}>
        <h2>Latest</h2>
        <ProductsRow />
      </Container>
    </>
  );
};

export default Home;
