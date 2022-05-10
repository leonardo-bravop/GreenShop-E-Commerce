import { Container } from "react-bootstrap";
import CategoryCard from "../commons/CategoryCard";
import Grid from "./Grid";

const Home = ({ products }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh",
          width: "100%",
          backgroundPositionY: "80%",
          // backgroundPositionX: "500px",
          // backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage:
            // "url(https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80)"
            "url(https://images.unsplash.com/photo-1504541891213-1b1dfdadb739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
          // "url(https://images.unsplash.com/photo-1457530378978-8bac673b8062?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
          filter: "grayscale: 80%",
        }}
      >
        <h1
          style={{
            padding: "10px",
            backgroundColor: "rgba(0,0,0,0.4)",
            color: "white",
          }}
        >
          Green life, happy life.
        </h1>
      </div>
      {/* <CarouselComponent /> */}
      <Container style={{marginTop: "30px"}}>
        <h2>Shop by category</h2>
          <CategoryCard/>
      </Container>
      <div className="container">
        <Grid products={products} />
      </div>
    </>
  );
};

export default Home;
