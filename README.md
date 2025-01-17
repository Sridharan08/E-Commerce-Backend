
# E-commerce Platform Backend

This project is the backend for an e-commerce platform. It provides APIs for managing products, carts, orders, and user authentication. The backend is built using Node.js, Express, and MongoDB.

---

## Features

### **Authentication**
- **Sign Up**: New users can register on the platform.
- **Sign In**: Existing users can log in and receive a session token (JWT).

### **Product Management**
- Add, update, delete, and fetch products.

### **Cart Management**
- Add products to the cart, update quantities, delete products, and fetch cart details.

### **Order Management**
- Place orders, fetch all orders, and fetch orders by customer ID.

---

## Tech Stack

- **Backend Framework**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Hashing**: bcrypt

---

## Installation

### Prerequisites

- Node.js installed
- MongoDB installed or access to a cloud MongoDB instance

### Steps

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000` by default.

---

## API Endpoints

### **Authentication**

| Method | Endpoint  | Description          |
|--------|-----------|----------------------|
| POST   | /signup   | Register a new user  |
| POST   | /signin   | Log in an existing user |

### **Product Management**

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | /products/addproduct   | Add a new product        |
| PUT    | /products/updateproduct/:productId | Update a product by ID |
| DELETE | /products/deleteproduct/:productId | Delete a product by ID |
| GET    | /products              | Get all products         |

### **Cart Management**

| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| POST   | /cart/add      | Add a product to the cart    |
| PUT    | /cart/update   | Update product quantity in cart |
| DELETE | /cart/delete   | Remove a product from the cart |
| GET    | /cart          | Get cart details             |

### **Order Management**

| Method | Endpoint                     | Description                  |
|--------|------------------------------|------------------------------|
| POST   | /orders/placeorder           | Place an order               |
| GET    | /orders/getallorders         | Get all orders (Admin)       |
| GET    | /orders/customer/:customerId | Get orders by customer ID    |

---

## Sample Data

### **Products**
```json
[
  {
    "name": "Wireless Earbuds",
    "description": "High-quality wireless earbuds with noise cancellation.",
    "price": 99.99,
    "category": "Electronics"
  },
  {
    "name": "Fitness Tracker",
    "description": "Track your daily activities and monitor your health.",
    "price": 49.99,
    "category": "Wearable Technology"
  }
]
```

### **Cart**
```json
{
  "customerId": "64d2f9e8f4b1c30456a48ef7",
  "products": [
    {
      "productId": "64d2f9e8f4b1c30456a48ef1",
      "quantity": 2
    }
  ]
}
```

### **Order**
```json
{
  "customerId": "64d2f9e8f4b1c30456a48ef7",
  "products": [
    {
      "productId": "64d2f9e8f4b1c30456a48ef1",
      "quantity": 2
    }
  ],
  "totalAmount": 199.98,
  "shippingAddress": "123 Main Street, Cityville",
  "status": "Processing"
}
```

---

## Future Enhancements

- Add filtering and sorting for products.
- Implement order cancellation and refund process.
- Add admin authentication and role-based access control.
- Deploy the backend to a cloud platform (e.g., AWS, Render, or Heroku).

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
