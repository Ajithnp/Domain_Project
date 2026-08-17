# User Management System

A minimal Node.js, Express, and MongoDB web application for user and admin management.

## Features

- **User Operations**: Registration, authentication, and user panel.
- **Admin Management**: Dedicated admin routes and management tools.
- **Security & Sessions**: Session management with `express-session`, password hashing with `bcrypt`, and cache prevention via `nocache`.
- **View Rendering**: Server-side rendered pages using EJS templates.

## Tech Stack

- **Runtime & Framework**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Templating**: EJS
- **Dev Tools**: Nodemon


## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the application:**
   ```bash
   npm start
   ```

3. **Access the application:**
   - User routes: [http://localhost:3000/](http://localhost:3000/)
   - Admin routes: [http://localhost:3000/admin](http://localhost:3000/admin)
