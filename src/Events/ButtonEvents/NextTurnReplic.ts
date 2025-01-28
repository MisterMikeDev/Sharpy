import { Message } from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { Db } from "../../Helpers/Db/Replic";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.NextTurnReplic,
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

        if (replic.replicStatus !== 1)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | La réplica no ha comenzado.`,
                ephemeral: true
            });

        const { currentTurn } = replic;

        if (replic.participants[currentTurn - 1] !== user.id)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No es tu turno.`,
                ephemeral: true
            });

        const nextParticipant = GetNextParticipantIndex(replic.participants, currentTurn);
        if (currentTurn >= 4 || !nextParticipant || nextParticipant === -1) {
            await Db.UpdateReplicStatus(Sharpy, {
                replicId: replic.id,
                status: 2
            });

            await Sharpy.UpdateReplicInCurrentChannel(channel.id);

            Sharpy.emit("voteReplicStart", channel);

            return await interaction
                .channel!.send({
                    content: `${Emojis.Util.Yes} | Proseguimos con la votación.`
                })
                .then(async (msg: Message) =>
                    setTimeout(() => msg.delete().catch(() => {}), 5000)
                );
        } else {
            await Db.UpdateReplicStatus(Sharpy, {
                replicId: replic.id,
                status: 1,
                currentTurn: nextParticipant + 1
            });

            await Sharpy.UpdateReplicInCurrentChannel(channel.id);

            await interaction
                .channel!.send({
                    content: `${Emojis.Util.Yes} | Ahora es turno de <@${replic.participants[nextParticipant]}>.`,
                    allowedMentions: { parse: ["users"] }
                })
                .then(async (msg: Message) =>
                    setTimeout(() => msg.delete().catch(() => {}), 5000)
                );
        }
    }
};

function GetNextParticipantIndex(
    participants: (string | null)[],
    currentTurn: number
): number {
    for (let i = currentTurn; i < participants.length; i++) {
        if (participants[i] !== null) {
            return i;
        }
    }
    return -1;
}
