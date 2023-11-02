import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

const UserMenu = () => {
  const [auth] = useAuth()
  return (
      <div className="list-group user-profile mt-3">
        <NavLink to={"/dashboard/user"}>
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
          to={"/dashboard/user/profile"}
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
        <NavLink
          to={"/dashboard/user/orders"}
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
      </div>
    
  )
}

export default UserMenu