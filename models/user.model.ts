import {Schema, model} from 'mongoose';
import { User } from './interfaces/user.interface';

//Creating a Schema.
const userSchema = new Schema<User>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//Model after the Schema.

const UserModel = model<User>('User', userSchema);

// After creating the model we have to export for using It in other files.

export default UserModel;
