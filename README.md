# Restaurant Admin Dashboard

A full-stack Restaurant Admin Dashboard that allows restaurant owners to manage menu items, track orders, and monitor inventory efficiently.

This project was built as part of the **Eatoes Intern Technical Assessment** and demonstrates real-world backend and frontend development practices.

---

## 🚀 Features

### Menu Management
- View all menu items
- Search menu items (debounced search)
- Filter by category and availability
- Add, edit, and delete menu items
- Toggle availability with optimistic UI updates

### Orders Dashboard
- View all orders with pagination
- Filter orders by status
- Update order status
- Expand orders to view item details

### Analytics
- Top 5 selling menu items using MongoDB aggregation

---

## 🧱 Tech Stack

### Frontend
- React 18
- Functional components & hooks
- Custom hooks (`useDebounce`, `useFetch`)
- Fetch API

### Backend
- Node.js (v18)
- Express.js
- MongoDB + Mongoose
- RESTful APIs
- express-validator

### Database
- MongoDB (Local / Atlas)

---

## 📁 Project Structure

```
restaurant-admin-dashboard/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── seed/
│ │ ├── validators/
│ │ └── app.js
│ ├── server.js
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── services/
│ │ ├── utils/
│ │ └── App.jsx
│ ├── .env
│ └── package.json
│
└── README.md
```


---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant_dashboard
NODE_ENV=development

REACT_APP_API_URL=http://localhost:5000/api

Running the Project Locally
1️. Backend Setup
    cd backend
    npm install
    npm run dev
2. Frontend Setup
    cd frontend
    npm install
    npm start

Frontend runs on:
http://localhost:3000

Backend runs on:
http://localhost:5000

API Endpoints

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| GET    | `/api/menu`                  | Get all menu items  |
| GET    | `/api/menu/search?q=`        | Search menu items   |
| GET    | `/api/menu/:id`              | Get menu item by ID |
| POST   | `/api/menu`                  | Create menu item    |
| PUT    | `/api/menu/:id`              | Update menu item    |
| DELETE | `/api/menu/:id`              | Delete menu item    |
| PATCH  | `/api/menu/:id/availability` | Toggle availability |


Key Concepts Demonstrated

RESTful API design

MongoDB indexing & aggregation

Debounced search for performance

Optimistic UI updates

Clean component architecture

Separation of concerns

Production-ready structure

🛠️ Challenges Faced & Solutions

Search performance → Solved using debounced input and MongoDB text indexes

UI responsiveness → Implemented optimistic updates with rollback

Scalable data handling → Pagination and filtering on backend

🚀 Deployment (Recommended)

Frontend: Netlify

Backend: Render

Database: MongoDB Atlas

(Deployment steps can be followed as per Render & Netlify documentation.)

📸 Screenshots

Add screenshots or GIFs here if required.

👨 Author

Built with care and attention to detail as part of a technical assessment.


---

## ✅ STEP 12 COMPLETE

You now have:
- A **professional README**
- Clear documentation
- Interview-ready submission quality
- Zero missing requirements

---