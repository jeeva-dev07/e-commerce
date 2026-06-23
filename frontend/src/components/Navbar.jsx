import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        🛒 ShopMart
      </Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Home
        </Link>

        {user && (
          <>
            <Link to="/orders" style={styles.link}>
              Orders
            </Link>

            <Link to="/cart" style={styles.cart}>
              Cart 🛒
              <span style={styles.badge}>
                {totalItems}
              </span>
            </Link>
          </>
        )}

        {/* ✅ ADMIN MENU FIXED */}
        {user?.role === "admin" && (
          <>
            <Link
              to="/admin/products"
              style={styles.link}
            >
              Admin Products
            </Link>

            <Link
              to="/admin/orders"
              style={styles.link}
            >
              Admin Orders
            </Link>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>

            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        ) : (
          <>
            <span style={styles.user}>
              👋 {user.name}
            </span>

            <button
              onClick={handleLogout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#111",
    padding: "12px 20px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "22px",
    fontWeight: "bold",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
  },

  cart: {
    color: "#fff",
    textDecoration: "none",
    position: "relative",
  },

  badge: {
    background: "red",
    color: "#fff",
    borderRadius: "50%",
    padding: "2px 7px",
    fontSize: "12px",
    marginLeft: "5px",
  },

  user: {
    color: "#fff",
    fontWeight: "bold",
  },

  logoutBtn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
