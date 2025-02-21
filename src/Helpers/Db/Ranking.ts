import { Sharpy } from "../../Client";

const GetRankUsers = async (Sharpy: Sharpy) => {
    return await Sharpy.db.singRank.findMany();
};

const GetRankUserById = async (Sharpy: Sharpy, id: string) => {
    return await Sharpy.db.singRank.findFirst({
        where: {
            id
        }
    });
};

const GetRankUserByUserId = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.singRank.findFirst({
        where: {
            userId
        }
    });
};

const RemoveRankUserById = async (Sharpy: Sharpy, id: string) => {
    return await Sharpy.db.singRank.delete({
        where: {
            id
        }
    });
};

const RemoveRankUserByUserId = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.singRank.delete({
        where: {
            userId
        }
    });
};

const RemoveAllRankUsers = async (Sharpy: Sharpy) => {
    return await Sharpy.db.singRank.deleteMany();
};

const UpdatePointsByUserId = async (Sharpy: Sharpy, userId: string, points: number) => {
    return await Sharpy.db.singRank.update({
        where: {
            userId
        },
        data: {
            points
        }
    });
};

const CreateRankUser = async (Sharpy: Sharpy, userId: string, points?: number) => {
    return await Sharpy.db.singRank.create({
        data: {
            userId,
            points: points ?? 0
        }
    });
};

export const Db = {
    GetRankUsers,
    GetRankUserById,
    GetRankUserByUserId,
    RemoveRankUserById,
    RemoveRankUserByUserId,
    RemoveAllRankUsers,
    UpdatePointsByUserId,
    CreateRankUser
};
