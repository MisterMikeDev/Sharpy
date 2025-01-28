import { Interaction } from "discord.js";
import { Event } from "../../Interfaces";
import { Db } from "../../Helpers/Db/Blacklist";

export const event: Event = {
    name: "interactionCreate",
    run: async (Sharpy, interaction: Interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        const userBlacklist = await Db.GetUserById(Sharpy, interaction.user.id);

        if (userBlacklist) {
            return await interaction.reply({
                content: "Has sido Blacklisteado.",
                ephemeral: true
            });
        }

        const BtnId = interaction.customId;

        const MenuEvent = Sharpy.menuevents.get(BtnId);
        if (!MenuEvent)
            return interaction.reply({
                content: "Este menu no esta registrado",
                ephemeral: true
            });

        MenuEvent.run(Sharpy, interaction);
    }
};
