# 🛠️ Backend API 

This is a **Node.js + Express** backend application for handling user registration and authentication. It connects to a **MongoDB** database and follows a modular architecture using MVC principles.

---

## 📁 Project Structure

```
backend/
├── public/                          # Static assets (e.g., images)
├── src/
│   ├── controllers/                 # Handles request logic
│   │   ├── user.controller.js
│   │   └── listings.controller.js
│
│   ├── db/                          # Database connection
│   │   ├── connect.js
│   │   ├── userDB.js
│   │   └── listingsDB.js
│
│   ├── middlewares/                # Custom middlewares
│   │   ├── auth.middleware.js      # JWT auth middleware
│   │   └── multer.middleware.js    # Image/file handling
│
│   ├── models/                     # Mongoose schemas
│   │   ├── user.models.js
│   │   └── listings.models.js
│
│   ├── routes/                     # Express routes
│   │   ├── user.routes.js
│   │   └── listings.routes.js
│
│   └── utils/                      # Utility helpers
│       ├── ApiError.js
│       ├── ApiResponse.js
│       ├── asyncHandler.js
│       └── cloudinary.js          # Cloudinary config for image uploads
│
├── .gitignore
├── .prettierrc
├── .prettierignore
├── app.js                          # Sets up middlewares & routes
├── index.js                        # App entry point – connects DB & starts server
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
| `type`| String  | ✅        | ❌    | Type of the user     |
| `preferences`| Object  |  ❌     | ❌    | Type of the user     |
| `bookmarks`| Object  |  ❌     | ❌    | Type of the user     |


#### Methods

- **`isPasswordCorrect(password)`**
  - Compares the input password with the stored hash using `bcrypt.compare`.
  - Returns a boolean indicating if the password is correct.

- **`generateAccessToken()`**
  - Used to generate access token for the user using `jwt.sign`.
  - Returns a access token.

- **`generateRefreshToken()`**
  - Used to generate refresh token for the user using `jwt.sign`.
  - Returns refresh token.


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
| POST   | `/api/users/login` | Login a  user |
| POST   | `/api/users/logout` | Logout a  user |
| PATCH   | `/api/users/updateInfo` | Update a  user information |
| PATCH   | `/api/users/updatePassword` | Update a user password |

---

### 🏠 Listing Model (`listings.models.js`)

| Field     | Type    | Required | Unique | Description              |
|-----------|---------|----------|--------|--------------------------|
| `name`    | String  | ✅        | ✅     | Name of the PG     |
| `address`   | String  | ✅        | ✅      | Address of the PG      |
| `priceRange`   | Number  | ✅        | ✅     | Starting price of the PG           |
| `sharingType`| String  | ✅        | ✅     | Sharing types present in PG   |
| `photo`| String  | ✅        | ✅      | URL of the PG pic     |
| `location`|   |  ✅       | ✅      | Type of the user     |

## 🧩 Features

- ✅ Admin can Register new PGs
- ✅ MongoDB integration with Mongoose
- ✅ Custom API error handling
- ✅ Async error wrapper
- ✅ Organized codebase with separation of concerns

---

## 🛣️ API Endpoints

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| POST   | `/api/pg/register` | Register a new PG |
| POST   | `/api/pg/get` | Get all the PGs |
| POST   | `/api/pg/updateInfo` | Update a PG information|


---

## 🔧 Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt
- dotenv
- jsonwebtoken
- nodemon

---

## 📌 TODO

- [ ] Add update functionalities in PGs and Users
- [ ] Update location section of Listings
- [ ] Input validation using Zod or Joi
- [ ] Add Swagger documentation

