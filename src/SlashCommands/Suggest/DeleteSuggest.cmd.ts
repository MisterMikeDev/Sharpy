import { CommandInteraction, CacheType } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Suggest";
import { Emojis } from "../../Data/Emojis";

export const DeleteSuggestCommand = async ({
    Sharpy,
    interaction,
    messageSuggestId
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    messageSuggestId: string;
}) => {
    try {
        await Db.DeleteSuggestionByMessageId(Sharpy, messageSuggestId);

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | Sugerencia eliminada correctamente.`
        });
    } catch (error) {
        console.error(error);
        await interaction.followUp({
            content: `${Emojis.Util.No} | Ha ocurrido un error al eliminar la sugerencia.`
        });
    }
};
