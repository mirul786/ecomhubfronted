import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  // get all products
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-single-product/${params?.slug}/${params?._id}`
      );
      if (data?.success) {
        setProducts(data?.product);
        getSimilarProducts(data?.product?._id, data?.product?.category?._id);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error(
        "Something went wrong while getting products",
        "Error"
      );
    }
  };

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/similar-product/${pid}/${cid}`
      );
      if (data?.success) {
        setSimilarProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error(
        "Something went wrong while getting similar products",
        "Error"
      );
    }
  };

  // lifecycle method
  useEffect(() => {
    if (params?.slug) getProducts();
    //eslint-disable-next-line
  }, [params?.slug]);

  return (
    <Layout title={"Product Details"}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/products/product-image/${products?._id}`}
              className="card-img-top"
              alt={products?.name}
            />
          </div>
          <div className="col-md-6">
            <h6 className="mt-2">{products.description}</h6>
            <p className="cart-seller">Seller: {products.seller}</p>
            <p className="discount">Special Price</p>
            <h6>
              <span className="netPrice">₹{products.netPrice}</span>
              <span className="price">₹{products.price}</span>
              <span className="discount">{products.discount}% Off</span>
            </h6>
            <div className="mt-5">
              <button
                className="btn btn-success btn-lg me-2 order-btn"
                onClick={() => {
                  setCart([...cart, products]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, products])
                  );
                  NotificationManager.success(
                    "Successfully added to cart",
                    "Success"
                  );
                  navigate("/cart");
                }}
              >
                Add to Card
              </button>
              <button
                className="btn btn-success btn-lg ms-2 order-btn"
                onClick={() => {
                  setCart([...cart, products]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, products])
                  );
                  NotificationManager.success(
                    "Successfully added to cart",
                    "Success"
                  );
                  navigate("/checkout");
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        {similarProducts?.length < 1 ? null : <h5>Similar Products</h5>}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {similarProducts?.map((p) => (
            <div key={p._id} className="col">
              <div className="card h-100">
                <Link>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-image/${p?._id}`}
                    className="card-img-top"
                    alt={p.name}
                    onClick={() => {
                      navigate(`/product-details/${p?.slug}/${p?._id}`);
                    }}
                  />
                </Link>
                <div className="card-body">
                  <p className="card-text">
                    {p.description.substring(0, 40)}...
                  </p>
                  <p className="card-text cart-seller">{p.name}</p>
                  <h6>
                    <span className="price">₹{p.price}</span>
                    <span className="netPrice">₹{p.netPrice}</span>
                    <span className="discount">{p.discount}% Off</span>
                  </h6>
                  {p?.netPrice < 500 ? null : (
                    <span className="cart-seller">Free Delivery</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
