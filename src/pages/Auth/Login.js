import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { useAuth } from "../../Context/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  // form submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        NotificationManager.success(res.data && res.data.message, "Success");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        NotificationManager.error(res.data.message, "Error");
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something went wrong", "Error");
    }
  }

  return (
    <Layout title={"Login-Ecom Hub"}>
      <div className="form-container">
        <form className="form-register" onSubmit={handleSubmit}>
          <h1>LOGIN</h1>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
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
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              className="auth-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              FORGOT PASSWORD
            </button>
          </div>
          <button type="submit" className="auth-btn">
            LOGIN
          </button>
          <p className="conditions">
            By continuing, you agree to our
            <br />
            <Link to={"/policies"}>Conditions of Use </Link>
            and
            <Link to={"/policies"}> Privacy Notice</Link> .
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
