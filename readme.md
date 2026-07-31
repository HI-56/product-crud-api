# Product Management System

A full-stack product management application built by transforming an existing HTML, CSS, and JavaScript project into a modern React application and adding a RESTful backend with Node.js, Express, and MongoDB.

## 📌 About the Project

This project started as a frontend-only product management application built with:

- HTML
- CSS
- JavaScript
- Local Storage

The original application was then migrated to **React** and redesigned using **Tailwind CSS**. After that, a backend was developed using **Node.js**, **Express**, and **MongoDB** to replace local data storage with a real database.

The project now follows a full-stack architecture where the React frontend communicates with the Express REST API to perform CRUD operations on products.

## ✨ Features

- Create products
- View all products
- View a single product
- Update products
- Delete products
- Search products
- Filter products by category
- Manage product stock
- Persistent data storage with MongoDB
- RESTful API

## 🛠️ Technologies

### Frontend

- React
- Tailwind CSS
- JavaScript
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools

- Git
- GitHub
- Postman
- VS Code

## 🏗️ Project Architecture

```text
Frontend (React + Tailwind)
          │
          │ HTTP Requests
          │ Axios
          ▼
Backend (Node.js + Express)
          │
          │ Mongoose
          ▼
Database (MongoDB)
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
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

### 4. Start the backend

```bash
cd backend
npm run dev
```

### 5. Start the frontend

```bash
cd frontend
npm run dev
```

## 🚀 Future Improvements

- User authentication and authorization
- Admin and user roles
- Product image uploads
- Pagination
- Advanced search and filtering
- Product categories
- Better form validation
- Automated testing
- Deployment

## 📄 License

This project is for educational and portfolio purposes.
