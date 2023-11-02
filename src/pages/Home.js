import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Checkbox, Radio } from "antd";
import Price from "./../components/Price";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //filter product funtion
  const filterProduct = async () => {
    try {
      // console.log("Checked:", checked);
      // console.log("Radio:", radio);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/filter-product`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something went wrong", "Error");
    }
  };

  //filter by categories
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //Get All categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
      NotificationManager.error(
        "Something went wront while getting all categories",
        "Error"
      );
    }
  };

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
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      NotificationManager.error("Something went wrong while loading");
    }
  };

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

  //Lifecycle Method
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    //eslint-disable-next-line
  }, [checked, radio]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    //eslint-disable-next-line
  }, [page]);

  return (
    <Layout title={"Ecom Hub - Best Offers"}>
      <div className="fluid-container">
        <div className="row m-2">
          <div className="col-md-2">
            <h4>Filter by category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/*Filter by Price*/}
            <h4 className="mt-3">Filter by Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                value={radio}
              >
                {Price?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex mt-3">
              <button
                className="btn btn-success"
                onClick={() => window.location.reload()}
              >
                RESET FILTER
              </button>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {products?.map((p) => (
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

export default Home;
