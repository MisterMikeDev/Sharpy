import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { ButtonEvent, Duel } from "../../Interfaces";
import { TurnType } from "../../Interfaces/Other/Duel";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.EndTurn,
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

        const currentTurn = currentDuel.currentTurn;

        if (currentTurn === 0 || currentTurn === 1)
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | El duelo aún no ha comenzado.`
                })
                .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000));

        if (currentTurn === 4 || currentTurn === 5)
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | El duelo ya ha finalizado.`
                })
                .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000));

        const challenger = currentDuel.challenger!;
        const rival = currentDuel.rival!;

        if (
            (challenger.id !== user.id && currentTurn === 2) ||
            (rival.id !== user.id && currentTurn === 3)
        )
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | No puedes finalizar un turno que no es tuyo.`
                })
                .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000));

        let modifiedDuel: Duel;
        if (currentTurn === 2) {
            modifiedDuel = {
                ...currentDuel,
                currentTurn: 3 as TurnType
            };

            await interaction
                .followUp({
                    content: `${Emojis.Util.Yes} | Turno finalizado, ahora es el turno de <@${rival.id}>.`
                })
                .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000))
                .catch(() => {});
        } else if (currentTurn === 3) {
            modifiedDuel = {
                ...currentDuel,
                currentTurn: 4 as TurnType
            };

            await interaction
                .followUp({
                    content: `${Emojis.Util.Yes} | Turno finalizado, ahora pasamos a las votaciones.`
                })
                .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000));

            Sharpy.emit("voteDuelStart", channel);
        } else {
            modifiedDuel = {
                ...currentDuel,
                currentTurn: 5 as TurnType
            };

            return await interaction
                .followUp({
                    content: `${Emojis.Util.Yes} | Votaciones finalizadas, el duelo ha terminado.`
                })
                .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000));
        }

        Sharpy.ModifyDuel(channel.id, modifiedDuel);

        Sharpy.UpdateDuelInCurrentChannel(channel.id);
    }
};
