import {
    CacheType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    EmbedBuilder,
    TextChannel
} from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";
import { Sharpy } from "../../Client";

export const ReportCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    await interaction.deferReply();

    const user = options.getUser("user");
    const reason = options.getString("reason") || "No se proporcionó una razón.";
    const guild = interaction.guild!;
    const reportChannel = (await Sharpy.channels.fetch(
        Config.DiscordBot.EchoesOfTalent.channels.ReportStaff
    )) as TextChannel;

    if (!user) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | Debes mencionar a un usuario o proporcionar su ID.`,
            ephemeral: true
        });
    }

    const targetMember = await guild.members.fetch(user.id).catch(() => null);

    if (!targetMember) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No se pudo encontrar al usuario en este servidor.`,
            ephemeral: true
        });
    }

    const embedReport = new EmbedBuilder()
        .setAuthor({
            name: "Reporte de usuario",
            iconURL: guild.iconURL() ?? undefined
        })
        .setDescription(
            `<@${interaction.user.id}> ha reportado a <@${targetMember.user.id}>.`
        )
        .setFields(
            {
                name: "Usuario:",
                value: `<@${targetMember.user.id}>`,
                inline: true
            },
            {
                name: "Razón:",
                value: reason,
                inline: true
            }
        )
        .setColor("#550000")
        .setFooter({
            text: "Echoes of Talent | Reporte de usuario",
            iconURL: guild.iconURL() ?? undefined
        })
        .setTimestamp();

    await reportChannel.send({
        content: `<@&${Config.DiscordBot.EchoesOfTalent.roles.Staff}>`,
        embeds: [embedReport],
        allowedMentions: { roles: [Config.DiscordBot.EchoesOfTalent.roles.Staff] }
    });
};
