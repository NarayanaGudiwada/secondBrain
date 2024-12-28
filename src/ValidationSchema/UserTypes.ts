import { z } from 'zod';
import { UserSchema } from './UserSchema';

export type User = z.infer<typeof UserSchema>;