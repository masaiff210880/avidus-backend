# 🚀 Role-Based Task Management API (Node.js + MongoDB)

## 📌 Objective

Enhance the backend application by implementing Role-Based Access Control (Admin & User) and Activity Tracking System.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- REST APIs

---

## 👥 User Roles

### 🛡️ Admin
- View all users
- Delete users
- Update user status (Active / Inactive)
- View all tasks created by users
- Delete any task
- Manage users and tasks

### 👤 User
- Create own tasks
- View own tasks only
- Update own tasks
- Delete own tasks

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Protected routes using middleware
- Role-based access control (RBAC)

### Middleware:
- `protect` → verifies logged-in user
- `adminOnly` → allows only admin access

---

## 📊 Activity Tracking System

Tracks and stores user actions for auditing.

### Tracked Activities:
- Login activity
- Task creation
- Task update
- Task deletion

### Stored Data:
- userId
- action (LOGIN, TASK_CREATED, TASK_UPDATED, TASK_DELETED)
- description
- taskId (optional)
- timestamp

---

## 📁 Project Structure

src/
│
├── modules/
│   ├── user/
│   ├── task/
│   ├── activity/
│   └── auth/
│
├── controllers/
├── config/
├── routes/
├── utils/
├── middleware/
│
.env
.gitignore

---

## 📌 API Features

### Auth APIs
- Register user
- Login user

### User APIs (Admin only)
- View all users
- Delete user
- Update user status

### Task APIs
- Create task (User)
- View own tasks (User)
- View all tasks (Admin)
- Update task (Owner only)
- Delete task (Owner/Admin)

---

## 🔒 Security Features

- Password hashing using bcrypt
- JWT authentication
- Role-based authorization
- Protected routes
- Activity logging system

---

## ⚙️ Workflow

1. User registers or logs in
2. JWT token is generated
3. Token is sent in request headers
4. Middleware verifies token
5. Role-based access is checked
6. Actions are stored in activity log

---

## 📌 Summary

This project is a secure and scalable backend system with:

- Role-based access control
- Modular architecture
- Activity tracking system
- Clean separation of concerns
