if (process.env.NODE_ENV != 'production') require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const metaExtract = require("meta-extractor")
const cors = require('cors')
const router = require("./router.js")
const passport = require("passport")
const passportStrategy = require("./passport")

const app = express()

app.use(cors())

// use bodyparser middleware to receive form data
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)

app.use(passport.initialize())
passportStrategy(passport)

app.use("/", router)

// connects to mongoDB database
const dbURI = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@classius.zc7oh.mongodb.net/Classius?retryWrites=true&w=majority`
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
    .then((res) => {
        // only listen for requests once database data has loaded
        app.listen(process.env.PORT, () => console.log("Server is up on port " + process.env.PORT))
    })
    .catch(err => console.log(err))
