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

const GetPreApealById = async (Sharpy: Sharpy, preapealId: string) => {
    return await Sharpy.db.preApeals.findUnique({
        where: {
            id: preapealId
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
    return await Sharpy.db.preApeals.create({
        data: {
            userId: data.userId,
            reason: data.reason,
            timeNeededToApeal: data.timeNeededToApeal
        }
    });
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

const GetApealById = async (Sharpy: Sharpy, apealId: string) => {
    return await Sharpy.db.apeals.findUnique({
        where: {
            id: apealId
        }
    });
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
        situation: string;
        commitment: string;
        categoryId: string;
        textApealChannelId: string;
        voiceApealChannelId: string;
    }
) => {
    return await Sharpy.db.apeals.create({
        data: {
            userId: data.userId,
            situation: data.situation,
            commitment: data.commitment,
            categoryId: data.categoryId,
            textApealChannelId: data.textApealChannelId,
            voiceApealChannelId: data.voiceApealChannelId
        }
    });
};

const RemoveApealById = async (Sharpy: Sharpy, apealId: string) => {
    return await Sharpy.db.apeals.delete({
        where: {
            id: apealId
        }
    });
};

const RemoveApealByUserId = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.apeals.delete({
        where: {
            userId
        }
    });
};

const UpdateApealChannels = async (
    Sharpy: Sharpy,
    userId: string,
    textApealChannelId: string,
    voiceApealChannelId: string
) => {
    return await Sharpy.db.apeals.update({
        where: {
            userId
        },
        data: {
            textApealChannelId,
            voiceApealChannelId
        }
    });
};

/* Pardons */

const GetPardons = async (Sharpy: Sharpy) => {
    return await Sharpy.db.pardons.findMany();
};

const GetPardonByUserId = async (Sharpy: Sharpy, userId: string) => {
    return await Sharpy.db.pardons.findMany({
        where: {
            userId
        }
    });
};

const CreatePardon = async (
    Sharpy: Sharpy,
    data: {
        userId: string;
        staffId: string;
        reason: string;
    }
) => {
    return await Sharpy.db.pardons.create({
        data: {
            userId: data.userId,
            staffId: data.staffId,
            reason: data.reason
        }
    });
};

const RemovePardonById = async (Sharpy: Sharpy, apealId: string) => {
    return await Sharpy.db.pardons.delete({
        where: {
            id: apealId
        }
    });
};

export const Db = {
    GetPreApeals,
    GetPreApealById,
    GetPreApealByUserId,
    CreatePreApeal,
    RemovePreApealById,
    GetApeals,
    GetApealById,
    GetApealByUserId,
    CreateApeal,
    RemoveApealById,
    RemoveApealByUserId,
    UpdateApealChannels,
    GetPardons,
    GetPardonByUserId,
    CreatePardon,
    RemovePardonById
};
