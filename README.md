# 🏡 Habinest – A Personalized PG Discovery Platform

Habinest is a full-stack web application built to help students and professionals discover paying guest (PG) accommodations tailored to their preferences. It offers a seamless experience for users to find, filter, and connect with PGs that suit their lifestyle and budget.

---

## ✨ Features

- 🔍 **Personalized PG Discovery** – Search PGs based on preferences like location, budget, gender, food options, etc.
- 🔐 **Authentication** – Secure user authentication.
- 📦 **Admin Panel** – Admins can manage PG listings using AdminBro.
- 💬 **Contact & Inquiry System** – Let users easily reach out for bookings or inquiries.

---

## 🧱 Tech Stack

### 🔹 Frontend
- React.js
- TailwindCSS / Material UI
- React Router

### 🔹 Backend
- Node.js
- Express.js

### 🔹 Database & Auth
- MongoDB
- Firebase Authentication

### 🔹 Admin Panel
- AdminBro

---

## 🗂️ Project Structure (Backend)

```
backend/
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
├── app.js
├── index.js
├── .env
├── .gitignore
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone git@github.com:SaiBharadwaja570/habinest-project.git
cd habinest
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file and add the following:

```env
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
CORS_ORIGIN=*
```

### 4. Start the backend

```bash
npm run dev
```

---

