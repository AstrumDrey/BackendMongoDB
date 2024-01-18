import express = require('express');
import mongoose from 'mongoose'
import cors = require('cors');
import * as dotenv from 'dotenv';
import routerGET from './router/userGet'
import routerPOST from './router/userPost'
import routerUpdate from './router/userUpdate'
import routerDelete from './router/useDelete'

dotenv.config({ path: `${__dirname}/.env.local` });
const { MONGO_URI = '', PORT } = process.env

const app = express();
app.use(express.json());
app.use(cors())

// Function to create a connection with mongodb
const connectMongo = async (tries: number = 3) => {
    try {
        if(MONGO_URI) {
            await mongoose.connect(MONGO_URI);
            console.log('Connected to MongoDB');
            // Server Creation.
            app.listen(PORT, () => {
                console.log('Server listening')
            });
        } else {
            console.error("There's no info about URI")
        }
    } catch (error) {
        // Handling the error
        console.error('Error: Connection Failed');
        if ( tries > 0 ){
            setTimeout(() => connectMongo(tries - 1), 5000);
        } else {
            console.error("It's impossible to connect");
            mongoose.connection.close();
            console.log('Trying again...')
            connectMongo();
        }
    }
};
connectMongo();

// CREATING ROUTERS
const testGET = routerGET;
const testPOST = routerPOST;
const testPUT = routerUpdate;
const testDEL = routerDelete;

//USING ROUTERS

app.use("/api", testGET)
app.use("/api", testPOST)
app.use("/api", testPUT)
app.use("/api", testDEL)
