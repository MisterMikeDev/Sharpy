import {
    CommandInteraction,
    CacheType,
    CommandInteractionOptionResolver
} from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Apeals";
import { Emojis } from "../../Data/Emojis";

export const CreatePreApealCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    const userId = options.getString("user-id", true);
    const timeNeededToAppeal = options.getString("time", true);
    const reason = options.getString("reason", true);
    const guild = interaction.guild!;

    const member = guild.members.cache.get(userId);
    if (!member) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No se ha encontrado al usuario en el servidor.`,
            ephemeral: true
        });
    }

    try {
        const preApeal = await Db.GetPreApealByUserId(Sharpy, userId);

        if (preApeal)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Ya existe una pre-apelación para **${member.user.globalName}**.`
            });

        const newPreApeal = await Db.CreatePreApeal(Sharpy, {
            userId: member.id,
            reason,
            timeNeededToApeal: FormatTime(timeNeededToAppeal)
        });

        if (!newPreApeal) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No se pudo crear la pre-apelación.`
            });
        }

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | Se ha creado una pre-apelación para **${member.user.tag}** con un tiempo de espera de **${FormatTimeToText(newPreApeal.timeNeededToApeal)}**.`
        });
    } catch (error) {
        console.error(`Error al crear la pre-apelación: ${error}`);
        await interaction.followUp({
            content: `${Emojis.Util.No} | No se pudo crear la pre-apelación.`
        });
    }
};

function FormatTime(time: string): number {
    const minTime = 1000 * 60 * 5; // 5 minutos
    const defaultTime = 1000 * 60 * 60 * 24 * 3; // 3 días
    const maxTime = 1209600000; // 14 días

    const regex = /^(\d+)(s|m|h|d)$/;
    const match = time.match(regex);
    if (!match) return defaultTime;

    const amount = parseInt(match[1]);
    const type = match[2];
    let t = defaultTime;

    switch (type) {
        case "s":
            t = amount * 1000;
            break;
        case "m":
            t = amount * 60000;
            break;
        case "h":
            t = amount * 3600000;
            break;
        case "d":
            t = amount * 86400000;
            break;
        default:
            t = defaultTime;
    }

    return Math.max(minTime, Math.min(t, maxTime));
}

function FormatTimeToText(milliseconds: number): string {
    const days = Math.floor(milliseconds / 86400000);
    milliseconds %= 86400000;

    const hours = Math.floor(milliseconds / 3600000);
    milliseconds %= 3600000;

    const minutes = Math.floor(milliseconds / 60000);

    const parts: string[] = [];
    if (days > 0) parts.push(`${days} día${days > 1 ? "s" : ""}`);
    if (hours > 0) parts.push(`${hours} hora${hours > 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes} minuto${minutes > 1 ? "s" : ""}`);

    return parts.join(", ");
}
