# 🛒 E-Commerce Store

A full-stack E-Commerce application built with React, Flask, and MySQL.

## 🚀 Features

### Customer
- View Products
- Add Products to Cart
- Update Cart Quantity
- Remove Products from Cart
- Place Orders
- View Order History
- User Login & Register

### Admin
- Admin Login
- Add Products
- Edit Products
- Delete Products
- Manage Categories
- View Orders

---

## 🛠️ Tech Stack

### Frontend
- React JS
- React Router DOM
- Axios
- Bootstrap

### Backend
- Flask
- Flask-JWT-Extended
- Flask-CORS
- workbench

### Database
- MySQL

---

## 📂 Project Structure

```
ecommerce-app/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── models/
│   ├── routes/
│   ├── seed.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/jeeva-dev07/ecommerce-app.git
```

### 2. Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

### Configure MySQL Database

Create database:

```sql
CREATE DATABASE ecommerce_db;
```

Update database configuration in:

```python
config.py
```

Example:

```python
SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:password@localhost/ecommerce_db"
```

### Run Backend

```bash
python app.py
```

Server:

```
http://127.0.0.1:5000
```

---

## 🎨 Frontend Setup

```bash
cd frontend

npm install
```

Run React App:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

## 🔑 Default Login Credentials

### Admin

```text
Email:
admin@gmail.com

Password:
admin123
```

### Customer

```text
Email:
user@gmail.com

Password:
user123
```

---

## 📡 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Products

```http
GET    /api/products
GET    /api/products/<id>
POST   /api/products
PUT    /api/products/<id>
DELETE /api/products/<id>
```

### Categories

```http
GET /api/categories
```

### Cart

```http
GET    /api/cart
POST   /api/cart
PUT    /api/cart/<id>
DELETE /api/cart/<id>
```

### Orders

```http
GET  /api/orders
POST /api/orders
```

---

## 📸 Screenshots

### Home Page

- Product Listing
- Add To Cart

### Cart Page

- Update Quantity
- Remove Item

### Admin Dashboard

- Product Management
- Category Management

---
