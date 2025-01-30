import { CommandInteraction, CacheType, EmbedBuilder } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/LevelSystem";
import { Emojis } from "../../Data/Emojis";

export const StatsCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const user = interaction.user;
    const userStats = await Db.GetUserByUserId(Sharpy, user.id);

    if (!userStats)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No tienes estadísticas.`,
            ephemeral: true
        });

    const textLevel = userStats.textLevel;
    const textXp = userStats.textXp;
    const textXpForNextLevel = userStats.textXpForNextLevel;

    const voiceLevel = userStats.voiceLevel;
    const voiceXp = userStats.voiceXp;
    const voiceXpForNextLevel = userStats.voiceXpForNextLevel;

    const embed = new EmbedBuilder()
        .setTitle("Estadísticas")
        .setFields(
            {
                name: "Nivel de texto:",
                value: `Nivel: ${textLevel}\n**XP: ${textXp}/${textXpForNextLevel}**`,
                inline: true
            },
            {
                name: "Nivel de voz:",
                value: `Nivel: ${voiceLevel}\n**XP: ${voiceXp}/${voiceXpForNextLevel}**`,
                inline: true
            }
        )
        .setColor("Random")
        .setFooter({
            text: "Echoes Of Talent | Estadísticas",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    await interaction.followUp({
        embeds: [embed]
    });
};
