import { createUser, findUserByUserName } from "../service/UserService";
import { comparePassword } from "../utils/passwordUtils";
import { UserSchema } from "../ValidationSchema/UserSchema";

//@ts-ignore
export const signup = async (req, res) => {
    try {
        const { success, data, error } = UserSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: error.errors.map(err => err.message).join(', ')
            });
        }

        //@ts-ignore
        const userExists = await findUserByUserName(data.username);

        if (userExists) {
            return res.status(403).json({
                message: 'User already exists with this userName'
            });
        }
        // @ts-ignore
        await createUser(data.username, data.password);

        res.status(200).json({
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Error in signup', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

//@ts-ignore
export const signin = async (req, res) => {
    try {
        const { success, data, error } = UserSchema.safeParse(req.body);
        if (!success) {
            //@ts-ignore
            return res.status(400).json({
                message: error.errors.map(err => err.message).join(', ')
            });
        }

        //@ts-ignore
        const userExists = await findUserByUserName(data.username);

        if (!userExists) {
            return res.status(403).json({
                message: 'User does not exists with this userName'
            });
        }

        const passwordMatch = await comparePassword(userExists.password, data.password);

        if (!passwordMatch) {
            return res.status(403).json({
                message: 'Invalid password'
            });
        }

        res.status(200).json({
            message: 'User logged in successfully'
        });
    } catch{
        res.status(500).json({
            'message' : 'Internal server error'
        })
    }
}