import { CommandInteractionOptionResolver, Interaction } from "discord.js";
import { Event, ExtendedInteraction } from "../../Interfaces";
import { Db } from "../../Helpers/Db/Blacklist";

export const event: Event = {
    name: "interactionCreate",
    run: async (Sharpy, interaction: Interaction) => {
        if (!interaction.isCommand()) return;

        const userBlacklist = await Db.GetUserById(Sharpy, interaction.user.id);

        if (userBlacklist) {
            return await interaction.reply({
                content: "Has sido Blacklisteado.",
                ephemeral: true
            });
        } else {
            const SlashCommand = Sharpy.slashcommands.get(interaction.commandName);
            if (!SlashCommand) {
                interaction.reply({
                    content: "Este comando no existe.",
                    ephemeral: true
                });
            } else
                SlashCommand.run({
                    args: interaction.options as CommandInteractionOptionResolver,
                    Sharpy,
                    interaction: interaction as ExtendedInteraction
                });
        }
    }
};
