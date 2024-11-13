const express = require("express")
const router = express.Router();
const {mainPage} = require("../controllers/mainController")


router
    .route('/')
    .get(mainPage)

module.exports = router;