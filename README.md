# 🏦 RealBT – Real-time Loan Processing Platform

**RealBT** is a full-stack web platform built to simplify and streamline the **entire loan process** by connecting **brokers**, **loan providers**, and **customers** on a unified, role-based system. From browsing loan products to submitting applications, tracking approvals, and managing communications—REALBT centralizes it all.

Whether you're looking for a **home loan, personal loan, business funding, or vehicle finance**, RealBT empowers all stakeholders with transparency, speed, and smart workflows.

---
## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Process Flow](#-process-flow)
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
## 🏗 Project Architecture
```plaintext

REALBT/
│
├── client/               # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── assets/       # Images and static assets
│   │   ├── components/   # Reusable UI components
│   │   ├── data/         # Static/mock data files
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Route-based components (Home, Login, Dashboard, etc.)
│   │   ├── reducer/      # Redux logic or context reducers
│   │   ├── services/     # API services
│   │   ├── slices/       # Redux slices (if using Redux Toolkit)
│   │   ├── utilis/       # Utility/helper functions
│   │   ├── App.js        # Root component
│   │   ├── index.js      # App entry point
│   │   └── index.css     # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/               # Backend (Node.js + Express)
│   ├── config/           # Configuration files (DB, etc.)
│   ├── controllers/      # Route logic and handlers
│   ├── middlewares/      # Auth and role-based access
│   ├── models/           # Mongoose schema definitions
│   │   ├── User.js
│   │   ├── OTP.js
│   │   ├── Profile.js
│   │   ├── LoanApplication.js
│   │   ├── LoanTypes.js
│   │   ├── LoanOffers.js
│   │   ├── Property.js
│   │   ├── Category.js
│   │   └── UploadedDocs.js
│   ├── routes/           # API route definitions
│   ├── templates/        # Email templates (if used)
│   ├── utils/            # Utility functions (e.g., mail sender)
│   ├── .env              # Environment variables
│   └── index.js          # Entry point of backend app
│
├── .gitignore
├── README.md
└── .env.example          # Safe example of required .env keys

```

---
## 🔁 Process Flow


### 🏠 I. Property-Based Loan Flow (Broker-Oriented)

**Objective:** Help brokers sell properties and attract loan providers, simplifying customer loan acquisition.

1. **Broker Onboarding & Property Listing**
   - Brokers register/login.
   - Post detailed property listings (price, location, documents, photos).

2. **Loan Provider Bidding**
   - Loan providers browse listed properties.
   - Select properties they want to offer loans for.
   - Submit loan offers with interest rates, terms, and EMI options.

3. **Customer Browsing & Selection**
   - Customers browse property listings.
   - View associated loan offers per property.
   - Select a suitable property + loan combination.

4. **Loan Document Upload**
   - Customers upload required documents (income proof, ID, etc.).
   - Await approval from the selected loan provider.

5. **Loan Provider Review**
   - Providers scan documents.
   - Approve or reject based on eligibility.

6. **Finalization**
   - If approved: loan process begins, and property booking continues.
   - If rejected: customer can choose another loan offer/provider.



### 📄 II. Loan Application-Based Flow (Customer-Oriented)

**Objective:** Allow customers to request loans directly, independent of property listings.

1. **Customer Loan Application**
   - Customers fill out a structured loan application form.
   - Specify required amount, purpose (e.g., home, personal), and tenure.
   - Upload eligibility documents.

2. **Background Processing**
   - Applications are stored securely.
   - Customers cannot contact providers directly.

3. **Loan Provider Dashboard**
   - Providers view anonymous loan applications.
   - Filter based on eligibility (income, CIBIL score, etc.).

4. **Screening & Offer Submission**
   - Providers scan uploaded documents.
   - Select eligible applications.
   - Submit loan offers.

5. **Customer Offer Selection**
   - Customers receive loan offers from multiple providers.
   - Compare terms and choose the preferred one.

6. **Verification & Final Steps**
   - Final document verification (if required).
   - Loan is sanctioned and processed.



### ✅ III. Eligibility Verification Flow

**Goal:** Simplify filtering for providers and reduce unqualified leads.

1. **Mandatory Document Upload**
   - Customers must upload eligibility documents (PAN, Aadhaar, salary slips) before accessing offers.

2. **Provider Screening**
   - Providers preview documents on their dashboard.
   - Approve/reject based on their internal policies.

3. **Filtered Contact**
   - Only approved customers are contacted by providers.
   - Prevents spam and ensures a clean pipeline.



### 🎯 IV. Stakeholder Benefits

| Stakeholder       | Benefits                                                                 |
|-------------------|--------------------------------------------------------------------------|
| **Brokers**        | Boost property sales, attract buyers, and streamline loan discovery.     |
| **Loan Providers** | Get pre-filtered eligible leads, reduce noise, and improve conversions.  |
| **Customers**      | Explore properties with built-in loan offers or apply directly for loans. No need to search for banks manually. |

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
