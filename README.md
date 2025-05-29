# 🏡 Habinest – Personalized PG Discovery Platform

Habinest is a comprehensive full-stack web application designed to help students and professionals discover, filter, and manage Paying Guest (PG) accommodations. The platform offers a seamless experience for both users searching for PGs and admins managing listings, with features like smart search, interactive maps, user profiles, and a robust admin panel.

---

## ✨ Key Features (Detailed)
- **Personalized Search:** Filter PGs by location, price, sharing type, distance, rating, and more to find the perfect match for your needs.
- **Real-Time Suggestions:** Debounced search with instant suggestions as you type, making discovery fast and intuitive.
- **Interactive Maps:** View PG locations on an interactive map powered by OpenStreetMap and React-Leaflet, with geocoding and advanced queries.
- **User Authentication & Profiles:** Secure signup and login (email/password), multi-step onboarding, and profile management (edit name, email, location, password).
- **Bookmarks & Reviews:** Save favorite PGs for later, leave ratings and reviews, and view detailed PG information including image galleries and amenities.
- **Admin Panel:** Admins can add, edit, or remove PG listings, manage user inquiries, and oversee platform content.
- **Inquiry System:** Users can contact PG owners directly through the platform for bookings or questions.
- **Responsive Design:** Fully optimized for desktop devices and modern UI/UX.
- **Notifications & Confirmations:** Toast notifications for actions (success, error, info) and confirmation dialogs for sensitive operations.

---

## 🧱 Tech Stack (Expanded)
### Frontend
- **React.js:** Component-based UI development
- **Tailwind CSS:** Utility-first CSS framework for rapid styling
- **React Router:** Client-side routing
- **React-Leaflet & Leaflet.js:** Interactive maps and geolocation
- **OpenStreetMap, Nominatim API, Overpass API:** Map data and geocoding
- **TypeScript:** (Optional) Type safety and better developer experience

### Backend
- **Node.js & Express.js:** RESTful API server
- **MongoDB & Mongoose:** NoSQL database and object modeling
- **JWT Authentication:** Secure user sessions
- **Cloudinary:** Image upload and management
- **Bcrypt:** Password hashing
- **dotenv, cors:** Environment config and CORS handling

### Dev Tools
- **Git & GitHub:** Version control
- **Postman:** API testing
- **ESLint, Prettier:** Code quality and formatting
- **Docker:** (Optional) Containerization for deployment

---

## 🗂️ Project Structure

```
habinest-project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── app.js
│   ├── index.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── assets/
│   │   └── ...
│   ├── index.html
│   └── ...
└── README.md
```

---

## 🚀 Getting Started (Step-by-Step)

### 1. Clone the repository
```bash
git clone git@github.com:SaiBharadwaja570/habinest-project.git
cd habinest-project
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following:
```
PORT=3000
CORS_ORIGIN=*
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173` (default Vite port).

---

## 📝 Usage Examples
- **Browse Listings:** Use the search bar and filters to find PGs by location, price, sharing type, and more. Click on a listing to view details, images, reviews, and map location.
- **Register/Login:** Sign up with your email and password. Complete your profile to get personalized recommendations. Log in to access bookmarks and send inquiries.
- **Bookmark PGs:** Click the bookmark icon on any listing to save it for later.
- **Admin Panel:** If you are an admin, access the admin dashboard to add, edit, or remove PG listings and manage user inquiries.
- **Contact Owners:** Use the inquiry form on a PG's detail page to send questions or booking requests directly to the owner.

---

## 📦 Scripts & Commands
### Frontend
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run lint` – Lint code
- `npm run preview` – Preview production build

### Backend
- `npm run dev` – Start backend server in development mode

---

## 🤝 Contributing
We welcome contributions from the community! To contribute:
1. Fork the repository on GitHub
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to your fork: `git push origin feature/your-feature`
5. Open a pull request describing your changes

Please follow code style guidelines and write clear commit messages.

---

## 📬 Contact
For questions, suggestions, or feedback, please open an issue on GitHub or contact [Sai Bharadwaja](mailto:saibharadwaja1906@gmail.com).

