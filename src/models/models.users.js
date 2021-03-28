import mongoose from 'mongoose';
import {validateEmail} from "./models.validators.js";

const userSchema = new mongoose.Schema(
    {
        username:
        //this can't be changed
            {
                type: String,
                required: true,
                unique: true,
                immutable: true,
                validate: validateEmail
            },
        password: {
            type: String,
            required: true,
            select: false
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        phone: {
            type: String
        }
    });

/** Create mongoose model */
const UserModel = mongoose.model('Users', userSchema);
export default UserModel;