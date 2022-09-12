require('dotenv').config();//loads dotenv file variables
const mongoose=require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, CONFIG);

mongoose.connection 
    .on('open', () => console.log('connected to Mongoose'))
    .on('close', () => console.log('disconnected from Mongoose'))
    .on('error', (error) => console.log(error));

module.exports= mongoose
