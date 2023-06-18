const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
const db = require("./models");
const users = require("./controllers/user/controller.user");
// const orders = require("./controllers/orders");
// const { connectToDB } = require("./services/db");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.post("/users", users.create);
router.get("/users", users.findAll);
router.get("/users/:id", users.findOne);
router.put("/users/:id", users.update);
router.delete("/users/:id", users.delete);
router.put("/exchange", users.exchangePoints);

app.use("/api", router);

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("------Synced db.");
  })
  .catch((err) => {
    console.log("-----Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  console.log(`Home Route123`);
  res.send("Home Route123");
});
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
