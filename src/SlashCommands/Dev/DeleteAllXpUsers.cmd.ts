import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/LevelSystem";
import { Emojis } from "../../Data/Emojis";

export const DeleteAllXpUsersCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    await Db.RemoveAllUsers(Sharpy);

    await interaction.reply({
        content: `${Emojis.Util.Yes} | Se han eliminado todos los usuarios de la base de datos.`,
        ephemeral: true
    });
};
