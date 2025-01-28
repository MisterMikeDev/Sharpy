import { Emojis } from "../../Data/Emojis";
import { ButtonsId, GetCountOfBoostThisServer } from "../../Helpers";
import { Db } from "../../Helpers/Db/Replic";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.VoteFourthParticipant,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const channel = interaction.channel!;
        const member = interaction.member!;

        const replic = await Db.GetReplicByChannel(Sharpy, channel.id);

        if (!replic)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No hay una réplica en este canal.`,
                ephemeral: true
            });

        if (replic.participants.includes(member.user.id))
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Los participantes no pueden votar.`,
                ephemeral: true
            });

        await Db.VoteReplic(Sharpy, {
            replicId: replic.id,
            userId: member.user.id,
            voteFor: 4,
            weight: GetCountOfBoostThisServer(member) >= 2 ? 2 : 1
        });

        await Sharpy.UpdateReplicInCurrentChannel(channel.id);
    }
};
