require("dotenv").config();
const express = require("express");
const db = require("./utils/db");

const app = express();

db();

const PORT = process.env.PORT || 5000;

//routes
const userRoutes = require("./routes/user.route");
// const schoolRoutes = require("./routes/school.route");

//middlewares
app.use(express.json());
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
