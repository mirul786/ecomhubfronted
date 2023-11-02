import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  //get all orders
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data?.orders);
    } catch (error) {
      console.log(error);
      NotificationManager.error(
        "Something went wrong while getting all orders",
        "Error"
      );
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  //handle status change function
  const handleStatusChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      if (data?.success) {
        getAllOrders();
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error(
        "Something went wrong while updating order status",
        "Error"
      );
    }
  };
  return (
    <Layout title={"All-AdminOrders"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Admin Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Q</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) =>
                              handleStatusChange(o?._id, value)
                            }
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container-fluid">
                    {o?.products.map((p) => (
                      <div className="row mb-2 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/products/product-image/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width={"100px"}
                            height={"200px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 50)}...</p>
                          <p>$ {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
