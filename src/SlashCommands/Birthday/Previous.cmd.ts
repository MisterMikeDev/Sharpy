import { CommandInteraction, CacheType } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Birthday";
import { Emojis } from "../../Data/Emojis";

export const PreviousCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    await interaction.deferReply();

    const birthdays = await Db.GetBirthdays(Sharpy);

    if (!birthdays.length) {
        return interaction.followUp({
            content: `${Emojis.Util.No} | No hay cumpleaños registrados.`
        });
    }

    const today = new Date();

    const sortedBirthdays = birthdays
        .map((b) => ({
            userId: b.userId,
            date: new Date(today.getFullYear(), b.date.getMonth(), b.date.getDate())
        }))
        .sort((a, b) => {
            const diffA = a.date <= today ? today.getTime() - a.date.getTime() : Infinity;
            const diffB = b.date <= today ? today.getTime() - b.date.getTime() : Infinity;
            return diffA - diffB;
        })
        .slice(0, 5);

    if (!sortedBirthdays.length) {
        return interaction.followUp({
            content: `${Emojis.Util.No} | No hay cumpleaños recientes en este año.`
        });
    }

    const birthdayList = sortedBirthdays
        .map(
            (b, i) =>
                `**${i + 1}.** <@${b.userId}> - 📅 ${b.date.getDate()}/${b.date.getMonth() + 1}`
        )
        .join("\n");

    await interaction.followUp({
        content: `📅 **Últimos 5 cumpleaños recientes:**\n${birthdayList}`
    });
};
