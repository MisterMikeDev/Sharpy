import { Emojis } from "../../Data/Emojis";
import { ApealModal, ButtonsId, ResponseEmbed } from "../../Helpers";
import { Db } from "../../Helpers/Db/Apeals";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.CreateApeal,
    run: async (Sharpy, interaction) => {
        const user = interaction.user;

        const currentDate = new Date();
        const currentTimestamp = currentDate.getTime();

        const userPreApeal = await Db.GetPreApealByUserId(Sharpy, user.id);

        if (!userPreApeal) {
            return await interaction.reply({
                content: `${Emojis.Util.No} | No tienes un baneo activo.`,
                ephemeral: true
            });
        }

        const apeal = await Db.GetApealByUserId(Sharpy, interaction.user.id);

        if (apeal) {
            return await interaction.reply({
                embeds: [
                    ResponseEmbed({
                        type: "error",
                        message: "Ya tienes una apealación creada.",
                        emoji: Emojis.Util.No
                    })
                ],
                ephemeral: true
            });
        }

        const { timeNeededToApeal } = userPreApeal;

        const timeLeft = timeNeededToApeal - currentTimestamp;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            return await interaction.reply({
                content: `${Emojis.Util.No} | No puedes crear una nueva apelacion todavia.\n> Necesitas esperar **${days}d ${hours}h ${minutes}m ${seconds}s**.`,
                ephemeral: true
            });
        }

        await interaction.showModal(ApealModal);
    }
};
