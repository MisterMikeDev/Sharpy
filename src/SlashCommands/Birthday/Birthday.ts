import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver
} from "discord.js";
import { SlashCommandStructure } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";
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
    run: async ({ interaction }) => {
        if (!interaction.guildId)
            return await interaction.followUp(
                `${Emojis.Util.No} | No se ha encontrado el servidor.`
            );

        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();
        const IntMap = {
            register: async () => await interaction.followUp("register"),
            list: async () => await interaction.followUp("list"),
            previous: async () => await interaction.followUp("previous"),
            next: async () => await interaction.followUp("next")
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
