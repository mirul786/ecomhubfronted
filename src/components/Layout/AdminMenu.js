import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/auth";

const AdminMenu = () => {
  const [auth] = useAuth()
  return (
      <div className="list-group user-profile mt-3">
        <NavLink to={"/dashboard/admin"}>
          <div className='card p-2'>
            <div className='row'>
              <div className='col-md-2 me-3'>
                <img src='/images/icons/profile.png' alt='profile' width={"50px"}/>
              </div>
              <div className='col-md-9'>
                <span>Hello,</span>
                <span className='user-profile'><h5>{auth?.user?.name}</h5></span>
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to={"/dashboard/admin/create-category"}
          className="list-group-item list-group-item-action"
        >
          Create Category
        </NavLink>
        <NavLink
          to={"/dashboard/admin/create-product"}
          className="list-group-item list-group-item-action"
        >
          Create Product
        </NavLink>
        <NavLink
          to={"/dashboard/admin/products"}
          className="list-group-item list-group-item-action"
        >
          Products
        </NavLink>
        <NavLink
          to={"/dashboard/admin/all-orders"}
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
      </div>
  );
};

export default AdminMenu;
