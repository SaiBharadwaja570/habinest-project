# 🏡 Habinest – Personalized PG Discovery Platform

Habinest is a full-stack web application designed to help students and professionals discover paying guest (PG) accommodations tailored to their needs. Users can easily search, filter, and connect with PGs that match their preferences and budget.

---

## ✨ Features

- 🔍 **Personalized Search:** Find PGs by location, budget, gender, food options, and more.
- 🔐 **Secure Authentication:** User login and registration.
- 🛠️ **Admin Panel:** Manage PG listings with AdminBro.
- 💬 **Inquiry System:** Users can contact PG owners for bookings or questions.

---

## 🧱 Tech Stack

### Frontend
- React.js
- TailwindCSS / Material UI
- React Router

### Backend
- Node.js
- Express.js

### Database & Authentication
- MongoDB
- Firebase Authentication

### Admin Panel
- AdminBro

---

## 🗂️ Backend Project Structure

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

### 1. Clone the repository

```bash
git clone git@github.com:SaiBharadwaja570/habinest-project.git
cd habinest
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file with:

```env
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
CORS_ORIGIN=*
```

### 4. Start the backend server

```bash
npm run dev
```

---

## 📁 Frontend Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── App.js
│   ├── index.js
│   └── styles/
├── .env
├── .gitignore
└── package.json
```

---

## 📝 Usage

- **Browse Listings:** Search and filter PG accommodations based on your preferences.
- **Register/Login:** Create an account or log in to save favorites and send inquiries.
- **Admin Panel:** Admins can add, edit, or remove PG listings.
- **Contact Owners:** Use the inquiry system to connect with PG owners.

---

## 🛡️ Security

- Passwords are securely handled using Firebase Authentication.
- Sensitive data is managed via environment variables.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

For questions or feedback, open an issue or contact [Sai Bharadwaja](mailto:saibharadwaja570@gmail.com).

