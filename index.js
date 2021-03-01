import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import loginRoutes from './routes/login.js'

const app = express();
dotenv.config();

app.use('/login', loginRoutes);

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DBURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify',false);