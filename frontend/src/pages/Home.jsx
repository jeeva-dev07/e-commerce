import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  let filteredProducts = [...products];

  // Search
  if (search) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Category Filter
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  // Sort
  if (sort === "low") {
    filteredProducts.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  }

  if (sort === "high") {
    filteredProducts.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛒 ShopMart</h1>

      {/* SEARCH + FILTER */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          <option value="">All Categories</option>
          <option value="Electronics">
            Electronics
          </option>
          <option value="Fashion">
            Fashion
          </option>
          <option value="Home">
            Home
          </option>
          <option value="Books">
            Books
          </option>
          <option value="Sports">
            Sports
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={styles.select}
        >
          <option value="">
            Sort By Price
          </option>

          <option value="low">
            Low → High
          </option>

          <option value="high">
            High → Low
          </option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div style={styles.grid}>
        {filteredProducts.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={p.image_url}
              alt={p.name}
              style={styles.image}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image";
              }}
            />

            <div style={styles.content}>
              <h3>{p.name}</h3>

              <p>{p.description}</p>

              <p style={styles.category}>
                {p.category}
              </p>

              <p style={styles.price}>
                ₹{p.price}
              </p>

              <button
                onClick={() => addToCart(p, 1)}
                style={styles.btn}
              >
                Add To Cart
              </button>

              <Link
                to={`/products/${p.id}`}
                style={styles.link}
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

const styles = {
  page: {
    padding: "20px",
    fontFamily: "Arial",
    background: "#f5f6fa",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
  },

  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  input: {
    padding: "10px",
    width: "250px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },

  content: {
    padding: "15px",
  },

  category: {
    color: "#666",
    fontSize: "13px",
  },

  price: {
    color: "green",
    fontWeight: "bold",
    fontSize: "20px",
  },

  btn: {
    width: "100%",
    background: "#3498db",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "10px",
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  },
};
