import { Sharpy } from "../../Client";

const GetBirthdays = async (Sharpy: Sharpy) => {
    return await Sharpy.db.birthdays.findMany();
};

const GetNextBirthdays = async (Sharpy: Sharpy, limit: number = 5) => {
    const today = new Date();
    return await Sharpy.db.birthdays.findMany({
        where: { date: { gte: today } },
        orderBy: { date: "asc" },
        take: limit
    });
};

const GetPreviousBirthdays = async (Sharpy: Sharpy, limit: number = 5) => {
    const today = new Date();
    return await Sharpy.db.birthdays.findMany({
        where: { date: { lte: today } },
        orderBy: { date: "desc" },
        take: limit
    });
};

const RegisterBirthday = async (Sharpy: Sharpy, userId: string, date: Date) => {
    return await Sharpy.db.birthdays.upsert({
        where: { userId },
        update: { date },
        create: { userId, date }
    });
};

export const Db = {
    GetBirthdays,
    GetNextBirthdays,
    GetPreviousBirthdays,
    RegisterBirthday
};
