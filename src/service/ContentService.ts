import { TagSet } from "mongoose";
import ContentModel from "../models/ContentModel";
import { Content } from "../ValidationSchema/ContentTypes";
import TagModel from "../models/TagModel";

export const createContent = async (content: Content, userId: string) => {
    const tags: string[] = content.tags;
    let tagsList: string[] = [];
    for (const tag of tags) {
        tagsList.push((await createTag(tag))._id.toString());
    }
    await ContentModel.create({
        ...content,
        tags: tagsList,
        userId: userId
    });
}

export const createTag = async (tagTitle: string) => {
    let tag = await getTag(tagTitle);
    if (!tag) {
        tag = await TagModel.create({
            title: tagTitle
        })
    }
    return tag;
}

export const getTag = async (tag: string) => {
    return await TagModel.findOne({ title: tag });
}