import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import CategoryForm from "./../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        NotificationManager.success(`${name} is created`);
        getCategories();
        setName("");
      } else {
        NotificationManager.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something went wrong in input form");
    }
  };

  // get all categories
  const getCategories = async () => {
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );
      //console.log(res.data);
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

  // Handle update categories
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        //console.log(data);
        NotificationManager.success(
          `Successfully updated to '${updatedName}'`,
          "Success"
        );
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getCategories();
      } else {
        NotificationManager.error(data.message);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something Went Wrong", "Error");
    }
  };

  // Handle Delete categories
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`,
        { name: updatedName }
      );
      if (data?.success) {
        NotificationManager.success("Successfully deleted", "Success");
        getCategories();
      } else {
        NotificationManager.error(data.message);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something Went Wrong", "Error");
    }
  };
  return (
    <Layout title={"Create-Category"}>
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-1"></div>
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage categories</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setVAlue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              open={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForm
                value={updatedName}
                setVAlue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
