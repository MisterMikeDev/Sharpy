import {
    CacheType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    EmbedBuilder
} from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Warns";

export const GetWarnsCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    await interaction.deferReply();

    const user = options.getUser("user", false);

    if (user) {
        const warns = await Db.GetWarnsByUserId(Sharpy, user.id);
        if (warns.length === 0) {
            return await interaction.followUp({
                content: `${Emojis.Echo.Warning} | El usuario **${user.globalName}** no tiene advertencias.`,
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setTitle(`Advertencias de ${user.globalName}`)
            .setColor("#550000")
            .setDescription(
                warns
                    .map(
                        (warn, index) =>
                            `**${index + 1}.** ${
                                warn.reason
                            } - Advertido por: <@${warn.staffId}>`
                    )
                    .join("\n")
            );

        return await interaction.followUp({
            embeds: [embed]
        });
    } else {
        const warns = await Db.GetWarns(Sharpy);
        if (warns.length === 0) {
            return await interaction.followUp({
                content: `${Emojis.Echo.Warning} | No se encontraron advertencias.`,
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setTitle("Advertencias")
            .setColor("#550000")
            .setDescription(
                warns
                    .map(
                        (warn, index) =>
                            `**${index + 1}.** ${
                                warn.reason
                            } - Advertido por: <@${warn.staffId}>`
                    )
                    .join("\n")
            );

        return await interaction.followUp({
            embeds: [embed]
        });
    }
};
