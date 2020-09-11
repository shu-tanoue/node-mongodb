const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const shopRoute = require("./routes/shop.route");
const adminRoute = require("./routes/admin.route");
const mongoConnect = require("./util/database").mongoConnect;

//-------Middlewares

//setting up view engine (when we are not using REACT as our view)
app.set("view engine", "ejs");
//specify views folders name
app.set("views", "views");

//parse the request body into readable data
app.use(bodyParser.urlencoded({ extended: false }));
//specify the public folder to be of static access
// app.use(express.static(path.join(__dirname,'public')));
app.use("/public", express.static("public"));

//set the routes for admin
app.use("/admin", adminRoute);
//set the routes for shop
app.use(shopRoute);

//-------end of Middlewares

//set up the port
const PORT = process.env.PORT || 8000;
mongoConnect(() => {
  app.listen(PORT, () => console.log(`Server started at port ${PORT}.`));
});
