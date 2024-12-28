import { model, Schema } from "mongoose";


const UserSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const UserModel  = model('Users', UserSchema);

export default UserModel;