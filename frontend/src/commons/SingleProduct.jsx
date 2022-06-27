import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { addOrCreateItemCart } from "../state/itemCart";
import { useDispatch, useSelector } from "react-redux";
import Valoration from "./Valoration";
import "../style/Comments.css";
import "./SingleProduct.css";
import "../style/Sidebar.css";
import "../style/Valoration.css";
import { Button, Spinner } from "react-bootstrap";
import { getShoppingCart } from "../state/shoppingCart";
import { FaMinus, FaPlus } from "react-icons/fa";
import { addComasToPrice } from "../utils/PriceFormat";

const SingleProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);

  const [comments, setComments] = useState([]);
  const [mainSrc, setMainSrc] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [averageValoration, setAverageValoration] = useState(0);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const shoppingCart = useSelector((state) => state.shoppingCart);

  const handleOnclick = (productId, quantity) => {
    if (!user.id) {
      alert("Please login to add items to cart");
      return;
    }
    setLoadingAddToCart(true);
    dispatch(
      addOrCreateItemCart({
        ShoppingCartId: shoppingCart.id,
        productId,
        quantity,
      })
    )
      .then(() => {
        return dispatch(getShoppingCart());
      })
      .then(() => {
        setLoadingAddToCart(false);
      });
  };

  useEffect(() => {
    setLoadingInfo(true);
    setLoadingComments(true);
    axios
      .get(`https://the-green-shop.herokuapp.com/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainSrc(res.data.img ? res.data.img[0] : "");
        setLoadingInfo(false);
        return axios.get(
          `https://the-green-shop.herokuapp.com/api/productValoration/getAll/${id}`
        );
      })
      .then((res) => {
        if (res.data) {
          setComments(res.data);
          setLoadingComments(false);
        }
      })
      .catch((error) => {
        setLoadingInfo(false);
        setLoadingComments(false);
      });
  }, [id]);

  const handleImageClick = (event) => {
    setMainSrc(event.target.src);
  };

  const prevImg = () => {
    if (product.img.indexOf(mainSrc) > 0) {
      setMainSrc(product.img[product.img.indexOf(mainSrc) - 1]);
    }
  };

  const nextImg = () => {
    if (product.img.indexOf(mainSrc) < product.img.length - 1) {
      setMainSrc(product.img[product.img.indexOf(mainSrc) + 1]);
    }
  };

  return (
    <div className="container singleProductDiv">
      <div className="product-main" style={{ justifyContent: "center" }}>
        {loadingInfo && (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
        {!loadingInfo && (
          <>
            <div className="row d-flex col-lg-5 product-images ">
              <div className="row thumbnails-div col-4">
                {product.img
                  ? product.img.map((ruta, index) => {
                      return (
                        <img
                          className="product-thumbnail"
                          src={ruta}
                          onClick={handleImageClick}
                          alt={`product preview ${index + 1}`}
                          key={index}
                        ></img>
                      );
                    })
                  : null}
              </div>
              <div className="main-image col-8">
                <img
                  id="featured"
                  className=" product-img"
                  alt="main product"
                  style={{
                    alignSelf: "center",
                    width: "auto",
                    maxHeight: "400px",
                    margin: "auto",
                  }}
                  src={
                    product.img
                      ? mainSrc
                        ? mainSrc
                        : product.img[0]
                      : "https://peugeot.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png"
                  }
                />
                {product.img?.length > 1 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                    className="arrowDiv"
                  >
                    <button onClick={prevImg} className="arrow">
                      <ion-icon name="chevron-back-circle-outline"></ion-icon>
                    </button>
                    <button onClick={nextImg} className="arrow">
                      <ion-icon name="chevron-forward-circle-outline"></ion-icon>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div className="product-info">
                <div className="columnRight">
                  <h2 className="text-start product-name">{product.name}</h2>
                </div>
                <div className="rating-div text-start">
                  <span className="rating-span">
                    <div className="ratingNumber-span">{averageValoration}</div>
                    <ion-icon name="star"></ion-icon>
                  </span>
                  <span>
                    <a href="#product-reviews">{comments.length} Reviews</a>
                  </span>
                </div>
                <div className="product-price text-start d-flex">
                  <span className="price">
                    $ {product.price ? addComasToPrice(product.price) : ""}
                  </span>
                  <span className="stock">Stock {product.stock}</span>
                </div>

                <div className="product-description text-start">
                  <h4>About the product</h4>
                  <p>{product.description}</p>
                </div>
                <div className="text-start">
                  <label htmlFor="quantity">Quantity: </label>
                  <div className="d-flex buyDiv">
                    <div className="d-flex quantity-flex">
                      <Button
                        className="buttonQuantity"
                        variant="outline-primary"
                        style={{ margin: 0 }}
                        onClick={() => {
                          if (quantity > 0) setQuantity(quantity - 1);
                        }}
                      >
                        <FaMinus />
                      </Button>
                      <input
                        id="quantity"
                        style={{ maxWidth: "80px", textAlign: "center" }}
                        className="form-control"
                        placeholder="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      ></input>
                      <Button
                        className="buttonQuantity buttonQuantity2"
                        variant="outline-primary"
                        style={{ margin: 0 }}
                        onClick={() => {
                          if (quantity < product.stock)
                            setQuantity(parseInt(quantity) + 1);
                        }}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                    <button
                      className="btn btn-primary cart-button"
                      style={{ fontSize: "1.1em", width: "200px" }}
                      onClick={() => handleOnclick(product.id, quantity)}
                    >
                      {loadingAddToCart && (
                        <Spinner
                          animation="border"
                          color="white"
                          style={{ width: "1.2em", height: "1.2em" }}
                        />
                      )}
                      {!loadingAddToCart && "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        <div className="titleComment">Reviews</div>
        <Valoration
          setAverageValoration={setAverageValoration}
          setComments={setComments}
        />
        <div style={{ marginBottom: "100px" }} id="product-reviews">
          <div>
            {loadingComments && (
              <div style={{ textAlign: "center" }}>
                <Spinner animation="border" variant="secondary" />
              </div>
            )}
            {!loadingComments && (
              <>
                {comments.length ? (
                  comments.map((comment, index) => {
                    const userStars = [];
                    for (let i = 0; i < comment.valoration; i++) {
                      userStars.push(
                        <span
                          style={{ color: "yellow" }}
                          key={`${comment.id}-star-${i}`}
                        >
                          <ion-icon name="star" key={i}></ion-icon>
                        </span>
                      );
                    }
                    return (
                      <div key={`comment-${index}`} className="comment">
                        <span className="userComment">
                          {comment.User.name}{" "}
                          <span
                            style={{ color: "#404040", fontWeight: "normal" }}
                          >
                            {" "}
                            ({comment.updatedAt.substring(0, 10)})
                          </span>
                        </span>
                        <div>{userStars} </div>
                        <p>{comment.review}</p>
                      </div>
                    );
                  })
                ) : (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    No reviews yet
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
