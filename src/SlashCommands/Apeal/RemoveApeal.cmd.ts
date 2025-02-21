import {
    CommandInteraction,
    CacheType,
    CommandInteractionOptionResolver
} from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Apeals";
import { Emojis } from "../../Data/Emojis";

export const RemoveApealCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    const id = options.getString("id", true);
    const type = options.getString("type", true) as "pre-appeal" | "appeal";

    let appealExists = false;

    if (type === "pre-appeal") {
        const preAppeal = await Db.GetPreApealByUserId(Sharpy, id);
        if (preAppeal) {
            appealExists = true;
            await Db.RemovePreApealById(Sharpy, id);
        }
    } else if (type === "appeal") {
        const appeal = await Db.GetApealById(Sharpy, id);
        if (appeal) {
            appealExists = true;
            await Db.RemoveApealById(Sharpy, id);
        }
    }

    if (!appealExists) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} No se encontró una ${type === "pre-appeal" ? "pre-apelación" : "apelación"} con el ID \`${id}\`. Verifica que el ID sea correcto.`,
            ephemeral: true
        });
    }

    await interaction.followUp({
        content: `${Emojis.Util.Yes} Se ha eliminado correctamente la ${type === "pre-appeal" ? "pre-apelación" : "apelación"} con el ID \`${id}\`.`,
        ephemeral: true
    });
};
