import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import {
    ColorActionRows,
    HobbiesActionRows,
    MusicGenreActionRows,
    MusicalSpecialistActionRows
} from "../Buttons/Autoroles";

export const AutoRoleColorEmbed = (Sharpy: Sharpy) => {
    const ColorAutoRoleEmbed = new EmbedBuilder()
        .setTitle("Autoroles de Colores")
        .setDescription("Selecciona el color con el que te identifiques.")
        .setColor("#b1049a")
        .setFooter({
            iconURL: Sharpy.user!.displayAvatarURL(),
            text: "Echoes of Talent | Autorol de Colores"
        });
    const ColorComponents = ColorActionRows;
    return { ColorAutoRoleEmbed, ColorComponents };
};

export const AutoRoleMusicalSpecialistEmbed = (Sharpy: Sharpy) => {
    const MusicalSpecialistEmbed = new EmbedBuilder()
        .setTitle("Especialidades Musicales")
        .setDescription("Selecciona la especialidad musical que más te guste.")
        .setColor("#b1049a")
        .setFooter({
            iconURL: Sharpy.user!.displayAvatarURL(),
            text: "Echoes of Talent | Especialidades Musicales"
        });
    const MusicalSpecialistComponents = MusicalSpecialistActionRows;
    return { MusicalSpecialistEmbed, MusicalSpecialistComponents };
};

export const AutoRoleHobbiesEmbed = (Sharpy: Sharpy) => {
    const HobbiesAutoRoleEmbed = new EmbedBuilder()
        .setTitle("Autoroles de Hobbies")
        .setDescription("Selecciona el Hobby que más te guste.")
        .setColor("#b1049a")
        .setFooter({
            iconURL: Sharpy.user!.displayAvatarURL(),
            text: "Echoes of Talent | Autorol de Hobbies"
        });
    const HobbiesComponents = HobbiesActionRows;
    return { HobbiesAutoRoleEmbed, HobbiesComponents };
};

export const AutoRoleMusicalGenderEmbed = (Sharpy: Sharpy) => {
    const MusicalGenderAutoRoleEmbed = new EmbedBuilder()
        .setTitle("Autoroles de Géneros Musicales")
        .setDescription("Selecciona el género musical que más te guste.")
        .setColor("#b1049a")
        .setFooter({
            iconURL: Sharpy.user!.displayAvatarURL(),
            text: "Echoes of Talent | Autorol de Géneros Musicales"
        });
    const MusicGenreComponents = MusicGenreActionRows;
    return { MusicalGenderAutoRoleEmbed, MusicGenreComponents };
};
