import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import {
    AutoRoleColorEmbed,
    AutoRoleHobbiesEmbed,
    AutoRoleMusicalGenderEmbed,
    AutoRoleMusicalSpecialistEmbed
} from "../../Helpers";

export const AutorolesCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { ColorAutoRoleEmbed, ColorComponents } = AutoRoleColorEmbed(Sharpy);
    const { MusicalSpecialistEmbed, MusicalSpecialistComponents } =
        AutoRoleMusicalSpecialistEmbed(Sharpy);
    const { HobbiesAutoRoleEmbed, HobbiesComponents } = AutoRoleHobbiesEmbed(Sharpy);
    const { MusicGenreComponents, MusicalGenderAutoRoleEmbed } =
        AutoRoleMusicalGenderEmbed(Sharpy);

    await interaction.channel?.send({
        embeds: [ColorAutoRoleEmbed],
        components: ColorComponents as any
    });

    await interaction.channel?.send({
        embeds: [MusicalSpecialistEmbed],
        components: MusicalSpecialistComponents as any
    });

    await interaction.channel?.send({
        embeds: [HobbiesAutoRoleEmbed],
        components: HobbiesComponents as any
    });

    await interaction.channel?.send({
        embeds: [MusicalGenderAutoRoleEmbed],
        components: MusicGenreComponents as any
    });

    await interaction.followUp({
        content: "Embeds de Autoroles enviados correctamente."
    });
};
