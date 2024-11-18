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


//dbConnect() db 연동할 때 필요


app.use('/',mainroute)
app.use('/images', express.static(path.join(__dirname, '../dataAnalysis/drive/images')));

app.listen(port, ()=>{
    console.log(port+"번 포트에서 실행중")
})