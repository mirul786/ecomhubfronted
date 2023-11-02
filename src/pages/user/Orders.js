import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../Context/auth";
import { NotificationManager } from "react-notifications";
import axios from "axios";

const Orders = () => {
  const [order, setOrder] = useState([]);
  const [auth] = useAuth();

  //get all user orders
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/order`
      );
      setOrder(data);
    } catch (error) {
      console.log(error);
      NotificationManager.error(
        "Somethig went wrong while getting order",
        "Eroor"
      );
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  return (
    <Layout title={`${auth?.user?.name}-All Orders`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <UserMenu />
          </div>
          <div className="col-md-6">
            <h1>All Orders</h1>
            {order?.map((o, i) => {
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
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
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

export default Orders;
