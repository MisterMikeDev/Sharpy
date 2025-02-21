import {
    CommandInteraction,
    CacheType,
    CommandInteractionOptionResolver,
    TextChannel
} from "discord.js";
import { Sharpy } from "../../Client";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";
import { Db } from "../../Helpers/Db/Birthday";

export const RegisterCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    await interaction.deferReply({ ephemeral: true });

    const day = options.getInteger("day", true);
    const month = options.getString("month", true) as Months;
    const year = options.getInteger("year", true);

    const currentYear = new Date().getFullYear();

    if (currentYear < year)
        return interaction.followUp({
            content: `${Emojis.Util.No} | No puedes registrar un cumpleaños en el futuro.`
        });

    if (currentYear - year < 13) {
        const reportChannel = (await Sharpy.channels.fetch(
            Config.DiscordBot.EchoesOfTalent.channels.ReportStaff
        )) as TextChannel;

        await reportChannel.send({
            content: `> ## El usuario **${interaction.user.globalName}** *(${interaction.user.id})* ha intentado registrar un cumpleaños con una edad menor a 13 años. ${Emojis.Echo.Warning}`
        });

        return interaction.followUp({
            content: `${Emojis.Util.No} | Debes tener al menos 13 años para usar Discord.`
        });
    }

    if (currentYear - year >= 100)
        return interaction.followUp({
            content: `${Emojis.Util.No} | No puedes registrar un cumpleaños de hace 100 años o más.`
        });

    const months = {
        january: 0,
        february: 1,
        march: 2,
        april: 3,
        may: 4,
        june: 5,
        july: 6,
        august: 7,
        september: 8,
        october: 9,
        november: 10,
        december: 11
    };

    const monthIndex = months[month];

    const birthday = new Date(year, monthIndex, day);

    try {
        const birthdayChannel = (await Sharpy.channels.fetch(
            Config.DiscordBot.EchoesOfTalent.channels.Birthdays
        )) as TextChannel;

        const b = await Db.RegisterBirthday(Sharpy, interaction.user.id, birthday);

        if (!b)
            return interaction.followUp({
                content: `${Emojis.Util.No} | No se ha podido registrar tu cumpleaños.`
            });

        const today = new Date();
        let userAge = today.getFullYear() - year;

        if (
            today.getMonth() < monthIndex ||
            (today.getMonth() === monthIndex && today.getDate() < day)
        ) {
            userAge--;
        }

        await birthdayChannel
            .send({
                content: `> ### <@${interaction.user.id}> ha registrado su cumpleaños para el **${day}/${month}/${year}**.`
            })
            .catch(() => {});

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | Tu cumpleaños ha sido registrado *(**${day}/${month}/${year}**, y tienes **${userAge}** años)*.`
        });
    } catch (error) {
        console.error(error);

        await interaction.followUp({
            content: `${Emojis.Util.No} | Ha ocurrido un error al registrar tu cumpleaños.`
        });
    }
};

type Months =
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december";
