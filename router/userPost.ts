// import { User } from '../models/interfaces/user.interface.js';
import UserModel from '../models/user.model.js';
import * as express from 'express'

const routerPOST = express.Router();

//Create POST method

routerPOST.post('/newUser', async (req,res) => {

    const { username, email, password } = req.body
    try {

        const verifyUser = async (username: string, email: string): Promise<boolean> => {
            const userExist = await UserModel.findOne({ $or: [ {username}, {email}]})

            return !!userExist
        }

        // First we search for the user.

        if(await verifyUser(username, email)) {
            res.status(200).send({ message: 'User exist'})
        } else {

            const newUser = new UserModel({
            username : username,
            email : email,
            password : password,
        })
            await newUser.save()
                .then(() => {
                    res.status(201).send({ message: 'User Saved Successfully'})
                })
                .catch((error: string) => {
                    console.error('Error saving user: ', error)
                    res.status(400).send({ message: 'Error saving the user.'})
                })
        }
    } catch ( error: unknown ) {
        console.error('Error:', error);
        res.status(500).send({ message : error })
    }
})

export default routerPOST;
