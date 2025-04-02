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
   
2. Install Dependencies:
npm install
Configure Environment Variables: Create a .env file in the backend directory and add:
DATABASE_URL=your_postgresql_database_url
FRONTEND_PROD_URL=your_frontend_url
JWT_SECRET=your_secret_key
NODE_ENV=development
Run Database Migrations:
npx prisma migrate dev --name init
Start the Server:
npm start
Frontend Setup (Vite)
Navigate to the Frontend Directory:
cd ../frontend
Install Dependencies:
npm install
Start the Vite App:
npm run dev
🌍 Deployment

Backend (Railway)
Push Your Changes:
git push origin main
Connect Your Repository to Railway:
Set your environment variables (like DATABASE_URL and FRONTEND_PROD_URL) in Railway.
Update Start Script:
Ensure your package.json has the following start script:
"start": "npx prisma migrate deploy && node server.js"
Deploy and Rule the World!
Frontend (Railway)
Push Your Frontend Code:
Connect your repository to Railway.
Set Environment Variables in Railway (if needed).
Deploy and Enjoy Blazing-Fast Performance!
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
🤝 Contributing

Fork the Repository.
Create a Feature Branch:
git checkout -b feature-amazing-new-feature
Commit Your Changes:
git commit -m 'Add amazing new feature'
Push to Your Branch:
git push origin feature-amazing-new-feature
Open a Pull Request and Share Your Brilliance!
