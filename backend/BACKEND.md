# 🛠️ Backend API 

This is a **Node.js + Express** backend application for handling user registration and authentication. It connects to a **MongoDB** database and follows a modular architecture using MVC principles.

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/        # Handles request logic
│   │   └── user.controller.js
│   ├── db/                 # Database connection
│   │   └── connect.js
│   ├── middlewares/        # Custom middlewares (future use)
│   ├── models/             # Mongoose schemas
│   │   └── user.models.js
│   ├── routes/             # Express routes
│   │   └── user.routes.js
│   └── utils/              # Utility helpers
│       ├── ApiError.js
│       └── asyncHandler.js
├── .gitignore
├── app.js                  # Sets up middleware & routes
├── index.js                # App entry point – connects DB & starts server
├── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone  git@github.com:SaiBharadwaja570/habinest-project.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=3000
CORS_ORIGIN=*
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
```

> ⚠️ Never commit this file to GitHub!

### 4. Run the server

```bash
npm run dev
# or
node index.js
```

---

## 📦 Models

### 🧑‍💼 User Model (`user.models.js`)

Defines the schema and logic for storing and validating user data using Mongoose.

#### Fields

| Field     | Type    | Required | Unique | Description              |
|-----------|---------|----------|--------|--------------------------|
| `name`    | String  | ✅        | ✅     | Username of the user     |
| `phone`   | Number  | ✅        | ✅      | Contact phone number     |
| `email`   | String  | ✅        | ✅     | Email address            |
| `password`| String  | ✅        | ✅     | Hashed user password     |

#### Methods

- **`isPasswordCorrect(password)`**
  - Compares the input password with the stored hash using `bcrypt.compare`.
  - Returns a boolean indicating if the password is correct.

#### Example Usage

```js
const isValid = await user.isPasswordCorrect("userInputPassword");


---

## 🧩 Features

- ✅ User Registration with hashed password using `bcrypt`
- ✅ MongoDB integration with Mongoose
- ✅ Custom API error handling
- ✅ Async error wrapper
- ✅ Organized codebase with separation of concerns

---

## 🛣️ API Endpoints

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| POST   | `/api/users/register` | Register a new user |

---

## 🔧 Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt
- dotenv

---

## 📌 TODO

- [ ] Add login functionality
- [ ] JWT authentication
- [ ] Input validation using Zod or Joi
- [ ] Add Swagger documentation

