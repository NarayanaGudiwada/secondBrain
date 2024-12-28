import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

export const comparePassword = async (passwordHash: string, password: string): Promise<boolean> => {
    try {
        const result = await bcrypt.compare(password, passwordHash);
        return result;
    } catch (error) {
        throw new Error('Error while comparing passwords');
    }

}

export const generateJWTToken = async (userId: string): Promise<string> => {

    // @ts-ignore
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}


