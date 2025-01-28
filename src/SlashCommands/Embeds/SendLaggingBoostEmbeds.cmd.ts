import { CommandInteraction, CacheType, TextChannel, User, Message } from "discord.js";
import { Sharpy } from "../../Client";
import { BoostMessageEmbed } from "../../Helpers";
import { Config } from "../../Data/Config";

export const SendLaggingBoostEmbedsCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    return await interaction.followUp({
        content: "Comando desativado."
    });

    // const channel = (await Sharpy.channels.fetch(
    //     Config.DiscordBot.EchosOfTalent.channels.Boost
    // )) as TextChannel;

    // const messages = (await channel!.messages.fetch())
    //     .filter((msg: Message) => msg.system)
    //     .reverse();

    // const usersWithoutRepeat = new Set<User>();

    // messages.forEach((msg: Message) => {
    //     const userId = msg.author.id;
    //     const user = Sharpy.users.cache.get(userId);
    //     if (!user) return;
    //     usersWithoutRepeat.add(user);
    // });

    // // // usersWithoutRepeat.forEach(async (user) => {
    // // //     const { content, embed } = BoostMessageEmbed(Sharpy, user);

    // // //     await channel.send({
    // // //         content,
    // // //         embeds: [embed],
    // // //         allowedMentions: { parse: ["users"] }
    // // //     });

    // // //     console.log(user.globalName);
    // // // });

    // send only to last user
    // let user;
    // usersWithoutRepeat.forEach((u) => {
    //     user = u;
    // });

    // const arrUserId = ["437308398845952001", "895819071726161941"];

    // arrUserId.forEach(async (userId) => {
    //     const user = Sharpy.users.cache.get(userId);
    //     if (!user) return;
    //     const { content, embed } = BoostMessageEmbed(Sharpy, user);

    //     await channel.send({
    //         content,
    //         embeds: [embed],
    //         allowedMentions: { parse: ["users"] }
    //     });
    // });

    // await interaction.followUp({
    //     content: "Enviado."
    // });
};
