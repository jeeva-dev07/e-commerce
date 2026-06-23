import { useState, useEffect } from "react";
import API from "../../api";
import { useNavigate, useParams } from "react-router-dom";

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    category_id: "",
  });

  useEffect(() => {
    if (isEdit) {
      API.get(`/products/${id}`)
        .then((res) => {
          const p = res.data;

          setForm({
            name: p.name || "",
            description: p.description || "",
            price: p.price || "",
            stock: p.stock || "",
            image_url: p.image_url || "",
            category_id: p.category_id
              ? String(p.category_id)
              : "",
          });
        })
        .catch((err) => {
          console.log(err);
          alert("Product Load Failed");
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      image_url: form.image_url.trim(),
      category_id: parseInt(form.category_id, 10),
    };

    console.log("Sending Payload:", payload);

    try {
      if (isEdit) {
        await API.put(`/admin/products/${id}`, payload);
        alert("✅ Product Updated Successfully");
      } else {
        await API.post("/admin/products", payload);
        alert("✅ Product Added Successfully");
      }

      navigate("/admin/products");
    } catch (err) {
      console.log("ERROR:", err.response?.data);

      alert(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Operation Failed"
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>
          {isEdit
            ? "✏️ Edit Product"
            : "➕ Add Product"}
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={form.image_url}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">
              Select Category
            </option>

            <option value="1">
              Electronics
            </option>

            <option value="2">
              Fashion
            </option>

            <option value="3">
              Home
            </option>

            <option value="4">
              Books
            </option>

            <option value="5">
              Sports
            </option>
          </select>

          <button
            type="submit"
            style={styles.button}
          >
            {isEdit
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "30px",
  },

  card: {
    width: "500px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    background: "#3498db",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
};
