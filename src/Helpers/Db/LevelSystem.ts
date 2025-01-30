import { Sharpy } from "../../Client";

const GetAllUsers = async (Sharpy: Sharpy) => {
    const Users = await Sharpy.db.userXp.findMany();

    return Users;
};

const GetUserByUserId = async (Sharpy: Sharpy, userId: string) => {
    const User = await Sharpy.db.userXp.findUnique({
        where: {
            userId
        }
    });

    return User;
};

const CreateUser = async (Sharpy: Sharpy, userId: string) => {
    const User = await Sharpy.db.userXp.create({
        data: {
            userId,
            textXp: 0,
            textLevel: 0,
            textXpForNextLevel: 100,
            voiceLevel: 0,
            voiceXp: 0,
            voiceXpForNextLevel: 50
        }
    });

    return User;
};

const AddXpToUser = async (Sharpy: Sharpy, userId: string, xp: number) => {
    const User = await GetUserByUserId(Sharpy, userId);

    if (!User) return { message: null, leveledUp: false };

    const newXp = User.textXp + xp;
    let newLevel = User.textLevel;
    let newXpForNextLevel = User.textXpForNextLevel;
    let leveledUp = false;

    while (newXp >= newXpForNextLevel) {
        newLevel++;
        newXpForNextLevel *= 1.6;
        leveledUp = true;
    }

    await Sharpy.db.userXp.update({
        where: {
            userId
        },
        data: {
            textXp: newXp,
            textLevel: newLevel,
            textXpForNextLevel: newXpForNextLevel
        }
    });

    const message = leveledUp
        ? `!Felicidades, has subido al nivel **${newLevel}**!`
        : null;
    return { message, leveledUp };
};

const RemoveXpToUser = async (Sharpy: Sharpy, userId: string, xp: number) => {
    const User = await GetUserByUserId(Sharpy, userId);

    if (!User) return { message: null, leveledUp: false };

    const newXp = User.textXp - xp;
    let newLevel = User.textLevel;
    let newXpForNextLevel = User.textXpForNextLevel;
    let leveledUp = false;

    while (newXp < 0) {
        newLevel--;
        newXpForNextLevel /= 1.6;
        leveledUp = true;
    }

    await Sharpy.db.userXp.update({
        where: {
            userId
        },
        data: {
            textXp: newXp,
            textLevel: newLevel,
            textXpForNextLevel: newXpForNextLevel
        }
    });

    const message = leveledUp ? `Has bajado al nivel **${newLevel}**` : null;
    return { message, leveledUp };
};

const RemoveUser = async (Sharpy: Sharpy, userId: string) => {
    await Sharpy.db.userXp.delete({
        where: {
            userId
        }
    });
};

const RemoveAllUsers = async (Sharpy: Sharpy) => {
    await Sharpy.db.userXp.deleteMany({});
};

const AddVoiceXpToUser = async (Sharpy: Sharpy, userId: string, xp: number) => {
    const User = await GetUserByUserId(Sharpy, userId);

    if (!User) return { message: null, leveledUp: false };

    const newXp = User.voiceXp + xp;
    let newLevel = User.voiceLevel;
    let newXpForNextLevel = User.voiceXpForNextLevel;
    let leveledUp = false;

    while (newXp >= newXpForNextLevel) {
        newLevel++;
        newXpForNextLevel *= 1.6;
        leveledUp = true;
    }

    await Sharpy.db.userXp.update({
        where: {
            userId
        },
        data: {
            voiceXp: newXp,
            voiceLevel: newLevel,
            voiceXpForNextLevel: newXpForNextLevel
        }
    });

    const message = leveledUp
        ? `!Felicidades, has subido al nivel **${newLevel}** en voice chat!`
        : null;
    return { message, leveledUp };
};

const RemoveVoiceXpToUser = async (Sharpy: Sharpy, userId: string, xp: number) => {
    const User = await GetUserByUserId(Sharpy, userId);

    if (!User) return { message: null, leveledUp: false };

    const newXp = User.voiceXp - xp;
    let newLevel = User.voiceLevel;
    let newXpForNextLevel = User.voiceXpForNextLevel;
    let leveledUp = false;

    while (newXp < 0) {
        newLevel--;
        newXpForNextLevel /= 1.6;
        leveledUp = true;
    }

    await Sharpy.db.userXp.update({
        where: {
            userId
        },
        data: {
            voiceXp: newXp,
            voiceLevel: newLevel,
            voiceXpForNextLevel: newXpForNextLevel
        }
    });

    const message = leveledUp
        ? `Has bajado al nivel **${newLevel}** en voice chat`
        : null;
    return { message, leveledUp };
};

export const Db = {
    GetAllUsers,
    GetUserByUserId,
    CreateUser,
    AddXpToUser,
    RemoveXpToUser,
    RemoveUser,
    RemoveAllUsers,
    AddVoiceXpToUser,
    RemoveVoiceXpToUser
};
