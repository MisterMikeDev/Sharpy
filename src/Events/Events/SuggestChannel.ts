import { Event } from "../../Interfaces";
import { Config } from "../../Data/Config";
import { Message } from "discord.js";
import { SuggestionEmbed } from "../../Helpers";
import { Db } from "../../Helpers/Db/Suggest";
import { Db as BlacklistDb } from "../../Helpers/Db/Blacklist";
import { Emojis } from "../../Data/Emojis";

export const event: Event = {
    name: "messageCreate",
    run: async (Sharpy, message: Message) => {
        if (
            message.channel.id !==
                Config.DiscordBot.EchoesOfTalent.channels.Sugerencias ||
            message.author.bot
        )
            return;

        const userBlacklist = await BlacklistDb.GetUserById(Sharpy, message.author.id);

        if (userBlacklist) {
            return await message.delete().catch(() => {});
        }

        const authorId = message.author.id;
        const suggestion = message.content.trim();

        await message.delete().catch(() => {});

        const newSuggestion = await Db.CreateSuggestion(Sharpy, {
            authorId,
            suggestion,
            messageId: Math.floor(Math.random() * 1000000).toString()
        });

        try {
            const { embed, components } = await SuggestionEmbed(Sharpy, newSuggestion.id);

            const newMsgSuggest = (await message.channel.send({
                embeds: [embed],
                components
            })) as Message;

            const messageId = newMsgSuggest.id;

            await Db.UpdateSuggestionMessageId(Sharpy, {
                suggestionId: newSuggestion.id,
                newMessageId: messageId
            });
        } catch {
            message.author.send(
                `${Emojis.Util.No} | Ocurrio un error al enviar la sugerencia, comunicate con el staff.`
            );
        }
    }
};
