import * as express from 'express'
import UserModel from '../models/user.model'

const routerDelete = express.Router();

// Show all throught console and delete by userId.
routerDelete.delete('/deleteUser/:userId', async (req,res) => {

    const userId = req.params.userId;
    try {

        const filter = { _id: userId}
        if (await UserModel.findOneAndDelete(filter)) {
            res.status(201).send('Borrado')
        } else {
            res.status(404).send('Usuario no encontrado')
        }
    } catch (error) {
        res.status(500).send('Error')
    }
})

export default routerDelete;
