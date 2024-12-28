import { z } from 'zod';

export const UserSchema = z.object({
    username: z.string({required_error: 'username is required'})
        .min(3, { message: "username should be a minimum of 3 characters" })
        .max(10, { message: "username should be a maximum of 10 characters" }),
    password: z.string({required_error: 'password is required'})
        .min(8, { message: "password should be a minimum of 8 characters" })
        .max(20, { message: "password should be a maximum of 20 characters" })
        .regex(/[A-Z]/, { message: "password should contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "password should contain at least one lowercase letter" })
        .regex(/\d/, { message: "password should contain at least one digit" })
        .regex(/[^a-zA-Z0-9]/, { message: "password should contain at least one special character" })
});

export type User = z.infer<typeof UserSchema>;
