import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { Db } from "../../Helpers/Db/Apeals";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.CreateApeal,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const user = interaction.user;

        const currentDate = new Date();
        const currentTimestamp = currentDate.getTime();

        const userPreApeal = await Db.GetPreApealByUserId(Sharpy, user.id);

        if (!userPreApeal)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No tienes un baneo activo.`
            });

        // TimeNeededToApeal es el tiempo minimo que tiene que esperar para poder hacer una apelacion, si el tiempo actual es menor al tiempo que tiene que esperar, entonces no puede hacer una apelacion.
        const { timeNeededToApeal } = userPreApeal;

        const timeLeft = timeNeededToApeal - currentTimestamp;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            return await interaction.followUp({
                content: `${Emojis.Util.No} | No puedes crear una nueva apelacion todavia.\n> Necesitas esperar **${days}d ${hours}h ${minutes}m ${seconds}s**.`
            });
        }

        // await interaction.showModal();
    }
};
