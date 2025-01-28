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
            message.channel.id !== Config.DiscordBot.EchosOfTalent.channels.Sugerencias ||
            message.author.bot
        )
            return;

        // const replys = [
        //     "Me vale verga tu sugerencia",
        //     "Tu sugerencia es una mierda",
        //     "Y si mejor te callas",
        //     "Mejor vamos cerrando el ortito",
        //     "No me interesa tu pendejada",
        //     "Para eso mejor no digas nada",
        //     "De que raza es esa perra mamada que acabas de decir",
        //     "Mejor vete a la verga",
        //     "No me interesa tu opinión",
        //     "No me importa tu sugerencia",
        //     "Mejor vete a la chingada",
        //     "Come mierda",
        //     "Vete a la verga, que hueva",
        //     "Pero que pendejada acabas de decir",
        //     "Deja de decir pendejadas",
        //     "Llega el pendejo a decir pendejadas",
        //     "No mames...",
        //     "Esa mafufada que acabas de decir",
        //     "Deja de cagar el palo",
        //     "Camara wey, no chinges",
        //     "Tu sugerencia es una reverenda pendejada"
        // ];

        // const random = Math.floor(Math.random() * replys.length);

        // message.reply(replys[random]);

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
