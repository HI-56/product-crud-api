# Product Management System

A full-stack product management application built with React, Node.js, Express.js, and MongoDB.

The application provides a RESTful API for managing products and users, with JWT-based authentication, protected routes, product search, filtering, pagination, password recovery, profile management, and an admin-only user management section.

## 📌 About the Project

This project started as a product management application and evolved into a full-stack web application.

The frontend is built with React and Tailwind CSS, while the backend is developed using Node.js, Express.js, and MongoDB with Mongoose. The React frontend communicates with the Express REST API using Axios.

The current version focuses mainly on product management, authentication, and user management, while additional dashboard features such as orders, customers, and analytics are planned for future development.

## ✨ Features

### 📦 Product Management

- Create products
- View all products
- View a single product
- Update products
- Delete products
- Search products
- Filter products by category
- Filter products by stock/status
- Manage product stock
- Pagination
- Persistent data storage with MongoDB
- RESTful API

### 🔎 Search, Filtering & Pagination

Products can be searched, filtered, and paginated using URL query parameters.

Examples:

```
/products?page=1&limit=7
/products?search=phone
/products?category=Electronics
/products?status=low-stock
```

Multiple parameters can also be combined:

```
/products?page=1&limit=7&search=phone&category=Electronics
```

Search is implemented with case-insensitive matching, while filtering and pagination are handled by the backend. The frontend keeps the search, filtering, and pagination state synchronized with the URL.

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Bearer token authentication
- Get current authenticated user
- Logout functionality
- Password hashing with bcrypt
- Forgot password functionality
- Password reset code verification
- Password reset

### 👤 User Management

Authenticated users can:

- View their profile
- Update their information
- Upload/update their avatar
- Access protected application pages

Clicking on the authenticated user's name opens their user information/profile. The logout action allows the user to securely leave the authenticated session.

### 👑 Admin User Management

The application includes an Admin Roles section specifically for administrator accounts.

Admin users can:

- Access the Admin Roles page
- Manage users
- Select a user to view their information

The Admin Roles section is not displayed to regular users. This provides the foundation for role-based access control (RBAC).

### 📊 Product Statistics

The backend also provides product-related statistics, including:

- Total products
- Low-stock products
- Out-of-stock products

These statistics can be used by the dashboard for displaying product information.

## 🛠️ Technologies

### Frontend

- React
- JavaScript
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Multer
- Nodemailer
- express-validator

### Tools

- Git
- GitHub
- Postman
- VS Code
- MongoDB Atlas

## 🏗️ Project Architecture

```
                    React Frontend
                 React + Tailwind CSS
                          │
                          │
                    Axios / HTTP
                          │
                          ▼
                  Express REST API
                          │
              ┌───────────┼───────────┐
              │           │           │
            Routes    Middleware   Controllers
                          │           │
                          │           ▼
                          │        Services
                          │           │
                          └───────────┤
                                      │
                                  Mongoose
                                      │
                                      ▼
                                MongoDB Atlas
```

## 🔐 Authentication Flow

```
                    User
                      │
              ┌───────┴───────┐
              │               │
           Register          Login
              │               │
              └───────┬───────┘
                      │
                      ▼
                  JWT Token
                      │
                      ▼
                 React Frontend
                      │
                      │ Authorization:
                      │ Bearer <token>
                      ▼
              Authentication
                 Middleware
                      │
                      ▼
              Protected Routes
                      │
                      ▼
                  Controllers
                      │
                      ▼
                   Database
```

## 👑 Admin Access

Admin-specific features are displayed according to the authenticated user's role.

```
                 Authenticated User
                         │
                         ▼
                    Check Role
                    /        \
                   /          \
                Admin         User
                  │             │
                  ▼             ▼
            Admin Roles      No Admin
              Visible          Roles
                  │
                  ▼
            User Management
```

Regular users do not see the Admin Roles section.

## 📡 REST API

The backend provides RESTful endpoints for product and user management.

### Product API

```
POST    /products
GET     /products
GET     /products/:id
PATCH   /products/:id
DELETE  /products/:id
```

The product listing endpoint supports:

- Search
- Category filtering
- Stock/status filtering
- Pagination

Example:

```
GET /products?page=1&limit=7&search=phone&category=Electronics
```

### User API

The API provides functionality for:

- User registration
- User login
- Current authenticated user
- Updating user information
- Password recovery
- Password reset
- Avatar upload
- User management

## 📁 Project Structure

```
project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── context/
│   │   └── ...
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   └── ...
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` directory.

Example:

```
PORT=3000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET_KEY=<your-secret-key>
```

Additional environment variables may be required for the email/password-reset functionality.

### 5. Start the backend

```bash
cd backend
npm run dev
```

### 6. Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

## 🚧 Current Development Status

The project is currently under active development.

### ✅ Completed

- React frontend
- Tailwind CSS interface
- Product CRUD
- Product search
- Product filtering
- Product pagination
- Product stock management
- Product statistics
- MongoDB integration
- RESTful API
- User registration
- User login
- JWT authentication
- Protected routes
- Password recovery
- Password reset
- User profile management
- Avatar upload
- Logout functionality
- Admin-only user management
- Role-based visibility for Admin Roles

### 🚧 Planned

The dashboard currently contains several sections that are planned but not yet implemented:

- Dashboard
- Orders
- Customers
- Analytics
- Settings

## 🚀 Future Improvements

Possible future improvements include:

- Complete dashboard
- Orders management
- Customer management
- Analytics and reporting
- Settings management
- More granular admin permissions
- Automated testing
- API documentation with Swagger/OpenAPI
- Improved security and rate limiting
- Production deployment
- CI/CD pipeline

## 📄 License

This project is for educational and portfolio purposes.
