import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { NotificationManager } from "react-notifications";
import SearchInput from "../Form/SearchInput";
import useCategory from "../hooks/useCategory";
import { useCart } from "../../Context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      user: null,
      ...auth,
      token: "",
    });
    localStorage.removeItem("auth");
    NotificationManager.success("Logout Successfuly", "Success");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to={"/"} className="navbar-brand">
              <img
                src="/images/icons/shopping-bag.png"
                alt="shopping0bag"
                width={"30px"}
              />{" "}
              GLAM MART
            </Link>
            <div className="ms-auto">
              <SearchInput />
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link">
                  HOME
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to={"/register"} className="nav-link">
                      REGISTER
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/login"} className="nav-link">
                      LOGIN
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown false">
                    <Link
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          DASHBOARD
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to={"/login"}
                          className="dropdown-item"
                        >
                          LOGOUT
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item m-1">
                <Badge count={cart?.length} offset={[5, 5]} showZero>
                  <NavLink to={"/cart"} className="nav-link">
                    CART
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
