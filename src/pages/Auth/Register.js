import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // form submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        answer,
        address,
      });
      if (res.data.success) {
        NotificationManager.success("Registered Successfully", "Success");
        navigate("/login");
      } else {
        NotificationManager.error(res.data.message, "Error");
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something went wrong", "Error")
    }
  }

  return (
    <Layout title={"Register-Ecom Hub"}>
      <div className="form-container">
        <form className="form-register" onSubmit={handleSubmit}>
          <h1>REGISTER</h1>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter your Name"
              required
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
              required
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
              required
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
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="What is your faviourite sports?"
              required
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
              required
            />
          </div>
          <p className="conditions">
            By continuing, you agree to our
            <br />
            <Link to={"/policies"}>Conditions of Use </Link>
            and
            <Link to={"/policies"}> Privacy Notice</Link> .
          </p>
          <button type="submit" className="auth-btn">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
