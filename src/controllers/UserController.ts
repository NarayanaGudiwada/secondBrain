import { Request, Response } from "express";
import { createUser, findUserByUserName } from "../service/UserService";
import { comparePassword, generateJWTToken, hashPassword } from "../utils/authUtils";
import { UserSchema } from "../ValidationSchema/UserSchema";

export const signup = async (req: Request, res: Response) => {
    const { success, data, error } = UserSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: error.errors.map(err => err.message).join(', ')
        });
    } else {
        const user = await findUserByUserName(data.username);

        if (user) {
            res.status(403).json({
                message: 'User already exists with this userName'
            });
        } else {
            const hashedPassword = await hashPassword(data.password);
            await createUser(data.username, hashedPassword);

            res.status(200).json({
                message: 'User created successfully'
            });
        }
    }
}

export const signin = async (req: Request, res: Response) => {
    const { success, data, error } = UserSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: error.errors.map(err => err.message).join(', ')
        });
    } else {
        const user = await findUserByUserName(data.username);

        if (!user) {
            res.status(403).json({
                message: 'User does not exists with this userName'
            });
        } else {

            const passwordMatch = await comparePassword(user.password, data.password);


            if (!passwordMatch) {
                res.status(403).json({
                    message: 'Invalid password'
                });
            } else {
                const jwtToken = await generateJWTToken(user._id.toString());
                res.status(200).cookie('token', jwtToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).json({
                    message: 'User logged in successfully'
                });
            }

        }
    }

}