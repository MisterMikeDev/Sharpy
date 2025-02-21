import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver
} from "discord.js";
import { SlashCommandStructure } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";
import { RegisterCommand } from "./Register.cmd";
import { ListCommand } from "./List.cmd";
import { PreviousCommand } from "./Previous.cmd";
import { NextCommand } from "./Next.cmd";
const { Subcommand } = ApplicationCommandOptionType;

export default new SlashCommandStructure({
    name: "birthday",
    description: "Sub SlashCommands de Cumpleaños.",
    usage: "/birthday <subcommand>",
    options: [
        {
            name: "register",
            description: "Registra tu cumpleaños.",
            type: Subcommand,
            options: [
                {
                    name: "day",
                    description: "Día de tu cumpleaños.",
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                },
                {
                    name: "month",
                    description: "Mes de tu cumpleaños.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: "Enero", value: "junuary" },
                        { name: "Febrero", value: "february" },
                        { name: "Marzo", value: "march" },
                        { name: "Abril", value: "april" },
                        { name: "Mayo", value: "may" },
                        { name: "Junio", value: "june" },
                        { name: "Julio", value: "july" },
                        { name: "Agosto", value: "august" },
                        { name: "Septiembre", value: "september" },
                        { name: "Octubre", value: "october" },
                        { name: "Noviembre", value: "november" },
                        { name: "Diciembre", value: "december" }
                    ]
                },
                {
                    name: "year",
                    description: "Año de tu cumpleaños.",
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                }
            ]
        },
        {
            name: "list",
            description: "Muestra la lista de cumpleaños.",
            type: Subcommand
        },
        {
            name: "previous",
            description: "Muestra los cumpleaños más reciente.",
            type: Subcommand
        },
        {
            name: "next",
            description: "Muestra los cumpleaños más próximos.",
            type: Subcommand
        }
    ],
    run: async ({ Sharpy, interaction }) => {
        if (!interaction.guildId)
            return await interaction.reply({
                content: `${Emojis.Util.No} | No se ha encontrado el servidor.`,
                ephemeral: true
            });

        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();
        const IntMap = {
            register: async () =>
                await RegisterCommand({ Sharpy, interaction, options: Int }),
            list: async () => await ListCommand({ Sharpy, interaction }),
            previous: async () => PreviousCommand({ Sharpy, interaction }),
            next: async () => await NextCommand({ Sharpy, interaction })
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
