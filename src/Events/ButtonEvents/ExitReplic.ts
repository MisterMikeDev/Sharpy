import { ButtonsId } from "../../Helpers";
import { Db } from "../../Helpers/Db/Replic";
import { ButtonEvent } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.ExitReplic,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const channel = interaction.channel!;
        const user = interaction.user!;

        const replic = await Db.GetReplicByChannel(Sharpy, channel.id);

        if (!replic)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No hay una réplica en este canal.`,
                ephemeral: true
            });

        if (replic.replicStatus !== 0)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | La réplica ya ha comenzado.`,
                ephemeral: true
            });

        const { error } = await Db.ExitReplic(Sharpy, replic.id, user.id);

        if (error)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | ${error}`,
                ephemeral: true
            });

        await Sharpy.UpdateReplicInCurrentChannel(channel.id);
    }
};
