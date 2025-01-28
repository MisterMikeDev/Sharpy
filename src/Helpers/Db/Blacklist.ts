import { Sharpy } from "../../Client";

const GetAllBlacklistedUser = async (Sharpy: Sharpy) => {
    const blacklistedUsers = await Sharpy.db.blacklist.findMany();

    return blacklistedUsers;
};

const GetUserById = async (Sharpy: Sharpy, userId: string) => {
    const user = await Sharpy.db.blacklist.findUnique({
        where: { id: userId }
    });

    return user;
};

const AddUserBlacklist = async (
    Sharpy: Sharpy,
    userId: string,
    reason: string = "No especificado"
) => {
    const user = await Sharpy.db.blacklist.create({
        data: {
            userId,
            reason
        }
    });

    return user;
};

const RemoveUserBlacklist = async (Sharpy: Sharpy, userId: string) => {
    const user = await Sharpy.db.blacklist.delete({
        where: { id: userId }
    });

    return user;
};

export const Db = {
    GetAllBlacklistedUser,
    GetUserById,
    AddUserBlacklist,
    RemoveUserBlacklist
};
