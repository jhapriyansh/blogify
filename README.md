# 📝 MERN Blog App

A full-stack blog application built using the **MERN stack (MongoDB, Express, React, Node.js)**. Users can create blog posts, comment on them, and view all comments associated with a post.

## 📌 Features

* 🧑‍💻 User Authentication 
* 📝 Create, Read, Update, Delete (CRUD) for blog posts
* 💬 Add and delete comments on posts
* ❤️ Like system for posts (with like count)
* 🧠 Comment user details are populated (name, email)
* 📆 Timestamps on posts and comments

## 🛠️ Technologies

* **Frontend:** React, Axios, TailwindCSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose ODM
* **Other:** dotenv, cors, nodemon, mongoose

## 📦 Installation

### Backend

```bash
cd blogify
npm install
# Create a `.env` file with MongoDB URI and other secrets
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file inside `server/`:

```
MONGO_URI=your_mongodb_connection_string
PORT=3001
JWT_SECRET=your_JWT_secret
```
