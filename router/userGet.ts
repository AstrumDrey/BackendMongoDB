//import { User } from '../models/interfaces/user.interface';
import UserModel from '../models/user.model.js';
import * as express from 'express'


const routerGET = express.Router();

routerGET.get('/user', async (_req, res) => {
    try {
        //Function to get all users with only _id, username and email
        const users = await UserModel.find({}, '_id username email');
        if(users) {
            res.status(201).json({ users: users})
        } else {
            res.status(404).json({ users: users})
        }
    } catch (error: unknown ) {
        res.status(500).json({ message: error  })
    }
})

export default routerGET;
