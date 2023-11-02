import React, { useState, useEffect } from "react";
import UserMenu from "./../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { NotificationManager } from "react-notifications";
import axios from "axios";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, phone, address, } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  // update profile form submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.error) {
        NotificationManager.error(data?.error, "Error");
      } else {
        setAuth({ ...auth, user: data?.updateUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        NotificationManager.success(
          "User profile updated successfully",
          "Success"
        );
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something went wrong", "Error");
    }
  }
  return (
    <Layout title={`${auth?.user?.name}-Profile`}>
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-1"></div>
          <div className="col-md-2">
            <UserMenu />
          </div>
          <div className="col-md-6">
            <div className="form-container">
              <form className="form-register" onSubmit={handleSubmit}>
                <h1>UPDATE</h1>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Enter your Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail"
                    placeholder="Enter your Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Enter your Mobile number"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Enter your full Address"
                  />
                </div>
                <p className="conditions">
                  By continuing, you agree to our
                  <br />
                  <Link to={"/policies"}>Conditions of Use </Link>
                  and
                  <Link to={"/policies"}> Privacy Notice</Link> .
                </p>
                <button type="submit" className="btn btn-primary auth-btn">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
