import { CacheType, CommandInteraction, EmbedBuilder, TextChannel } from "discord.js";
import { Config } from "../../Data/Config";
import { Sharpy } from "../../Client";
import { Emojis } from "../../Data/Emojis";

export const ReportBugCommand = async ({
    Sharpy,
    interaction,
    bug
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    bug: string;
}) => {
    const channel = (await Sharpy.channels.fetch(
        Config.DiscordBot.EchosOfTalent.channels.ReportBug
    )) as TextChannel;

    if (!channel) return;

    const embed = new EmbedBuilder()
        .setTitle("Nuevo reporte de bug")
        .setDescription(
            `El usuario <@${interaction.user.id}> ha reportado un bug:\n\`\`\`\n${bug}\n\`\`\``
        )
        .setColor("#550000")
        .setFooter({
            text: "Echoes Of Talent | Reporte de bug",
            iconURL: interaction.user.displayAvatarURL()
        })
        .setTimestamp();

    await channel.send({ embeds: [embed] });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Tu reporte ha sido enviado, gracias por ayudarnos a mejorar.`,
        ephemeral: true
    });
};
