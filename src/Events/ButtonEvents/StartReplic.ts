import { GuildMember, Message } from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { ButtonsId, CheckIfUserIsInKaraokeVoiceChat } from "../../Helpers";
import { Db } from "../../Helpers/Db/Replic";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.StartReplic,
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

        if (replic.participants.filter((p) => p).length < 2)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No hay suficientes participantes para comenzar la réplica.`,
                ephemeral: true
            });

        if (!replic.participants.includes(user.id))
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Debes ser un participante para comenzar la réplica.`,
                ephemeral: true
            });

        if (!CheckIfUserIsInKaraokeVoiceChat(interaction.member as GuildMember))
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Debes estar en un canal de Karaoke para comenzar la réplica.`,
                ephemeral: true
            });

        await Db.UpdateReplicStatus(Sharpy, {
            replicId: replic.id,
            status: 1
        });

        await Sharpy.UpdateReplicInCurrentChannel(channel.id);

        await interaction
            .followUp({
                content: `${Emojis.Util.Yes} | La réplica ha comenzado.`
            })
            .then(async (msg: Message) =>
                setTimeout(() => msg.delete().catch(() => {}), 5000)
            );
    }
};
