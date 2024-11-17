const express = require("express")
const router = express.Router();
const {mainPage, detailPage} = require("../controllers/mainController")


router
    .route('/main')
    .get(mainPage)

router
    .route('/detail/:id')
    .get(detailPage)

module.exports = router;