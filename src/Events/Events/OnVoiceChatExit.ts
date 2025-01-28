import { ChannelType, Message, TextChannel, VoiceState } from "discord.js";
import { Event } from "../../Interfaces";
import { TurnType } from "../../Interfaces/Other/Duel";
import { Db } from "../../Helpers/Db/Replic";
import { sleep } from "../../Helpers";

export const event: Event = {
    name: "voiceStateUpdate",
    run: async (Sharpy, oldMember: VoiceState, newMember: VoiceState) => {
        const oldChannel = oldMember.channel;
        const newChannel = newMember.channel;

        const oldChannelType = oldChannel?.type;
        const newChannelType = newChannel?.type;

        if (!(oldChannelType === ChannelType.GuildVoice && newChannelType === undefined))
            return;

        const userId = oldMember.member!.id;

        Sharpy.queue.forEach(async (queue) => {
            const index = queue.list.findIndex((user) => user.id === userId);

            if (index === -1) return;

            queue.list.splice(index, 1);

            await Sharpy.UpdateQueueInCurrentChannel(queue.id);
        });

        Sharpy.duel.forEach(async (duel) => {
            const duelChannel = duel.id;
            const challenger = duel.challenger!;
            const rival = duel.rival!;

            if ([0, 5].includes(duel.currentTurn)) return;

            if (challenger.id === userId || rival.id === userId) {
                await Sharpy.ModifyDuel(duelChannel, {
                    ...duel,
                    challenger: challenger.id === userId ? null : challenger,
                    rival: rival.id === userId ? null : rival,
                    currentTurn: 5 as TurnType
                });

                await Sharpy.UpdateDuelInCurrentChannel(duel.id);

                const channel = (await Sharpy.channels.fetch(duel.id)) as TextChannel;

                await channel
                    .send(
                        `🎤 El usuario <@${userId}> ha salido del canal de voz y fue descalificado, su oponente <@${
                            challenger.id === userId ? rival.id : challenger.id
                        }> es el ganador.`
                    )
                    .then((msg: Message) =>
                        setTimeout(() => msg.delete().catch(() => {}), 10000)
                    );

                await Sharpy.DeleteDuel(duel.id);
            }
        });

        Db.GetReplicWhereUserParticipate(Sharpy, userId).then(async (replic) => {
            if (!replic) return;

            const replicId = replic.id;

            const runAwayReplic = await Db.RunAwayReplic(Sharpy, replicId, userId);

            await Sharpy.UpdateReplicInCurrentChannel(runAwayReplic!.channelId);

            sleep(5000)
                .then(
                    async () =>
                        await Db.RemoveReplicById(Sharpy, replicId).catch(() => {})
                )
                .catch(() => {});
        });
    }
};
