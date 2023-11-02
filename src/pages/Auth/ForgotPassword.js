import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // form submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          answer,
          newPassword,
        }
      );
      if (res && res.data.success) {
        NotificationManager.success(res.data && res.data.message);
        //console.log(res.data.message)
        navigate("/login");
      } else  {
        //console.log(res.data.message)
        NotificationManager.error(res.data && res.data.message);
        //alert("invalid email or answer")
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something went wrong", "Error");
    }
  }
  return (
    <Layout title={"Forgot-Password"}>
      <div className="form-container">
        <form className="form-register" onSubmit={handleSubmit}>
          <h6 className="forgot-password-heading">FORGOT PASSWORD</h6>
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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="What is your faviourite sports?"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputNewPassword"
              placeholder="Enter your new password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET PASSWORD
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
