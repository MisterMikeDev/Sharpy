import { GuildMember } from "discord.js";
import { MenuId } from "../../Helpers/Enums";
import { MenuEvent } from "../../Interfaces";

export const menuEvent: MenuEvent = {
    id: MenuId.AutoRoleGenderMenu,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const interactionMember = interaction.member as GuildMember;

        const GenderMap = {
            hombre: "1316137057822707823",
            mujer: "1316138014677929984",
            otro: "1316138102258925668"
        };

        const genderRoleIds = Object.values(GenderMap);

        const selectedValue = interaction.values[0];
        const newRoleId = GenderMap[selectedValue];

        if (!newRoleId) {
            await interaction.followUp({
                content: `El género seleccionado (${selectedValue}) no tiene un rol asignado.`,
                ephemeral: true
            });
            return;
        }

        try {
            await interactionMember.roles.remove(genderRoleIds);

            await interactionMember.roles.add(newRoleId);

            await interaction.followUp({
                content: `Se te ha asignado el rol de género <@&${newRoleId}>.`,
                ephemeral: true
            });
        } catch (error) {
            console.error("Error al asignar o eliminar roles:", error);
            await interaction.followUp({
                content:
                    "Hubo un problema al asignar el rol de género. Por favor, contacta a un administrador.",
                ephemeral: true
            });
        }
    }
};
