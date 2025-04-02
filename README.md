# Grubbin - The Ultimate Restaurant Experience

Welcome to **Grubbin**, the groundbreaking full-stack restaurant app that’s revolutionizing the way you dine! Built on the robust PERN stack (PostgreSQL, Express, React, Node.js), Grubbin offers a seamless ordering experience, from exploring a gourmet menu to placing orders with lightning-fast speed. Our app is designed to dazzle both foodies and restaurateurs alike, making every meal an unforgettable event.

## ✨ Features

- **Cutting-Edge User Authentication:** Secure sign-up, login, and profile management powered by JWT .
- **Mouthwatering Menu:** Discover an extensive, visually appealing menu that highlights each delectable dish.
- **Real-Time Ordering:** Experience real-time order tracking, ensuring your cravings are satisfied without delay.
- **Interactive Reviews:** Share and read reviews that add a personal touch to every dining experience.
- **Secure Payments:** Fast and secure transactions powered by Paystack.

## 🚀 Tech Stack

### **Backend**
- **Node.js & Express:** 
- **PostgreSQL & Prisma ORM:** 
- **JWT & Cookie Authentication:** 

### **Frontend**
- **React:** 
- **React Router:**
- **CSS Modules:**


## 🔧 Installation & Setup

### **Backend Setup**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/grubbin.git
   cd grubbin/backend
   
2. **Install Dependencies:**
   ```bash
   npm install

3. **Configure Environment Variables:** Create a .env file in the backend directory and add:
   ```bash
   DATABASE_URL=your_postgresql_database_url
   FRONTEND_PROD_URL=your_frontend_url
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   CLOUDINARY_API_KEY = your_secret_key
   CLOUDINARY_API_SECRET = your_secret

4. Run Database Migrations:
   ```bash
   npx prisma migrate dev --name init

5. Start the Server:
   ```bash
   node server.js

### **Frontend Setup (Vite)**

1. **Navigate to the Frontend Directory:**
   ```bash
   cd ../frontend
   
2. **Install Dependencies:**
   ```bash
   npm install

3. **Start the Vite App::** 
   ```bash
   npm run dev






🛠️ API Endpoints

Authentication
POST /auth/register — Create a new user account.
POST /auth/login — Log in and receive a secure token.
GET /auth/me — Retrieve current user details.
Menu
GET /api/menu — Fetch all tantalizing menu items.
POST /api/menu — Add new menu items (for authorized users).
Orders
POST /api/orders — Place a new order effortlessly.
GET /api/orders/:id — Retrieve detailed order information.

### **Contributing**

If you would like to contribute to this project:

Fork the repository.
Create a new branch for your feature/bugfix.
Commit your changes and open a pull request.
