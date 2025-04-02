# Grubbin - The Ultimate Restaurant Experience

[Live Demo](https://grubbin-production.up.railway.app)
[![Live Demo](https://grubbin-production.up.railway.app)


Welcome to **Grubbin**, the groundbreaking full-stack restaurant app that’s revolutionizing the way you dine! Built on the robust PERN stack (PostgreSQL, Express, React, Node.js), Grubbin offers a seamless ordering experience, from exploring a gourmet menu to placing orders with lightning-fast speed. Our app is designed to dazzle both foodies and restaurateurs alike, making every meal an unforgettable event.

##  Features

- **Cutting-Edge User Authentication:** Secure sign-up, login, and profile management powered by JWT .
- **Mouthwatering Menu:** Discover an extensive, visually appealing menu that highlights each delectable dish.
- **Real-Time Ordering:** Experience real-time order tracking, ensuring your cravings are satisfied without delay.
- **Interactive Reviews:** Share and read reviews that add a personal touch to every dining experience.
- **Secure Payments:** Fast and secure transactions powered by Paystack.

##  Tech Stack

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)  
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)  
[![Prisma](https://img.shields.io/badge/Prisma-6.5.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)  
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)  
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)  
[![Railway](https://img.shields.io/badge/Deployed_on-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)


### **Backend**
- **Node.js & Express:** 
- **PostgreSQL & Prisma ORM:** 
- **JWT & Cookie Authentication:** 

### **Frontend**
- **React:** 
- **React Router:**
- **CSS Modules:**


### Dependencies 

- @prisma/client: Prisma for database access and manipulation.
- bcryptjs: Provides password hashing and encryption functionality.
- cloudinary: A library for managing image and media uploads using Cloudinary's powerful API.
- cookie-parser: Middleware for parsing cookies from incoming HTTP requests.
- cors: Enables Cross-Origin Resource Sharing (CORS) to allow your backend to interact with different origins.
- dotenv: Loads environment variables from a .env file into process.env for easy configuration.
- express: A minimalist web framework for Node.js, used to build robust APIs.
- express-validator: Offers a suite of validation and sanitization utilities for Express routes.
- jsonwebtoken: For generating and verifying JSON Web Tokens (JWTs) used in authentication.
- axios: A promise-based HTTP client for making API requests from both the browser and Node.js.
- react-icons: A collection of customizable icons for React applications.
- react-paystack: A React integration that simplifies working with the Paystack payment gateway.
- react-router-dom: A routing library for React that enables navigation among views of various components.
- react-toastify: Displays beautiful and customizable toast notifications in React applications


## 📸 Screenshots

Here are a few highlights from the app (replace these sample image links with your own):

### **Home Page**
![Home Page Screenshot](https://via.placeholder.com/800x400?text=Home+Page+Screenshot)

### **Menu Page**
![Menu Page Screenshot](https://via.placeholder.com/800x400?text=Menu+Page+Screenshot)

### **Checkout Page**
![Checkout Page Screenshot](https://via.placeholder.com/800x400?text=Checkout+Page+Screenshot)

> **Tip:** Store your screenshots in a folder (e.g., `screenshots`) and reference them locally:  
> `![Alt Text](./screenshots/homepage.png)`

---


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























### **Contributing**

If you would like to contribute to this project:

Fork the repository.
Create a new branch for your feature/bugfix.
Commit your changes and open a pull request.
