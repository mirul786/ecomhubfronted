import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import useCategory from "../components/hooks/useCategory";

const Categories = () => {
  const categories = useCategory();
  const navigate = useNavigate();
  return (
    <Layout title={`All-Categories`}>
      <div className="container">
        <div className="row">
          {categories?.map((c) => (
            <div className="col-md-6 text-center mt-3 mb-2 p-3" key={c._id}>
              <button
                className="btn btn-success category-btn"
                onClick={() => navigate(`/category/${c.slug}`)}
              >
                {c.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
