const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const sequelize = require("./config/db");

// Middleware
app.use(cors({ exposedHeaders: ["Content-Disposition"] }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  sequelize
    .sync()
    // .sync({ force: true })
    .then(() => {
      console.log("Database sync successfully");
    })
    .catch((err) => {
      console.error("Error syncing database: ", err);
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
