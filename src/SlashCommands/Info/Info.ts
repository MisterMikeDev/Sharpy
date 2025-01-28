import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver
} from "discord.js";
import { SlashCommandStructure } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";
import { StaffCommand } from "./Staff.cmd";
import { StaffCategory } from "../../Interfaces/Other/StaffCategory";
const { Subcommand } = ApplicationCommandOptionType;

export default new SlashCommandStructure({
    name: "info",
    description: "Sub SlashCommands de Informacion.",
    usage: "/info <subcommand>",
    options: [
        {
            name: "staff",
            description: "Muestra los integrantes del staff de cada categoría.",
            type: Subcommand,
            options: [
                {
                    name: "category",
                    description:
                        "Categoría de la que quieres ver los integrantes del staff.",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Founders",
                            value: "founders"
                        },
                        {
                            name: "Directores",
                            value: "directores"
                        },
                        {
                            name: "Equipo de Desarrollo",
                            value: "equipo-de-desarrollo"
                        },
                        {
                            name: "Equipo de Diseño",
                            value: "equipo-de-diseño"
                        },
                        {
                            name: "Equipo de Soporte",
                            value: "equipo-de-soporte"
                        },
                        {
                            name: "Equipo de Eventos",
                            value: "equipo-de-eventos"
                        },
                        {
                            name: "Equipo de Moderación",
                            value: "equipo-de-moderacion"
                        }
                    ]
                }
            ]
        }
    ],
    run: async ({ Sharpy, interaction }) => {
        await interaction.deferReply();

        if (!interaction.guildId)
            return await interaction.followUp(
                `${Emojis.Util.No} | No se ha encontrado el servidor.`
            );

        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();
        const IntMap = {
            staff: async () =>
                await StaffCommand({
                    Sharpy,
                    interaction,
                    category: Int.getString("category") as StaffCategory | undefined
                })
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
