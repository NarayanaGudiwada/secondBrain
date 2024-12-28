import { model, Schema, Types } from "mongoose";
import { contentTypes } from "../Constants";


const ContentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: 'Tags' }],
    userId: { type: Types.ObjectId, ref: 'Users' }
})

const ContentModel = model('Contents', ContentSchema);

export default ContentModel;