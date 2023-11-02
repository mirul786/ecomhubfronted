import React from "react";
import { useSearch } from "../Context/search.js";
import Layout from "../components/Layout/Layout.js";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate()
  const [values] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {values?.results?.map((p) => (
              <div key={p._id} className="col">
                <div className="card h-100">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-image/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <p className="card-text"> $ {p.price}</p>
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-outline-primary ms-1" onClick={() => {
                      navigate(`/product-details/${p.slug}/${p._id}`)
                    }}>
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
      </div>
    </Layout>
  );
};

export default Search;
