import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/LevelSystem";
import { Emojis } from "../../Data/Emojis";

export const CreateXpUserCommand = async ({
    Sharpy,
    interaction,
    userId
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    userId: string;
}) => {
    await Db.CreateUser(Sharpy, userId);

    await interaction.reply({
        content: `${Emojis.Util.Yes} | Se ha creado el usuario ${userId} en la base de datos.`,
        ephemeral: true
    });
};
