import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { Db } from "../../Helpers/Db/Replic";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.JoinReplic,
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

        if (replic.participants.includes(user.id))
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Ya estás participando en esta réplica.`,
                ephemeral: true
            });

        const { replic: replicJoined, error } = await Db.JoinReplic(
            Sharpy,
            replic.id,
            user.id
        );

        if (!replicJoined || error)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | ${error}`,
                ephemeral: true
            });

        await Sharpy.UpdateReplicInCurrentChannel(channel.id);
    }
};
