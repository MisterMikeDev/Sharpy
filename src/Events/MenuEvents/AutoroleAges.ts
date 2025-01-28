import { GuildMember } from "discord.js";
import { MenuId } from "../../Helpers/Enums";
import { MenuEvent } from "../../Interfaces";

export const menuEvent: MenuEvent = {
    id: MenuId.AutoRoleAgeMenu,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const interactionMember = interaction.member as GuildMember;

        const AgeMap = {
            "24+": "1316147419653603428",
            "21-23": "1316147350099591188",
            "18-20": "1316147136114593942",
            "15-17": "1316135938606370906",
            "13-14": "1316135540189565039"
        };

        const ageRoleIds = Object.values(AgeMap);

        const selectedValue = interaction.values[0];
        const newRoleId = AgeMap[selectedValue];

        if (!newRoleId) {
            await interaction.followUp({
                content: `La edad seleccionada (${selectedValue}) no tiene un rol asignado.`,
                ephemeral: true
            });
            return;
        }

        try {
            await interactionMember.roles.remove(ageRoleIds);

            await interactionMember.roles.add(newRoleId);

            await interaction.followUp({
                content: `Se te ha asignado el rol de edad <@&${newRoleId}>`,
                ephemeral: true
            });
        } catch (error) {
            console.error("Error al asignar o eliminar roles:", error);
            await interaction.followUp({
                content:
                    "Hubo un problema al asignar el rol de edad. Por favor, contacta a un administrador.",
                ephemeral: true
            });
        }
    }
};
