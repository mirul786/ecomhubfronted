import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const params = useParams();
  const navigate = useNavigate();

  // get category
  const getCategoryProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-category/${params.slug}`
      );
      if (data?.success) {
        setProducts(data?.products);
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error(
        "Something went wrong while getting category product",
        "Error"
      );
    }
  };

  //lifecycle method
  useEffect(() => {
    if (params?.slug) getCategoryProduct();
    //eslint-disable-next-line
  }, [params?.slug]);
  return (
    <Layout title={`${category?.name}`}>
      <div className="container text-center mt-3">
        <h4>Category: {category?.name}</h4>
        <h6>
          {products.length < 2
            ? `${products.length} result found`
            : `${products.length} results found`}
        </h6>

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
          {products?.map((p) => (
            <div key={p._id} className="col">
              <div className="card h-100">
                <Link>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-image/${p?._id}`}
                    className="card-img-top"
                    alt={p.name}
                    onClick={() => {
                      navigate(`/product-details/${p.slug}/${p._id}`);
                      window.location.reload();
                    }}
                  />
                </Link>
                <div className="card-body">
                  <p className="card-text"> $ {p.price}</p>
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 100)}...
                  </p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-outline-primary ms-1"
                    onClick={() => {
                      navigate(`/product-details/${p.slug}/${p._id}`);
                      window.location.reload();
                    }}
                  >
                    MORE DETAILS
                  </button>
                  <button className="btn btn-outline-danger ms-1">
                    ADD TO CARD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
