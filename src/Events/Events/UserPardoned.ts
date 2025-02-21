import { User } from "discord.js";
import { Event } from "../../Interfaces";
import { Config } from "../../Data/Config";
import { Db } from "../../Helpers/Db/Apeals";

export const event: Event = {
    name: "userPardoned",
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
        const invitation = await guild.invites.create(
            Config.DiscordBot.EchoesOfTalent.channels.General,
            {
                maxAge: 1000 * 60 * 60 * 24,
                maxUses: 1,
                unique: true,
                reason: `Invitación para ${user.username} perdonado por ${user.username}`,
                temporary: true
            }
        );

        await user.send({
            content: `> Tu apelación ha sido perdonada por **${user.username}**.\n- **Razón:** ${reason}\n- **Invitacion a Echoes:** ${invitation.url}`
        });

        const textApealChannel = await guild.channels.fetch(apeal.textApealChannelId);
        const voiceApealChannel = await guild.channels.fetch(apeal.voiceApealChannelId);
        const category = await guild.channels.fetch(apeal.categoryId);

        await textApealChannel!.delete().catch(() => {});
        await voiceApealChannel!.delete().catch(() => {});
        await category!.delete().catch(() => {});

        await Db.RemoveApealById(Sharpy, apeal.id);
    }
};
