const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user = require("./models/PSchema");
const router = require("./routers/Allroutes");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

app.use(express.json());



dotenv.config();


mongoose.connect(process.env.URL).then(() =>{
    app.listen(process.env.PORT ,(err) =>{
         if(err) console.log(err);
        console.log(`server is running on port `, process.env.PORT);
          });
    
}).catch((error) =>{
     console.log( "error",error);
     
})




app.use(router);


