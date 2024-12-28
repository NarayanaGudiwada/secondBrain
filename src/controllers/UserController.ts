import { createUser, findUserByUserName } from "../service/UserService";
import { comparePassword, generateJWTToken, hashPassword } from "../utils/authUtils";
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
        const user = await findUserByUserName(data.username);

        if (user) {
            return res.status(403).json({
                message: 'User already exists with this userName'
            });
        }
        const hashedPassword = await hashPassword(data.password);
        console.log(hashedPassword);
        // @ts-ignore
        await createUser(data.username, hashedPassword);

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
        const user = await findUserByUserName(data.username);

        if (!user) {
            return res.status(403).json({
                message: 'User does not exists with this userName'
            });
        }

        const passwordMatch = await comparePassword(user.password, data.password);


        if (!passwordMatch) {
            return res.status(403).json({
                message: 'Invalid password'
            });
        }

        //@ts-ignore
        const jwtToken = await generateJWTToken(user._id);
        res.status(200).cookie('token', jwtToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).json({
            message: 'User logged in successfully'
        });
    } catch {
        res.status(500).json({
            'message': 'Internal server error'
        })
    }
}