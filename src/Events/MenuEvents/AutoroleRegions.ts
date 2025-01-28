import { GuildMember } from "discord.js";
import { MenuId } from "../../Helpers/Enums";
import { MenuEvent } from "../../Interfaces";

export const menuEvent: MenuEvent = {
    id: MenuId.AutoRoleRegionMenu,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const interactionMember = interaction.member as GuildMember;

        const RegionMap = {
            norteamérica: "1316138664249655356",
            europa: "1316139037647441970",
            suramérica: "1316156694962765936",
            centroamérica: "1316951420230172693"
        };

        const regionRoleIds = Object.values(RegionMap);

        const selectedValue = interaction.values[0];
        const newRoleId = RegionMap[selectedValue];

        if (!newRoleId) {
            await interaction.followUp({
                content: `La región seleccionada (${selectedValue}) no tiene un rol asignado.`,
                ephemeral: true
            });
            return;
        }

        try {
            await interactionMember.roles.remove(regionRoleIds);

            await interactionMember.roles.add(newRoleId);

            await interaction.followUp({
                content: `Se te ha asignado el rol de región <@&${newRoleId}>.`,
                ephemeral: true
            });
        } catch (error) {
            console.error("Error al asignar o eliminar roles:", error);
            await interaction.followUp({
                content:
                    "Hubo un problema al asignar el rol de región. Por favor, contacta a un administrador.",
                ephemeral: true
            });
        }
    }
};
