const express = require("express");
const app = express();
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db/dbConnect");

dotenv.config();

// connect DB
connectDB();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/blog", require("./routes/blogRoutes"));
app.use("/api/v1/home", require("./routes/homeRoutes"));
app.use("/api/v1/comments", require("./routes/commentRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`.bgMagenta);
});
