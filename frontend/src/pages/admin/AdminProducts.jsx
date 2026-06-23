import { useEffect, useState } from "react";
import API from "../../api";
import { Link } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= FETCH =================
  const fetchProducts = () => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Fetch error:", err));
  };

  // ================= DELETE =================
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      alert("Product Deleted");
    } catch (err) {
      console.log("Delete error:", err);
      alert("Delete Failed");
    }
  };

  // ================= FILTER =================
  const filteredProducts = products.filter((p) => {
    const searchMatch = p.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      p.category?.toLowerCase() === category.toLowerCase();

    return searchMatch && categoryMatch;
  });

  // ================= SORT =================
  const sortedProducts = [...filteredProducts];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div style={styles.page}>
      <h1>🛠 Admin Products</h1>

      <Link to="/admin/products/add" style={styles.addBtn}>
        ➕ Add Product
      </Link>

      {/* ================= FILTERS ================= */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home">Home</option>
          <option value="Books">Books</option>
          <option value="Sports">Sports</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={styles.select}
        >
          <option value="">Sort By</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
      </div>

      {/* ================= PRODUCTS ================= */}
      {sortedProducts.length === 0 ? (
        <h3>No Products Found</h3>
      ) : (
        sortedProducts.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={p.image_url}
              alt={p.name}
              style={styles.image}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/120";
              }}
            />

            <div>
              <h3>{p.name}</h3>

              <p>Category: {p.category}</p>
              <p>Price: ₹{p.price}</p>
              <p>Stock: {p.stock}</p>

              <div style={styles.buttonRow}>
                <Link to={`/admin/products/edit/${p.id}`}>
                  <button style={styles.editBtn}>Edit</button>
                </Link>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminProducts;

// ================= STYLES =================
const styles = {
  page: {
    padding: "20px",
  },

  addBtn: {
    display: "inline-block",
    marginBottom: "20px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  input: {
    padding: "10px",
    width: "250px",
  },

  select: {
    padding: "10px",
  },

  card: {
    display: "flex",
    gap: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    alignItems: "center",
  },

  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  editBtn: {
    background: "#3498db",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
