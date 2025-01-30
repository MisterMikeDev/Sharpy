import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/LevelSystem";
import { Emojis } from "../../Data/Emojis";

export const GetXpUserCommand = async ({
    Sharpy,
    interaction,
    userId
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    userId: string;
}) => {
    const User = await Db.GetUserByUserId(Sharpy, userId);

    if (!User) {
        await interaction.followUp({
            content: `${Emojis.Util.No} | El usuario con ID: ${userId} no tiene XP.`
        });
        return;
    }

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | El usuario <@${User.userId}> tiene ${User.textXp} XP y está en el nivel ${User.textLevel}.`,
        ephemeral: true
    });
};
