# 📊 Finance Data Processing & Access Control API

A backend system built using Node.js, Express, and MongoDB that manages financial records with strict role-based access control (RBAC) and provides aggregated insights via dashboard APIs.

---

## 🧠 Overview

This project demonstrates backend engineering fundamentals including:

* Clean architecture (controllers, services, models)
* Role-Based Access Control (RBAC)
* RESTful API design
* MongoDB aggregation pipelines
* Secure authentication using JWT

The system allows different user roles to interact with financial data based on permissions.

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Security:** bcrypt (password hashing)
* **Environment Config:** dotenv

---

## 🏗️ Project Structure

```
src/
 ├── controllers/     # Handles request/response
 ├── services/        # Business logic
 ├── models/          # Mongoose schemas
 ├── routes/          # API routes
 ├── middleware/      # Auth & RBAC
 ├── config/          # DB connection
 ├── utils/           # Helper functions
 ├── app.js           # Express app setup
 └── server.js        # Server entry point
```

---

## 🔐 Roles & Permissions

| Role    | Permissions                        |
| ------- | ---------------------------------- |
| Admin   | Full access (CRUD users + records) |
| Analyst | Read + dashboard insights          |
| Viewer  | Read-only access                   |

RBAC is implemented using reusable middleware.

---

## 📦 Features

### 👤 User Management

* Create, update, delete users
* Role assignment (Admin, Analyst, Viewer)
* Secure password hashing

### 🔑 Authentication

* Login with JWT
* Protected routes
* Middleware-based access control

### 💰 Financial Records

* Create income/expense records
* Filter by type, category, date
* Update & delete records

### 📊 Dashboard APIs

* Total income
* Total expense
* Net balance
* Category-wise breakdown
* Monthly trends (if implemented)

Uses MongoDB aggregation pipeline (`$group`, `$sum`, `$match`).

---

## 📡 API Endpoints

### Auth

```
POST /auth/login
```

### Users

```
POST   /users
GET    /users
PATCH  /users/:id
DELETE /users/:id
```

### Financial Records

```
POST   /records
GET    /records?type=income&category=food
PATCH  /records/:id
DELETE /records/:id
```

### Dashboard

```
GET /dashboard/summary
GET /dashboard/trends
```

---

## 🧪 How to Run Locally

### 1. Clone the repo

```
git clone <your-repo-url>
cd finance-backend
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run the server

```
npm run dev
```

or

```
node src/server.js
```

---

## 🔍 Testing

Use tools like:

* Postman
* Thunder Client

Test:

* Authentication
* Role-based access restrictions
* Dashboard aggregation responses

---

## ⚠️ Design Decisions

* Separation of concerns using controllers & services
* Middleware-based RBAC for scalability
* MongoDB aggregation instead of in-memory calculations
* Modular folder structure for maintainability

---

## 🚀 Future Improvements

* Pagination & sorting
* Swagger API documentation
* Unit & integration testing
* Rate limiting & security enhancements
* Docker containerization

---

## 👨‍💻 Author

Darshan K S
Full Stack Developer (MERN + Web3)

---

## 📌 Note

This project focuses on backend system design and does not include a frontend interface.
