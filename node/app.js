const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const {dbConnect} = require("./models/index");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const mainroute = require("./routes/mainRoute")
const port = 3002;

app.use(express.static(path.join(__dirname, "/my-app/build")));

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(methodOverride('_method'));

dbConnect()

app.use('/get',mainroute)

app.listen(port, ()=>{
    console.log(port+"번 포트에서 실행ㅈㅇ")
})