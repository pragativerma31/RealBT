# 🏦 RealBT – Real-time Loan Processing Platform

**RealBT** is a full-stack web platform built to simplify and streamline the **entire loan process** by connecting **brokers**, **loan providers**, and **customers** on a unified, role-based system. From browsing loan products to submitting applications, tracking approvals, and managing communications—REALBT centralizes it all.

Whether you're looking for a **home loan, personal loan, business funding, or vehicle finance**, RealBT empowers all stakeholders with transparency, speed, and smart workflows.

---
## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Contact](#-contact)

---

## ✨ Features

### 🎯 Core Functionalities
- 🔐 **Secure Authentication** using JWT & bcrypt
- 👥 **Role-Based Access Control (RBAC)** for:
  - Customers
  - Loan Providers
  - Brokers
- 📄 **Loan Application Submission & Tracking**
- 🧾 **Custom Loan Type Selection** (Home, Personal, etc.)
- 📥 **Document Upload System** 
- 📊 **Loan Status Timeline (Applied → In Process → Approved/Rejected)**
- 💬 **Real-Time Communication** *(future implementation with WebSocket)*
- 📌 **KYC Verification System** *(Admin interface – coming soon)*
- 📬 **Email Notifications** *(coming soon)*

### 🔍 UX & Interface Features
- Dashboard overview for each user role
- Filterable loan listing
- Broker search and client matching
- Loan history logs and progress tracking

---
## 🛠 Tech Stack

### Frontend – `client/`
- **React.js** – Fast and interactive UI components
- **React Router DOM** – Client-side navigation
- **Axios** – Promise-based HTTP client for API calls
- **Tailwind CSS** – Clean, utility-first styling
- **Form handling & validation** (built-in, can integrate Formik/Yup)

### Backend – `server/`
- **Node.js** – Backend runtime
- **Express.js** – Lightweight API framework
- **Mongoose** – MongoDB object modeling
- **bcryptjs** – Password hashing for authentication
- **jsonwebtoken (JWT)** – Secure session and route protection

### Database
- **MongoDB Atlas** – Cloud NoSQL DB for flexible document storage

### Dev Tools & Testing
- **Postman** – API testing and documentation
- **Nodemon** – Development server auto-restart
- **Git/GitHub** – Source control and collaboration

---
## ⚙️ Getting Started

### 📥 Clone the Repository

```bash
git clone https://github.com/yourusername/REALBT.git
cd REALBT
```

## 📦 Install Dependencies

### Backend

```bash
cd server
npm install
npm start
```
Backend runs on: http://localhost:4000

### Frontend

```bash
cd client
npm install
npm start
```
Frontend runs on: http://localhost:3000

---
## 📬 Contact

**Project Developers:**

- **Pragati Verma** – [LinkedIn](https://www.linkedin.com/in/pragati-verma-7a7754294/) | [GitHub](https://github.com/pragativerma31)
- **Kartik Bajpai** – [LinkedIn](https://www.linkedin.com/in/kartik-bajpai-278420312) | [GitHub](https://github.com/kbajpai06)
