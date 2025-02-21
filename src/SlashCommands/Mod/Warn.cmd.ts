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

export const WarnCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    await interaction.deferReply({ ephemeral: true });

    const user = options.getUser("user", true);
    const reason = options.getString("reason", false);

    const reportChannel = (await Sharpy.channels.fetch(
        Config.DiscordBot.EchoesOfTalent.channels.ReportStaff
    )) as TextChannel;

    await Db.AddWarn(Sharpy, {
        userId: user.id,
        reason: reason ?? "No se especificó una razón.",
        staffId: interaction.user.id
    });

    await reportChannel.send({
        content: "Se ha advertido a un usuario.",
        embeds: [
            new EmbedBuilder()
                .setTitle(`${Emojis.Echo.Warning} Advertencia ${Emojis.Echo.Warning}`)
                .setColor("#550000")
                .setFields({
                    name: "Staff que advirtió al usuario:",
                    value: `<@${interaction.user.id}>`
                })
                .setFooter({
                    text: "Echo's Of Talent - Advertencia",
                    iconURL: Sharpy.user!.displayAvatarURL()
                })
                .setTimestamp()
        ]
    });

    return await interaction.followUp({
        content: `${Emojis.Echo.Warning} | Se ha advertido a **${user.globalName}**.`,
        ephemeral: true
    });
};
