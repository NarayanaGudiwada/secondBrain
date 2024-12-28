import UserModel from "../models/UserModel"

export const findUserByUserName = async (userName: string) => {
    return await UserModel.findOne({ userName});
}

export const createUser = async (userName: string, password: string) => {
    return await UserModel.create({ userName, password });
}