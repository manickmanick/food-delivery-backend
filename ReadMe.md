# 🍔 Food Delivery Backend API

A production-style Food Delivery Backend built with **Node.js**, **TypeScript**, **Express**, **Prisma**, **mySQL**, **JWT Authentication**, **Role-Based Authorization**, and **Socket.IO** for real-time order tracking.

---

# 🚀 Features

## Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Access Control (RBAC)

### Supported Roles

- CUSTOMER
- RESTAURANT_OWNER
- ADMIN

---

## Restaurant Management

Restaurant Owners can:

- Create Restaurants
- View Restaurants
- Manage Restaurant Information

Admins can:

- Manage all restaurants

Customers can:

- Browse restaurants

---

## Category Management

- Create Categories
- View Categories
- Assign Categories to Menu Items

Examples:

- 🍕 Pizza
- 🍔 Burger
- 🍗 Biryani
- 🍜 Chinese
- 🍰 Desserts

---

## Menu Management

Restaurant Owners can:

- Create Menu Items
- Update Menu Items
- Delete Menu Items
- View Menu Items

Menu Item Information:

- Name
- Description
- Price
- Image URL
- Category
- Restaurant

---

## Shopping Cart

Customers can:

- Add Items to Cart
- Update Quantity
- Remove Items
- Clear Cart

Business Rules:

- Cart can contain items from only one restaurant
- Prevents mixing menu items from multiple restaurants

---

## Address Management

Customers can:

- Add Multiple Addresses
- Update Addresses
- Delete Addresses
- Set Default Address

Address Information:

- Label
- Address Line 1
- Address Line 2
- City
- State
- Pincode
- Landmark

---

## Order Management

Customers can:

- Place Orders
- View Order History
- View Order Details

Restaurant Owners can:

- View Restaurant Orders
- Accept Orders
- Update Order Status

---

## Order Status Workflow

PLACED

↓

ACCEPTED

↓

PREPARING

↓

OUT_FOR_DELIVERY

↓

DELIVERED

Or

↓

CANCELLED

---

## Real-Time Order Updates

Implemented using Socket.IO.

Customers receive instant order status updates without refreshing the page.

Examples:

- Order Accepted
- Preparing Food
- Out For Delivery
- Delivered

---

# 🛠 Tech Stack

## Backend

- Node.js
- TypeScript
- Express.js

## Database

- mySQL
- Prisma ORM

## Authentication

- JWT
- bcrypt

## Validation

- Zod

## Realtime Communication

- Socket.IO

## Security

- Helmet
- CORS

---

# 📂 Project Structure

```text
src
│
├── config
│   └── prisma.ts
│
├── constants
│
├── middlewares
│
├── modules
│   ├── auth
│   ├── restaurant
│   ├── category
│   ├── menu
│   ├── cart
│   ├── address
│   └── order
│
├── repositories
│
├── socket.ts
│
├── app.ts
│
└── server.ts
```

# 🗄 Database Schema

Main Entities:

- User
- Restaurant
- Category
- MenuItem
- Cart
- CartItem
- Address
- Order
- OrderItem

Relationships:

```text
User
 ├── Restaurants
 ├── Addresses
 ├── Orders
 └── Cart

Restaurant
 ├── MenuItems
 └── Orders

Order
 ├── OrderItems
 └── Address
```

# ⚙️ Environment Variables

Create a `.env` file:

```env
DATABASE_URL=mysql://username:password@localhost:5432/food_delivery

JWT_SECRET=your_secret_key

PORT=5000
```

# 📦 Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Install Dependencies

```bash
npm install
```

## Run Prisma Migration

```bash
npx prisma migrate dev
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Start Development Server

```bash
npm run dev
```

Server:

```text
http://localhost:5000
```

# 📡 API Modules

## Auth APIs

```text
POST   /api/auth/register
POST   /api/auth/login
```

## Restaurant APIs

```text
GET    /api/restaurants
GET    /api/restaurants/:id
POST   /api/restaurants
PUT    /api/restaurants/:id
DELETE /api/restaurants/:id
```

## Category APIs

```text
GET    /api/categories
GET    /api/categories/:id
```

## Menu APIs

```text
GET    /api/menu-items
GET    /api/menu-items/:id
POST   /api/menu-items
PUT    /api/menu-items/:id
DELETE /api/menu-items/:id
```

## Cart APIs

```text
GET    /api/cart
POST   /api/cart/items
PATCH  /api/cart/items/:id
DELETE /api/cart/items/:id
DELETE /api/cart
```

## Address APIs

```text
GET    /api/addresses
POST   /api/addresses
PUT    /api/addresses/:id
DELETE /api/addresses/:id
PATCH  /api/addresses/:id/default
```

## Order APIs

```text
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id

PATCH  /api/orders/:id/accept
PATCH  /api/orders/:id/status

GET    /api/orders/restaurant
```

# 🔄 WebSocket Events

## Client → Server

```text
join-user
```

## Server → Client

```text
order-status-updated
```

Example:

```json
{
  "orderId": 12,
  "status": "OUT_FOR_DELIVERY"
}
```

# 🔮 Future Enhancements

- Razorpay Integration
- Delivery Partner Module
- Google Maps Tracking
- Push Notifications
- Admin Dashboard
- Docker Support
- Kubernetes Deployment
- CI/CD Pipeline

# 👨‍💻 Author

Built as a full-stack food delivery platform using modern web technologies and production-oriented architecture.
