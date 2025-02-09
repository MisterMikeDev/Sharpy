import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/LevelSystem";
import { Emojis } from "../../Data/Emojis";

const removeTextXp = async (
    Sharpy: Sharpy,
    interaction: CommandInteraction<CacheType>,
    userId: string,
    xp: number
) => {
    const { leveledDown, level } = await Db.RemoveXpToUser(Sharpy, userId, xp);
    const member = await interaction.guild!.members.fetch(userId);

    if (leveledDown) {
        Sharpy.emit("userLevelDown", {
            member,
            type: "text",
            level
        });
    }

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Se han eliminado ${xp} puntos de experiencia de texto al usuario con la ID: ${userId}.`
    });
};

const removeVoiceXp = async (
    Sharpy: Sharpy,
    interaction: CommandInteraction<CacheType>,
    userId: string,
    xp: number
) => {
    const { leveledDown, level } = await Db.RemoveXpToUser(Sharpy, userId, xp);
    const member = await interaction.guild!.members.fetch(userId);

    if (leveledDown) {
        Sharpy.emit("userLevelDown", {
            member,
            type: "voice",
            level
        });
    }

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Se han eliminado ${xp} puntos de experiencia de voz al usuario con la ID: ${userId}.`
    });
};

export const RemoveXpToUserCommand = async ({
    Sharpy,
    interaction,
    userId,
    xp,
    type
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    userId: string;
    xp: number;
    type: "text" | "voice";
}) => {
    const user = await Db.GetUserByUserId(Sharpy, userId);

    if (!user)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | El usuario con la ID: ${userId} no existe en la base de datos.`
        });

    try {
        if (type === "text") {
            await removeTextXp(Sharpy, interaction, userId, xp);
        } else if (type === "voice") {
            await removeVoiceXp(Sharpy, interaction, userId, xp);
        }
    } catch (error) {
        console.error(error);
        await interaction.followUp({
            content: `${Emojis.Util.No} | Ha ocurrido un error al eliminar los puntos de experiencia al usuario.`
        });
    }
};
