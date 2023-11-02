import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
      );
      if (res.data.ok) {
        setOk(true);
        //console.log(ok);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
    //eslint-disable-next-line
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
