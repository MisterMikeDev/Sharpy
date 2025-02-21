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
import { Db } from "../../Helpers/Db/Warns";

export const UnWarnCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    await interaction.deferReply();

    const warnId = options.getString("warn-id", true);

    const warn = await Db.GetWarnsById(Sharpy, warnId);

    if (!warn) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No se encontró la advertencia con el ID **${warnId}**.`,
            ephemeral: true
        });
    }

    const reportChannel = Sharpy.channels.cache.get(
        Config.DiscordBot.EchoesOfTalent.channels.ReportStaff
    ) as TextChannel;

    try {
        await reportChannel.send({
            content: "Se ha eliminado una advertencia.",
            embeds: [
                new EmbedBuilder()
                    .setTitle("Advertencia eliminada")
                    .setColor("#550000")
                    .setDescription(`Se ha eliminado una advertencia de <@${warn.id}>`)
                    .setFields({
                        name: "Staff que eliminó la advertencia:",
                        value: `<@${interaction.user.id}>`
                    })
                    .setFooter({
                        text: "Echo's Of Talent - Advertencia eliminada",
                        iconURL: Sharpy.user!.displayAvatarURL()
                    })
                    .setTimestamp()
            ]
        });

        await Db.RemoveWarnById(Sharpy, warnId);

        return await interaction.followUp({
            content: `${Emojis.Util.Yes} | La advertencia con el ID **${warnId}** ha sido eliminada correctamente.`
        });
    } catch (error) {
        console.error(error);
        return await interaction.followUp({
            content: `${Emojis.Util.No} | Ocurrió un error al intentar eliminar la advertencia.`,
            ephemeral: true
        });
    }
};
