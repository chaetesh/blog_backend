const express = require("express");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/admin");
const postRoutes = require("./routes/posts");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/admin", adminRoutes);
app.use("/posts", postRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
