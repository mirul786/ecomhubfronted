import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
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

  // Create Product Function
  const handleCreate = async (e) => {
    e.preventDefault();

    // product validation
    switch (true) {
      case !category:
        return NotificationManager.error(
          "Please enter product category",
          "Error"
        );

      case !image:
        return NotificationManager.error("Please upload image", "Error");

      case !name:
        return NotificationManager.error("Please enter product name", "Error");

      case !seller:
        return NotificationManager.error("Please enter seller name", "Error");

      case !description:
        return NotificationManager.error(
          "Please enter product description",
          "Error"
        );

      case !price:
        return NotificationManager.error("Please enter product price", "Error");

      case !discount:
        return NotificationManager.error("Please enter discount", "Error");

      case !netPrice:
        return NotificationManager.error("Please enter net price", "Error");

      case !quantity:
        return NotificationManager.error(
          "Please enter product quantity",
          "Error"
        );

      case !shipping:
        return NotificationManager.error(
          "Please enter shipping details",
          "Error"
        );

      default:
        break;
    }
    try {
      const productData = new FormData();
      productData.append("category", category);
      productData.append("name", name);
      productData.append("seller", seller);
      productData.append("description", description);
      productData.append("image", image);
      productData.append("price", price);
      productData.append("discount", discount);
      productData.append("netPrice", netPrice)
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/create-product`,
        productData
      );
      if (data?.success) {
        //console.log("product created successfully");
        NotificationManager.success(data?.message, "Success");
        navigate("/dashboard/admin/products");
      } else {
        //console.log("There is error while creating product");
        NotificationManager.error(data?.message, "Error");
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something Went wrong while creating product");
    }
  };
  return (
    <Layout title={"Create-products"}>
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-1"></div>
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-6">
            <h1>Manage Product</h1>
            <div className="m-1 w-75">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select Category"
                optionFilterProp="children"
                onChange={(value) => {
                  setCategory(value);
                }}
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
                {image && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
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
                  placeholder="Enter discount (in %)"
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
                >
                  {<Option value="0">No</Option>}
                  {<Option value="1">Yes</Option>}
                </Select>
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  onClick={handleCreate}
                  className="btn btn-primary text-center col-md-12"
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

