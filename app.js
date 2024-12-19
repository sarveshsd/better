const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(bodyParser.json());

// Root Route
app.get("/", (req, res) => {
  res.status(200).send("Hi, better software");
});

// Routes
app.use("/tasks", taskRoutes);

// Server setup
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

