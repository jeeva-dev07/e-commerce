import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductsCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div style={styles.card}>
      {/* IMAGE */}
      <img
        src={product.image_url}
        alt={product.name}
        style={styles.image}
        onError={(e) =>
          (e.target.src =
            "https://via.placeholder.com/300x200?text=No+Image")
        }
      />

      {/* CONTENT */}
      <div style={styles.content}>
        <h3 style={styles.title}>
          {product.name}
        </h3>

        <p style={styles.desc}>
          {product.description}
        </p>

        <p style={styles.category}>
          📂 {product.category || "Uncategorized"}
        </p>

        <p style={styles.stock}>
          📦 Stock: {product.stock}
        </p>

        {/* PRICE + BUTTON */}
        <div style={styles.bottom}>
          <span style={styles.price}>
            ₹{Number(product.price).toLocaleString()}
          </span>

          <button
            onClick={() =>
              addToCart(product, 1)
            }
            disabled={product.stock === 0}
            style={{
              ...styles.btn,
              background:
                product.stock === 0
                  ? "#aaa"
                  : "#3498db",
              cursor:
                product.stock === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {product.stock === 0
              ? "Out of Stock"
              : "Add To Cart"}
          </button>
        </div>

        {/* VIEW DETAILS */}
        <Link
          to={`/products/${product.id}`}
          style={styles.link}
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default ProductsCard;
const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow:
      "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },

  content: {
    padding: "12px",
  },

  title: {
    margin: "0 0 5px 0",
    fontSize: "16px",
  },

  desc: {
    fontSize: "13px",
    color: "gray",
    height: "35px",
    overflow: "hidden",
  },

  category: {
    fontSize: "12px",
    marginTop: "5px",
  },

  stock: {
    fontSize: "12px",
    marginBottom: "8px",
  },

  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },

  price: {
    fontWeight: "bold",
    color: "green",
  },

  btn: {
    border: "none",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
  },

  link: {
    display: "block",
    marginTop: "10px",
    fontSize: "12px",
    color: "#3498db",
    textDecoration: "none",
  },
};
