require("dotenv").config();

const uri = process.env.DB_URL;

const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");

// CORS options.
const corsOptions = {
  origin: `http://localhost:8000`,
  methods: "GET,POST,PATCH,DELETE,OPTIONS",
  optionsSuccessStatus: 200,
  credentials: true,
};

// Routes.
const routes = require("./routes");

// MongoDB.
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(`${uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`Connected to MongoDB.`))
  .catch((err) => console.error(`Error:\n${err}.`));

app.use(cors(corsOptions));
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.json());

// Default response from '/'.
app.get("/", (req, res) => {
  res.send(`Express server at port ${PORT}.`);
});

// User services - route prefix: /api/user/
app.use("/user/login", routes.login);
app.use("/user/register", routes.register);
app.use("/user/logout", routes.logout);

// Blog services - route prefix: /api/blog/
app.use("/blog/content", routes.blog);
app.use("/blog/contact", routes.contact);
app.use("/blog/comment", routes.comment);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started.`);
});
