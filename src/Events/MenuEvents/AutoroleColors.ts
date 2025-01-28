import { GuildMember } from "discord.js";
import { MenuId } from "../../Helpers/Enums";
import { MenuEvent } from "../../Interfaces";

export const menuEvent: MenuEvent = {
    id: MenuId.AutoRoleColorMenu,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const interactionMember = interaction.member as GuildMember;

        const ColorMap = {
            rojo: "1316146150700482560",
            azul: "1316146257722474547",
            verde: "1316146453604728902",
            amarillo: "1316146352123678841",
            naranja: "1316146534437355570",
            rosa: "1316146836142297138",
            morado: "1316146297492865084",
            blanco: "1316146958188154990"
        };

        const colorRoleIds = Object.values(ColorMap);

        const selectedValue = interaction.values[0];
        const newRoleId = ColorMap[selectedValue];

        if (!newRoleId) {
            await interaction.followUp({
                content: `El color seleccionado (${selectedValue}) no tiene un rol asignado.`,
                ephemeral: true
            });
            return;
        }

        try {
            await interactionMember.roles.remove(colorRoleIds);

            await interactionMember.roles.add(newRoleId);

            await interaction.followUp({
                content: `Se te ha asignado el rol de color <@&${newRoleId}>.`,
                ephemeral: true
            });
        } catch (error) {
            console.error("Error al asignar o eliminar roles:", error);
            await interaction.followUp({
                content:
                    "Hubo un problema al asignar el rol de color. Por favor, contacta a un administrador.",
                ephemeral: true
            });
        }
    }
};
