import { User } from "discord.js";
import { Event } from "../../Interfaces";
import { Db } from "../../Helpers/Db/Apeals";
import { Config } from "../../Data/Config";

export const event: Event = {
    name: "userBanned",
    run: async (
        Sharpy,
        user: User,
        reason: string,
        apeal: {
            id: string;
            userId: string;
            situation: string;
            commitment: string;
            categoryId: string;
            textApealChannelId: string;
            voiceApealChannelId: string;
            createdAt: Date;
            updatedAt: Date;
        }
    ) => {
        const guild = await Sharpy.guilds.fetch(Config.DiscordBot.EchoesOfTalent.id);

        await user.send({
            content: `> Tu apelación ha sido rechazada por **${user.username}**.\n- **Razón:** ${reason}\n\n*Si deseas apelar nuevamente, puedes hacerlo en 15 días.*`
        });

        const textApealChannel = await guild.channels.fetch(apeal.textApealChannelId);
        const voiceApealChannel = await guild.channels.fetch(apeal.voiceApealChannelId);
        const category = await guild.channels.fetch(apeal.categoryId);

        await textApealChannel!.delete().catch(() => {});
        await voiceApealChannel!.delete().catch(() => {});
        await category!.delete().catch(() => {});

        await Db.CreatePreApeal(Sharpy, {
            userId: user.id,
            reason,
            timeNeededToApeal: Date.now() + 1000 * 60 * 60 * 24 * 15
        });
    }
};
