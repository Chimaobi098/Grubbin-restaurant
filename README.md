Grubbin - Restaurant App

Grubbin is a full-stack restaurant app built with the PERN stack (PostgreSQL, Express, React, Node.js). Users can browse the menu, place orders, leave reviews, and manage their accounts.

Features

User authentication (Sign up, Login, Logout)

Browse restaurant menu

Place orders with real-time status updates and robust order history

Leave reviews for products

Admin panel for managing orders and menu items

Secure payments with Paystack

Tech Stack

Backend

Node.js with Express

PostgreSQL with Prisma ORM

Authentication with JWT & Cookies

Hosted on Railway

Frontend

React (Vite)

React Router for navigation

CSS Modules for styling

Hosted on Vercel

Installation & Setup

Backend Setup

Clone the repository:

git clone https://github.com/your-username/grubbin.git
cd grubbin/backend

Install dependencies:

npm install

Create a .env file and add the following:

DATABASE_URL=your_postgresql_database_url
FRONTEND_PROD_URL=your_frontend_url
JWT_SECRET=your_secret_key
NODE_ENV=development

Run database migrations:

npx prisma migrate dev --name init

Start the server:

npm start

Frontend Setup

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the React app:

npm start

Deployment

Backend (Railway)

Push your changes to GitHub:

git push origin main

Connect your repository to Railway and set environment variables.

Update your package.json start script:

"start": "npx prisma migrate deploy && node server.js"

Deploy!

Frontend (Vercel)

Push your frontend code to GitHub.

Connect the repository to Vercel.

Set environment variables in Vercel.

Deploy!

API Routes

Authentication

POST /auth/register - Register a new user

POST /auth/login - Login and receive a token

GET /auth/me - Get current user details

Menu

GET /api/menu - Get all menu items

POST /api/menu - Add a new item (Admin only)

Orders

POST /api/orders - Place a new order

GET /api/orders/:id - Get order details

Contributing

Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add feature')

Push to the branch (git push origin feature-name)

Open a pull request

License

This project is licensed under the MIT License.

