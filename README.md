# Dynamic Leaderboard Application

This project is a full-stack web application that creates a dynamic leaderboard. It allows users to claim points and see real-time updates to their rankings. The application is built using the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Live Demo
- **Frontend (Vercel):** (Insert your Vercel URL here)
- **Backend (Render):** (Insert your Render URL here)

## ✨ Features

- **User Management**: A default list of 10 users is created on first launch. New users can be added directly from the frontend UI.
- **Claim Points**: A user can be selected from a dropdown menu to claim random points (1-10).
- **Dynamic Ranking**: The leaderboard updates in real-time, displaying user rankings based on their total points in descending order.
- **Point History**: A detailed history of all point claims for each user is stored and can be viewed via a modal.
- **Responsive UI**: A clean, modern, and responsive user interface built with ReactJS and styled using Tailwind CSS.

## 🛠️ Technology Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development experience for React applications.
- **Axios**: A promise-based HTTP client for making API requests.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Headless UI**: A completely unstyled, fully accessible UI component library for React.

### Backend
- **Node.js**: A JavaScript runtime for building the server-side logic.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL document database used to store user data and point history.
- **Mongoose**: An object data modeling (ODM) library for MongoDB and Node.js.
- **CORS**: A Node.js middleware for enabling Cross-Origin Resource Sharing.

## ⚙️ Project Structure

The project follows a monorepo structure with two main directories:
- `/frontend`: Contains all the ReactJS code.
- `/backend`: Contains all the NodeJS server code.

### Backend Routes

- `GET /api/users`: Fetches all users and their current rankings.
- `POST /api/users`: Creates a new user.
- `POST /api/points/claim/:userId`: Awards random points to a specific user and updates their rank.
- `GET /api/points/history/:userId`: Fetches the point history for a specific user.

## 💻 Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- MongoDB (local or cloud-hosted instance, e.g., MongoDB Atlas)

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/prashantvashisth1/3w-assignment.git](https://github.com/prashantvashisth1/3w-assignment.git)
    cd 3w-assignment
    ```

2.  **Backend Setup:**
    - Navigate to the backend directory:
      ```bash
      cd backend
      ```
    - Create a `.env` file with your MongoDB connection string and a port:
      ```
      MONGODB_URI="your_mongodb_connection_string"
      PORT=5000
      ```
    - Install dependencies and start the server:
      ```bash
      npm install
      npm run dev
      ```
      The backend server will run at `http://localhost:5000`.

3.  **Frontend Setup:**
    - Navigate to the frontend directory:
      ```bash
      cd ../frontend
      ```
    - Create a `.env` file to connect to the backend:
      ```
      VITE_API_URL=http://localhost:5000/api
      ```
    - Install dependencies and start the client:
      ```bash
      npm install
      npm run dev
      ```
      The frontend application will open in your browser, usually at `http://localhost:5173`.

## 🚀 Deployment

This application is deployed using a split architecture, with the frontend on Vercel and the backend on Render.

1.  **Backend Deployment (Render):**
    - The backend is deployed as a Web Service on Render.
    - An environment variable `MONGODB_URI` is configured with the live MongoDB Atlas connection string.
    - CORS is configured to accept requests from the Vercel frontend URL.

2.  **Frontend Deployment (Vercel):**
    - The frontend is deployed as a static site on Vercel.
    - The `VITE_API_URL` environment variable is configured to point to the live Render backend URL (e.g., `https://your-backend-name.onrender.com/api`).
    - The project root directory is set to `frontend/`.

---
