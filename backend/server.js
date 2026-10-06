const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const portfolioRoutes = require('./routes/portfolioRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongodb connected successfully")
})
.catch((error)=>{
    console.log("Mongodb connection error:",error);
})

app.get('/',(req,res)=>{
    res.json({
        message: "Portfolio Maker Backend is running!"
      });
})

app.use("/api/portfolio", portfolioRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is runnning on port ${PORT}`)
});