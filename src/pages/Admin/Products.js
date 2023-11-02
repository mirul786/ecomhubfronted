import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Get all Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      NotificationManager.error(
        "Something went wrong while getting all products",
        "Error"
      );
    }
  };

  useEffect(() => {
    getAllProducts();
    //eslint-disable-next-line
  }, []);

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
      NotificationManager.error(
        "Something went wrong while getting total count"
      );
    }
  };

  //load page
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);

      if (data?.success) {
        setProducts([...products, ...data?.products]);
        console.log(data?.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      NotificationManager.error("Something went wrong while loading");
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    //eslint-disable-next-line
  }, [page]);
  return (
    <Layout title={"All-Products"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  className="product-link"
                  onClick={() => {
                    navigate(`/dashboard/admin/products/${p.slug}/${p._id}`);
                  }}
                >
                  <div className="col">
                    <div className="card h-100">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/products/product-image/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
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
                </Link>
              ))}
            </div>
            <div className="m-3 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

/*
 <div className="cold-md-3 d-flex m-2">
              {products?.map((p) => (
                <div className="card-group m-1" style={{ width: "18rem" }}>
                <div class="card">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-image/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description}
                    </p>
                  </div>
                </div>
                </div>
              ))}
            </div>
*/
