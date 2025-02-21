import { CommandInteraction, CacheType } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Birthday";
import { Emojis } from "../../Data/Emojis";

export const NextCommand = async ({
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
            const diffA = a.date >= today ? a.date.getTime() - today.getTime() : Infinity;
            const diffB = b.date >= today ? b.date.getTime() - today.getTime() : Infinity;
            return diffA - diffB;
        })
        .slice(0, 5);

    if (!sortedBirthdays.length) {
        return interaction.followUp({
            content: `${Emojis.Util.No} | No hay cumpleaños próximos en lo que queda del año.`
        });
    }

    const birthdayList = sortedBirthdays
        .map(
            (b, i) =>
                `**${i + 1}.** <@${b.userId}> - 📅 ${b.date.getDate()}/${b.date.getMonth() + 1}`
        )
        .join("\n");

    await interaction.followUp({
        content: `🎉 **Próximos 5 cumpleaños:**\n${birthdayList}`
    });
};
