const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const {readdirSync} = require("fs");
require("dotenv").config();



//app
const app = express();

//db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    
   
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(`DB CONNECTION ERROR: ${err}`));

// middlewares
  app.use(morgan("dev"));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


  
  app.use(cors());



  //routes middleware
      // to autoload routes
  readdirSync("./routes").map((r) =>
    app.use("/api", require("./routes/" + r))
  );

//port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));


