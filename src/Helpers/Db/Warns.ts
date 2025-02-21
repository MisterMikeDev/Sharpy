import { Sharpy } from "../../Client";

const GetWarns = async (Sharpy: Sharpy) => {
    return await Sharpy.db.warns.findMany();
};

const GetWarnsById = async (Sharpy: Sharpy, id: string) => {
    return await Sharpy.db.warns.findUnique({
        where: {
            id
        }
    });
};

const GetWarnsByUserId = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.warns.findMany({
        where: {
            userId
        }
    });
};

const AddWarn = async (
    Sharpy: Sharpy,
    data: {
        userId: string;
        reason: string;
        staffId: string;
    }
) => {
    return await Sharpy.db.warns.create({
        data: {
            userId: data.userId,
            reason: data.reason,
            staffId: data.staffId
        }
    });
};

const RemoveWarnById = async (Sharpy: Sharpy, id: string) => {
    return await Sharpy.db.warns.delete({
        where: {
            id
        }
    });
};

const RemoveWarnByUserId = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.warns.deleteMany({
        where: {
            userId
        }
    });
};

export const Db = {
    GetWarns,
    GetWarnsById,
    GetWarnsByUserId,
    AddWarn,
    RemoveWarnById,
    RemoveWarnByUserId
};
