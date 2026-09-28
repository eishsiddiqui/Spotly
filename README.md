# Spotly (YourPlaces)

Spotly is a full-stack MERN (MongoDB, Express, React, Node.js) web application where users can share and discover favorite places around the world. Users can create an account, upload photos, add places with addresses that are automatically converted to geographic coordinates, and view them on an interactive map.

---

## Features

- **User Accounts**: Sign up, log in, and persistent authentication with JWT.
- **Share Places**: Add favorite spots with an image, title, description, and street address.
- **Interactive Maps**: Automatically converts addresses into coordinates and displays locations on a map using OpenLayers.
- **Manage Content**: Edit or delete the places you have shared.
- **Explore Community Spots**: Browse users and see all the spots they have posted.

---

## Tech Stack

- **Frontend**: React, React Router, Vite, OpenLayers
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Auth & Security**: JSON Web Tokens (JWT), bcryptjs
- **Media Uploads**: Multer
- **Geocoding**: Geoapify API

---

## How to Run on Your Local Machine

### Prerequisites

Ensure you have the following installed/ready:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (either running locally or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- A free API key from [Geoapify](https://myprojects.geoapify.com/) (for converting addresses into map coordinates)

---

### 1. Clone the Repository

```bash
git clone https://github.com/eishsiddiqui/Spotly.git
cd Spotly
```

---

### 2. Backend Setup

1. Go to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder:

   ```bash
   cp .env.example .env
   ```

4. Open `.env` and fill in your values:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_KEY=your_secret_jwt_key
   GEOAPIFY_API_KEY=your_geoapify_api_key
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   The backend will be running at `http://localhost:5000`.

---

### 3. Frontend Setup

1. Open a new terminal tab and navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:5173
   ```

---
