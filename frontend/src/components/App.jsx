import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { persistUser } from "../state/user";
import { getShoppingCart } from "../state/shoppingCart";
import { getItemCart } from "../state/itemCart";

import SingleProduct from "../commons/SingleProduct.jsx";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import NewProductForm from "./NewProductForm";
import EditProductForm from "./EditProductForm";
import OrderHistorial from "./OrderHistorial";
import CartDetails from "./CartDetails";
import FilterSearch from "./FilterSearch";
import NotFound from "./NotFound";
import FilterSearchCategory from "./FilterSearchCategory";

import AdminCategories from "./AdminCategories";
import NewCategForm from "./NewCategForm";
import EditCategForm from "./EditCategForm";

import OrderDetails from "./OrderDetail";
import Home from "./Home";
import ValueSearch from "./ValueSearch";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    setProducts([]);
    dispatch(persistUser());
  }, []);

  useEffect(() => {
    dispatch(getShoppingCart()).then(({ payload }) => {
      if (payload) dispatch(getItemCart(payload.id));
    });
  }, [user.id]);

  const [products, setProducts] = useState([]);
  const [categoryFamilies, setCategoryFamilies] = useState([]);

  useEffect(() => {
    axios
      .get("https://the-green-shop.herokuapp.com/api/product/")
      .then((res) => {
        setProducts(res.data);
        return axios.get("https://the-green-shop.herokuapp.com/api/categoryFamily/getAll");
      })
      .then(({ data }) => {
        setCategoryFamilies(data);
      });
  }, []);

  return (
    <div
      className="App"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Navbar setProducts={setProducts} />
        {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route
            path="/products/all"
            element={<FilterSearch products={products} />}
          />
          {categoryFamilies.map((family) => {
            return (
              <Route
                path={`/${family.name}/:name`}
                element={<FilterSearchCategory family={family} />}
                key={family.id}
              />
            );
          })}
          <Route path="/orders/history" element={<OrderHistorial />} />
          <Route path="/CartDetails" element={<CartDetails />} />
          <Route path="/orderDetails/:id" element={<OrderDetails />} />

          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/search/value/:value" element={<ValueSearch />} />
          {user.roleId === 2 ? (
            <>
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route
                path="/admin/products/new-product"
                element={<NewProductForm />}
              />
              <Route
                path="/admin/products/edit/:id"
                element={<EditProductForm />}
              />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route
                path="/admin/categories/new-category"
                element={<NewCategForm />}
              />
              <Route
                path="/admin/categories/edit/:id"
                element={<EditCategForm />}
              />
            </>
          ) : null}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {/* </div> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
