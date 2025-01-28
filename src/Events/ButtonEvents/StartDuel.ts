import { GuildMember } from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { ButtonsId, CheckIfUserIsInKaraokeVoiceChat } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";
import { TurnType } from "../../Interfaces/Other/Duel";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.StartDuel,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const channel = interaction.message.channel;
        const user = interaction.user!;

        const currentDuel = Sharpy.duel.get(channel.id);
        if (!currentDuel)
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | No hay un duelo en este canal.`
                })
                .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000));

        if (!CheckIfUserIsInKaraokeVoiceChat(interaction.member as GuildMember))
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Debes estar en un canal de Karaoke para participar en un duelo.`,
                ephemeral: true
            });

        const duelStatus = currentDuel.currentTurn;
        const challenger = currentDuel.challenger!;
        const rival = currentDuel.rival!;

        if (challenger.id !== user.id && rival.id !== user.id)
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | No puedes iniciar un duelo que no es tuyo.`
                })
                .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000));

        if (duelStatus !== 1)
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | El duelo ya ha comenzado.`
                })
                .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000));

        const modifiedDuel = {
            ...currentDuel,
            currentTurn: 2 as TurnType
        };

        Sharpy.ModifyDuel(channel.id, modifiedDuel);

        await interaction
            .followUp({
                content: `${Emojis.Util.Yes} | El duelo entre <@${challenger.id}> y <@${rival.id}> ha comenzado.`
            })
            .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000));

        Sharpy.UpdateDuelInCurrentChannel(channel.id);
    }
};
