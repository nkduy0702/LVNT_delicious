const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const port = 1407;
const route = require("./Routes/MainRoutes");

// const session = require("express-session");
// const moment = require("moment-timezone"); // Import moment-timezone

// Import ngôn ngữ tiếng Việt
// require("moment/locale/vi");

// app.use(session({ secret: "14072002", resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

// kết nối Router

// const hbs = handlebars.create({
//   extname: ".hbs",
//   helpers: {
//     formatDate: (date) => {
//       return moment(date).fromNow();
//     },
//   },
// });

// Cấu hình Express để phục vụ các tệp tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);
app.use(cors());

//Routes init
route(app);

app.listen(port, () => console.log(`Running at http://192.168.27.1:${port}`));
