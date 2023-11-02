import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();

  // calculate total price of cart items
  let total = 0;
  let netPrice = 0;
  let discount = 0;
  let totalAmont = 0;

  cart?.map((items) => (netPrice = netPrice + items.netPrice));
  cart?.map((items) => (total = total + items.price));
  cart?.map((items) => (discount = total - netPrice));
  cart?.map((items) => (totalAmont = netPrice));
  // remove cart item function
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
      NotificationManager.error(
        "Soemthing went wrong while removing cart item",
        "Error"
      );
    }
  };

  return (
    <Layout title={`Cart`}>
      {cart?.length === 0 ? (
        auth?.token ? (
          <div className="container">
            <div className="row">
              <div className="col-md-12 empty-cart">
                <img src="/images/empty-cart/empty-cart.png" alt="empty cart" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 empty-cart">
                <h5>Your cart is empty!</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 empty-cart">
                <p>Add items to it now.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 empty-cart">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/")}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-12 empty-cart">
                <img src="/images/empty-cart/empty-cart.png" alt="empty cart" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 empty-cart">
                <h6>Missing Cart items?</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 empty-cart">
                <p>Login to see the items you added previously</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 empty-cart">
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/login", { state: "/cart" })}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        )
      ) : auth?.token ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-8 mt-3">
              {cart?.map((p) => (
                <div className="row mb-2 card flex-row" key={p._id}>
                  <div className="col-md-4 cart-image">
                    <Link to={`/product-details/${p.slug}/${p._id}`}>
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/products/product-image/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                    </Link>
                  </div>
                  <div className="col-md-8">
                    <h5 className="product-description mt-2">
                      <Link to={`/product-details/${p.slug}/${p._id}`}>
                        {p.description.substring(0, 50)}...
                      </Link>
                    </h5>
                    <p className="mt-2 cart-seller">Seller: {p.seller}</p>
                    <h6>
                      <span className="price">₹{p.price}</span>
                      <span className="netPrice">₹{p.netPrice}</span>
                      <span className="discount">{p.discount}% Off</span>
                    </h6>
                    <button
                      className="btn btn-warning remove-cart"
                      onClick={() => removeCartItem(p._id)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center">
              <div className="mt-3 text-start">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">
                        <h4 className="price-details-heading">Price Details</h4>
                        <hr />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Price ({cart?.length} item)</td>
                      <td>₹{total}</td>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td>
                        <h6 className="bachat">-₹{discount}</h6>
                      </td>
                    </tr>
                    <tr>
                      <td>Delivery Charges</td>
                      {total < 500 ? (
                        <td>₹40</td>
                      ) : (
                        <td>
                          <span className="line-through">₹40</span>
                          <span className="free">free</span>
                        </td>
                      )}
                    </tr>
                    <tr className="total-amount">
                      <td>
                        <h6>Total Amount</h6>
                      </td>
                      <td>
                        <h6>₹{totalAmont}</h6>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h6 className="bachat">
                  You'll save ₹{discount} on this order
                </h6>
                <div className="secure-payment mt-3">
                  <img
                    className="m-2"
                    src="/images/icons/secure-payment.png"
                    alt="secure-payment-icon"
                    width={"25px"}
                    height={"25px"}
                  />
                  <h6 className="secure-payment-message">
                    Safe and Secure Payments.Easy returns.100% Authentic
                    products.
                  </h6>
                </div>
                {auth?.token ? (
                  <div className="place-order">
                    <button
                      className="btn btn-success btn-lg place-order-btn"
                      onClick={() => navigate("/checkout")}
                    >
                      PLACE ORDER
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-8">
              {cart?.map((p) => (
                <div className="row mb-2 card flex-row" key={p._id}>
                  <div className="col-md-4 cart-image">
                    <Link to={`/product-details/${p.slug}/${p._id}`}>
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/products/product-image/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                    </Link>
                  </div>
                  <div className="col-md-8">
                    <h5 className=" product-description mt-2">
                      <Link to={`/product-details/${p.slug}/${p._id}`}>
                        {p.description.substring(0, 50)}...
                      </Link>
                    </h5>
                    <p className="mt-2 cart-seller">Seller: {p.seller}</p>
                    <h6>
                      <span className="price">₹{p.price}</span>
                      <span className="netPrice">₹{p.netPrice}</span>
                      <span className="discount">{p.discount}% Off</span>
                    </h6>
                    <div>
                      <button
                        className="btn btn-warning remove-cart"
                        onClick={() => removeCartItem(p._id)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center">
              <div className="mt-3 text-start">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">
                        <h4 className="price-details-heading">Price Details</h4>
                        <hr />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Price ({cart?.length} item)</td>
                      <td>₹{total}</td>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td>
                        <h6 className="bachat">-₹{discount}</h6>
                      </td>
                    </tr>
                    <tr>
                      <td>Delivery Charges</td>
                      {total < 500 ? (
                        <td>₹40</td>
                      ) : (
                        <td>
                          <span className="line-through">₹40</span>
                          <span className="free">free</span>
                        </td>
                      )}
                    </tr>
                    <tr className="total-amount">
                      <td>
                        <h6>Total Amount</h6>
                      </td>
                      <td>
                        <h6>₹{totalAmont}</h6>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h6 className="bachat">
                  You'll save ₹{discount} on this order
                </h6>
                <div className="secure-payment mt-3">
                  <img
                    className="m-2"
                    src="/images/icons/secure-payment.png"
                    alt="secure-payment-icon"
                    width={"25px"}
                    height={"25px"}
                  />
                  <h6 className="secure-payment-message">
                    Safe and Secure Payments.Easy returns.100% Authentic
                    products.
                  </h6>
                </div>
                {auth?.token ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Change Address
                  </button>
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Login to Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;

