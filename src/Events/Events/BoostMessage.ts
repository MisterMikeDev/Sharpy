import { Message } from "discord.js";
import { Event } from "../../Interfaces";
import { Config } from "../../Data/Config";
import { BoostMessageEmbed } from "../../Helpers";

export const event: Event = {
    name: "messageCreate",
    run: async (Sharpy, message: Message) => {
        if (message.guild!.id !== Config.DiscordBot.EchoesOfTalent.id) return;

        if (message.channel.id !== Config.DiscordBot.EchoesOfTalent.channels.Boost)
            return;

        if (!message.system) return;

        const messages = (await message.channel.messages.fetch()).filter(
            (m) => m.system && !m.author.bot
        );

        const lastMessage = messages.first()!;

        if (!lastMessage.system) return;

        if (lastMessage.author.id === message.author.id) return;

        const { content, embed } = BoostMessageEmbed(Sharpy, lastMessage.author);

        const boostChannel = await Sharpy.channels.fetch(
            Config.DiscordBot.EchoesOfTalent.channels.Boost
        );

        if (!boostChannel) return;
        if (!boostChannel.isTextBased()) return;

        await boostChannel.send({
            content,
            embeds: [embed],
            allowedMentions: { parse: ["users"] }
        });
    }
};
