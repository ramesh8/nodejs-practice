const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/test";
mongoose.connect(url);
const db = mongoose.connection;

db.on("open", () => console.log("Database Connected"));
db.on("error", () => console.log("DB connection failed"));

const app = express();

// import { nanoid } from 'nanoid';

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "dfjsldkfjlsaiewrqwjeoidsfasf",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// let users = [
// {
//   id: nanoid(),
//   name: "guest",
//   password: bcrypt.hashSync("123123", 10),
//   email: "guest@demo.com",
//   loginOn: null,
//   createdOn: null,
// },
// ];

let users = [];

app.get("/", (req, res) => {
  let user = req.session.user;
  if (!user) {
    res.redirect("/login");
    return;
  }
  app.locals = req.session;
  res.render("index");
});

app.get("/about", (req, res) => {
  console.log(req.session);
  res.render("about");
});

app.get("/contact", (req, res) => {
  let user = req.session.user;
  if (!user) {
    req.session.message = "User Login Required to see contact page...";
    res.redirect("/login");
    return;
  }
  console.log(req.session);
  res.render("contact");
});

app.get("/register", (req, res) => {
  // console.log(req.session);
  let message = req.session.message;
  app.locals.message = message;
  res.render("register");
});

app.post("/register", (req, res) => {
  const { uname, email, passwd } = req.body;

  let foundUser = users.find((u) => u.email == email);

  if (foundUser) {
    req.session.message = "User already Exists";
    res.redirect("/register");
    // res.send("<h1>User already Exists</h1>");
    return;
  }

  let passwordHash = bcrypt.hashSync(passwd, 10);

  let user = {
    name: uname,
    password: passwordHash,
    email: email,
  };

  users.push(user);
  db.collection("users").insertOne(user);

  // res.send("<h1>User Created Successfully</h1>");
  req.session.message = "User Created Successfully";
  res.redirect("/login");
  console.log(users);
});

app.get("/login", (req, res) => {
  app.locals = req.session;
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, passwd } = req.body;
  // console.log(email, passwd);
  let users = await db.collection("users").find();
  users = await users.toArray();
  console.log(users);
  let foundUser = users.find((u) => u.email == email);
  if (!foundUser) {
    // res.send("<h1>Invalid User Credentials</h1>");
    req.session.message = "Invalid User Credentials";
    req.session.user = foundUser;
    res.redirect("/login");
    return;
  }

  let passwordMatch = bcrypt.compareSync(passwd, foundUser.password);
  if (!passwordMatch) {
    // res.send("<h1>Invalid User Credentials</h1>");
    req.session.message = "Invalid User Credentials";
    res.redirect("/login");
    return;
  }

  req.session.user = foundUser;
  console.log(req.session);
  // res.send("<h1>Welcome to our web site</h1>");
  req.session.message = "Welcome to my web site";
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.redirect("/");
  }
});

let products = [
  {
    id: 1,
    name: "IPhone",
    price: 35000,
    description: "This is about iphone,......",
    image: "iphone.jpg",
  },
  {
    id: 2,
    name: "Lenovo Laptop",
    price: 35000,
    description: "This is about Lenovo,......",
    image: "lenovo.jpg",
  },
  {
    id: 3,
    name: "Dell Laptop",
    price: 40000,
    description: "This is about Dell,......",
    image: "dell.jpg",
  },
  {
    id: 4,
    name: "Redmi Mobile",
    price: 20000,
    description: "This is about Redmi,......",
    image: "redmi.jpg",
  },
];

app.get("/products", (req, res) => {
  let user = req.session.user;
  console.log(req.session);
  if (user) res.render("products", { products: products, user: user });
  else {
    req.session.message = "User Not Logged In";
    res.redirect("/login");
  }
  // else res.send("<h1>User Not Logged In</h1>");
});

app.listen(5000, () =>
  console.log("listening on port 5000\nvisit localhost:5000 on your browser...")
);
