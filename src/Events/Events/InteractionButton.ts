import { ButtonInteraction, Interaction } from "discord.js";
import { Event } from "../../Interfaces";
import { Db } from "../../Helpers/Db/Blacklist";
import {
    ColorData,
    HobbiesData,
    MusicalSpecialistData,
    MusicGenreData
} from "../../Data/Data";
import { Emojis } from "../../Data/Emojis";

export const event: Event = {
    name: "interactionCreate",
    run: async (Sharpy, interaction: Interaction) => {
        if (!interaction.isButton()) return;

        const userBlacklist = await Db.GetUserById(Sharpy, interaction.user.id);
        if (userBlacklist) {
            return await interaction.reply({
                content: "Has sido Blacklisteado.",
                ephemeral: true
            });
        }

        const BtnId = interaction.customId;

        if (BtnId.startsWith("autorol")) {
            await interaction.deferUpdate();

            if (ColorData.some((role) => role.buttonId === BtnId)) {
                return await updateRole(interaction, ColorData);
            } else if (MusicalSpecialistData.some((role) => role.buttonId === BtnId)) {
                return await updateRole(interaction, MusicalSpecialistData);
            } else if (HobbiesData.some((role) => role.buttonId === BtnId)) {
                return await updateRole(interaction, HobbiesData);
            } else if (MusicGenreData.some((role) => role.buttonId === BtnId)) {
                return await updateRole(interaction, MusicGenreData);
            }

            return interaction.followUp({
                content: `${Emojis.Util.No} | El rol seleccionado no se encontró.`,
                ephemeral: true
            });
        } else {
            const ButtonEvent = Sharpy.buttonevents.get(BtnId);
            if (!ButtonEvent)
                return interaction.reply({
                    content: `${Emojis.Util.No} | Este boton no esta registrado`,
                    ephemeral: true
                });

            ButtonEvent.run(Sharpy, interaction);
        }
    }
};

async function updateRole(
    interaction: ButtonInteraction,
    roleData: typeof ColorData | typeof HobbiesData | typeof MusicGenreData
) {
    const BtnId = interaction.customId;
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member) return;

    const roleInfo = roleData.find((role) => role.buttonId === BtnId);
    if (!roleInfo) return;

    const roleId = roleInfo.id;
    const hasRole = member.roles.cache.has(roleId);

    if (roleData === ColorData) {
        const rolesToRemove = ColorData.map((role) => role.id).filter((id) =>
            member.roles.cache.has(id)
        );
        if (rolesToRemove.length > 0) {
            await member.roles.remove(rolesToRemove);
        }
    }

    if (!hasRole) {
        await member.roles.add(roleId);
        await interaction.followUp({
            content: `${Emojis.Util.Yes} | Se te ha asignado el rol <@&${roleId}>.`,
            ephemeral: true
        });
    } else {
        await member.roles.remove(roleId);
        await interaction.followUp({
            content: `${Emojis.Util.Yes} | Se te ha removido el rol <@&${roleId}>.`,
            ephemeral: true
        });
    }
}
