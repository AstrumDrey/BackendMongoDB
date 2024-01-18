import UserModel from "../models/user.model";
import * as express from 'express'


const routerUpdate = express.Router();

routerUpdate.put('/updateUser/:userID', async (req,res) => {
    const userId = req.params.userID
    const { newUsername, newEmail, newPassword } = req.body
    try {
        const filter = { _id: userId };
        const update = { $set: { username: newUsername, email: newEmail, password: newPassword } };
        const result = await UserModel.updateOne(filter, update);
        if (result.acknowledged) {
            res.status(201).json({ message: 'User updated' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(404).json({ message: 'Failed to find the user' });
    }
})
export default routerUpdate;
