import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

export const comparePassword = async (password: string, otherpassword: string): Promise<boolean> => {
    try {
        const result = await bcrypt.compare(password, otherpassword);
        return result;
    } catch (error) {
        throw new Error('Error while comparing passwords');
    }

}
