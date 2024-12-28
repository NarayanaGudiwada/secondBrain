import { z } from 'zod';
import { contentTypes } from '../Constants';

export const ContentSchema = z.object({
    type: z.enum(contentTypes as [string, ...string[]], { message: 'type should be one of the following: document, tweet, youtube, link', required_error: 'type field is required' }),
    link: z.string({ required_error: 'link field is required' }).url({ message: 'link should be valid URL' }),
    title: z.string({ required_error: 'title field is required' }),
    tags: z.array(z.string())
});

export type Content = z.infer<typeof ContentSchema>;