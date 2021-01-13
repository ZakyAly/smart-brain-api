import express, { response } from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import handleSignin from "./controllers/signin.js";
import handleRegister from "./controllers/register.js";
import handleProfileGet from "./controllers/profile.js";
import handleImage from "./controllers/image.js";

const signin = { handleSignin };
const register = { handleRegister };
const profile = { handleProfileGet };
const image = { handleImage };

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "TheKey1",
    password: "",
    database: "smart-brain",
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("it is working");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
