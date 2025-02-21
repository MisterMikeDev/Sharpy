import { CommandInteraction, CacheType, EmbedBuilder } from "discord.js";
import { Sharpy } from "../../Client";
import { Emojis } from "../../Data/Emojis";
import { Db } from "../../Helpers/Db/Birthday";

export const ListCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    try {
        const birthdays = await Db.GetBirthdays(Sharpy);

        if (!birthdays.length)
            return interaction.reply({
                content: `${Emojis.Util.No} | No hay cumpleaños registrados.`,
                ephemeral: true
            });

        const sortedBirthdays = birthdays.sort(() => Math.random() - 0.5);

        const selectedBirthdays = sortedBirthdays.slice(0, 25);

        const embed = new EmbedBuilder()
            .setTitle("🎂 Lista de Cumpleaños 🎉")
            .setColor("#550000")
            .setDescription(
                selectedBirthdays
                    .map((b, index) => {
                        const date = new Date(b.date);
                        return `**${index + 1}.** <@${b.userId}> - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    })
                    .join("\n")
            )
            .setFooter({
                text: "Echoes Of Talent | Lista de Cumpleaños",
                iconURL: Sharpy.user!.displayAvatarURL()
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: `${Emojis.Util.No} | Ha ocurrido un error al obtener la lista de cumpleaños.`,
            ephemeral: true
        });
    }
};
