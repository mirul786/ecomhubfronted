import React, {useState, useEffect} from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../Context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const { name, email, phone } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
  }, [auth?.user]);
  return (
    <Layout title={`${auth?.user?.name}(Admin) Dashboard`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-6 mt-3">
            <div className="card p-2">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="mb-3">Personal Information</h4>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      value={name}
                      className="form-control p-3 profile-input"
                      placeholder="Username"
                      aria-label="Username"
                      disabled
                    />
                  </div>
                  <h4 className="mt-3 mb-3">Email Address</h4>
                  <input
                    type="text"
                    value={email}
                    className="form-control p-3 profile-input"
                    placeholder="email"
                    aria-label="email"
                    disabled
                  />
                  <h4 className="mt-3 mb-3">Mobile Number</h4>
                  <input
                    type="text"
                    value={phone}
                    className="form-control p-3 profile-input"
                    placeholder="phone"
                    aria-label="phone"
                    disabled
                  />
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
