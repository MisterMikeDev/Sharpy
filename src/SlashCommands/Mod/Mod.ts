import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver
} from "discord.js";
import { SlashCommandStructure } from "../../Interfaces";
import { TimeoutCommand } from "./Timeout.cmd";
import { UntimeoutCommand } from "./Untimeout.cmd";
import { BulkCommand } from "./Bulk.cmd";

export default new SlashCommandStructure({
    name: "mod",
    description: "Sub SlashCommands del Moderación.",
    usage: "/mod <subcommand>",
    options: [
        {
            name: "timeout",
            description: "Aplica un timeout a un usuario.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Usuario al que se le aplicará el timeout.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "time",
                    description: "Tiempo en formato 2s, 2m, 2h, 2d.",
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: "reason",
                    description: "Razón del timeout.",
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: "untimeout",
            description: "Quita el timeout a un usuario.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Usuario al que se le quitará el timeout.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        },
        {
            name: "kick",
            description: "Expulsa a un usuario del servidor.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Usuario que se expulsará del servidor.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "reason",
                    description: "Razón de la expulsión.",
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: "ban",
            description: "Banea a un usuario del servidor.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Usuario que se baneará del servidor.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "reason",
                    description: "Razón del ban.",
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: "unban",
            description: "Quita el ban a un usuario del servidor.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Usuario al que se le quitará el ban.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        },
        {
            name: "apeal",
            description: "Apela un ban.",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "report",
            description: "Reporta a un usuario.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Usuario que se reportará.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "reason",
                    description: "Razón del reporte.",
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: "warn",
            description: "Advierte a un usuario.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Usuario al que se le advertirá.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "reason",
                    description: "Razón de la advertencia.",
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: "unwarn",
            description: "Quita la ultima advertencia a un usuario.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Usuario al que se le quitará la advertencia.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        },
        {
            name: "bulk",
            description: "Elimina mensajes en masa.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "amount",
                    description: "Cantidad de mensajes a eliminar.",
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                },
                {
                    name: "type",
                    description: "Tipo de mensajes a eliminar.",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Todos",
                            value: "all"
                        },
                        {
                            name: "Solo del usuario",
                            value: "user"
                        },
                        {
                            name: "Solo de bots",
                            value: "bot"
                        },
                        {
                            name: "Solo de Sharpy",
                            value: "sharpy"
                        }
                    ]
                },
                {
                    name: "user",
                    description: "Usuario al que se le eliminarán los mensajes.",
                    type: ApplicationCommandOptionType.User
                }
            ]
        },
        {
            name: "lock",
            description: "Cierra un canal de texto.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Canal a cerrar.",
                    type: ApplicationCommandOptionType.Channel
                }
            ]
        }
    ],
    run: async ({ Sharpy, interaction }) => {
        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();
        const IntMap = {
            timeout: async () =>
                await TimeoutCommand({ Sharpy, interaction, options: Int }),
            untimeout: async () =>
                await UntimeoutCommand({ Sharpy, interaction, options: Int }),
            kick: async () => interaction.reply("Subcomando en desarrollo."),
            ban: async () => interaction.reply("Subcomando en desarrollo."),
            unban: async () => interaction.reply("Subcomando en desarrollo."),
            apeal: async () => interaction.reply("Subcomando en desarrollo."),
            report: async () => interaction.reply("Subcomando en desarrollo."),
            warn: async () => interaction.reply("Subcomando en desarrollo."),
            unwarn: async () => interaction.reply("Subcomando en desarrollo."),
            bulk: async () => BulkCommand({ Sharpy, interaction, options: Int }),
            lock: async () => interaction.reply("Subcomando en desarrollo.")
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.reply("No se ha encontrado el subcomando.");
    }
});
