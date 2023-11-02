import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [seller, setSeller] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [netPrice, setNetPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState("");

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-single-product/${params.slug}/${params._id}`
      );
      setCategory(data.product.category._id);
      setName(data.product.name);
      setSeller(data.product.seller);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setDiscount(data.product.discount);
      setNetPrice(data.product.netPrice);
      setQuantity(data.product.quantity);
      setShipping(shipping ? "Yes" : "No");
    } catch (error) {
      console.log(error);
      NotificationManager.error("Error While getting the product", "Error");
    }
  };

  // lifecycle method
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  // get all categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Error while getting all categories", "Error");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  // Update Product Function
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("category", category);
      productData.append("name", name);
      productData.append("seller", seller);
      productData.append("description", description);
      image && productData.append("image", image);
      productData.append("price", price);
      productData.append("discount", discount);
      productData.append("netPrice", netPrice);
      productData.append("quantity", quantity);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.success) {
        //console.log("product updated successfully");
        navigate("/dashboard/admin/products");
        NotificationManager.success(data?.message, "Success");
      } else {
        //console.log("There is error while creating product");
        NotificationManager.error(data?.message, "Error");
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something Went wrong while updating product");
    }
  };

  //Delete product
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const answer = window.prompt(
        "Are you sure! You want to delete this product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/products/delete-product/${id}`
      );
      if (data?.success) {
        navigate("/dashboard/admin/products");
        NotificationManager.success(data?.message, "Success");
      } else {
        NotificationManager.error("Error while deleting the product", "Error");
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something went wrong", "Error");
    }
  };
  return (
    <Layout title={"Update-products"}>
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-1"></div>
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-6">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select Categories"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {image ? image.name : "upload image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {image ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="product-img"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/products/product-image/${id}`}
                      alt="product-img"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter product name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter seller name"
                  onChange={(e) => setSeller(e.target.value)}
                  value={seller}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <TextArea
                  type="text"
                  placeholder="Enter product descriptin"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="form-control"
                  style={{ height: "100px" }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Enter product Price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Enter dicount ( in % )"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Enter net price after discount"
                  onChange={(e) => setNetPrice(e.target.value)}
                  value={netPrice}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Number of items"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Shipped"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  {<Option value="0">No</Option>}
                  {<Option value="1">Yes</Option>}
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

/*

import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-single-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      image && productData.append("image", image);
      productData.append("category", category);
      const { data } = axios.put(
        `${process.env.REACT_APP_API}/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.success) {
        NotificationManager.error(data?.message);
      } else {
        NotificationManager.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {image ? image.name : "Upload Photo"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {image ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/products/product-image/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
  */
