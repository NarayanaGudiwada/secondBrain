import ContentModel from "../models/ContentModel";
import { Content } from "../ValidationSchema/ContentTypes";
import TagModel from "../models/TagModel";
import { SBError } from "../utils/SBError";

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

export const getAllContent = async (userId: string) => {
    const contents = await ContentModel.find({ userId }).populate('tags', { title: 1, _id: 0 });
    return contents;
}

export const deleteContentById = async (contentId: string, userId: string) => {
    const content = await getContentById(contentId, userId);
    if (!content) {
        throw new SBError(`Trying to delete a document you don’t own`, 403);
    }
    await content.deleteOne();
}

export const getContentById = async (contentId: string, userId: string) => {
    const content = await ContentModel.findOne({ userId: userId, _id: contentId });
    return content;
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