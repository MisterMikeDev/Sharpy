import { Sharpy } from "../../Client";

/* PreApeals */

const GetPreApeals = async (Sharpy: Sharpy) => {
    return await Sharpy.db.preApeals.findMany();
};

const GetPreApealByUserId = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.preApeals.findUnique({
        where: {
            userId
        }
    });
};

const CreatePreApeal = async (
    Sharpy: Sharpy,
    data: {
        userId: string;
        reason: string;
        timeNeededToApeal: number;
    }
) => {
    return await Sharpy.db.preApeals.create({ data });
};

const RemovePreApealById = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.preApeals.delete({
        where: {
            userId
        }
    });
};

/* Apeals */

const GetApeals = async (Sharpy: Sharpy) => {
    return await Sharpy.db.apeals.findMany();
};

const GetApealByUserId = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.apeals.findUnique({
        where: {
            userId
        }
    });
};

const CreateApeal = async (
    Sharpy: Sharpy,
    data: {
        userId: string;
        categoryId: string;
        textApealChannelId: string;
        voiceApealChannelId: string;
    }
) => {
    return await Sharpy.db.apeals.create({ data });
};

const RemoveApealById = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.apeals.delete({
        where: {
            userId
        }
    });
};

const UpdateApealStatus = async (
    Sharpy: Sharpy,
    userId: string,
    status: "pending" | "pardon" | "rejected"
) => {
    return await Sharpy.db.apeals.update({
        where: {
            userId
        },
        data: {
            status
        }
    });
};

/* Pardons */

const GetPardons = async (Sharpy: Sharpy) => {
    return await Sharpy.db.pardons.findMany();
};

const GetPardonByUserId = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.pardons.findUnique({
        where: {
            userId
        }
    });
};

const CreatePardon = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.pardons.create({
        data: {
            userId
        }
    });
};

const RemovePardonById = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.pardons.delete({
        where: {
            userId
        }
    });
};

const IncrementPardonCount = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.pardons.update({
        where: {
            userId
        },
        data: {
            count: {
                increment: 1
            }
        }
    });
};

const DecrementPardonCount = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.pardons.update({
        where: {
            userId
        },
        data: {
            count: {
                decrement: 1
            }
        }
    });
};

export const Db = {
    GetPreApeals,
    GetPreApealByUserId,
    CreatePreApeal,
    RemovePreApealById,
    GetApeals,
    GetApealByUserId,
    CreateApeal,
    RemoveApealById,
    UpdateApealStatus,
    GetPardons,
    GetPardonByUserId,
    CreatePardon,
    RemovePardonById,
    IncrementPardonCount,
    DecrementPardonCount
};
