import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver
} from "discord.js";
import { SlashCommandStructure } from "../../Interfaces";
import { TimeoutCommand } from "./Timeout.cmd";
import { UntimeoutCommand } from "./Untimeout.cmd";
import { BulkCommand } from "./Bulk.cmd";
import { BanCommand } from "./Ban.cmd";
import { ToggleLockCommand } from "./ToogleLock.cmd";
import { KickCommand } from "./Kick.cmd";
import { ReportCommand } from "./Report.cmd";
import { WarnCommand } from "./Warn.cmd";
import { UnWarnCommand } from "./UnWarn.cmd";
import { GetWarnsCommand } from "./GetWarns.cmd";
import { GetRandomUserCommand } from "./GetRandomUserInVoice.cmd";

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
                    type: ApplicationCommandOptionType.User
                },
                {
                    name: "user-id",
                    description: "ID del usuario que se baneará del servidor.",
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: "reason",
                    description: "Razón del ban.",
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: "time",
                    description:
                        "Tiempo para que el usuario pueda apelar en formato 2s, 2m, 2h, 2d.",
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: "can-apeal",
                    description: "Si el usuario puede apelar el ban.",
                    type: ApplicationCommandOptionType.Boolean
                }
            ]
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
                    name: "warn-id",
                    description: "ID de la advertencia a quitar.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: "get-warns",
            description: "Obtiene las advertencias de un usuario.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Usuario del que se obtendrán las advertencias.",
                    type: ApplicationCommandOptionType.User
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
                    required: true,
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
            name: "toogle-lock",
            description: "Bloquea o desbloquea un canal.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Canal a cerrar.",
                    type: ApplicationCommandOptionType.Channel
                }
            ]
        },
        {
            name: "get-random-user",
            description: "Obtiene un usuario aleatorio en un canal.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Canal para obtener el usuario.",
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
            kick: async () => await KickCommand({ Sharpy, interaction, options: Int }),
            ban: async () => await BanCommand({ Sharpy, interaction, options: Int }),
            report: async () =>
                await ReportCommand({ Sharpy, interaction, options: Int }),
            warn: async () => await WarnCommand({ Sharpy, interaction, options: Int }),
            unwarn: async () =>
                await UnWarnCommand({ Sharpy, interaction, options: Int }),
            "get-warns": async () =>
                await GetWarnsCommand({ Sharpy, interaction, options: Int }),
            bulk: async () => await BulkCommand({ Sharpy, interaction, options: Int }),
            "toogle-lock": async () =>
                await ToggleLockCommand({ Sharpy, interaction, options: Int }),
            "get-random-user": async () =>
                await GetRandomUserCommand({ Sharpy, interaction, options: Int })
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.reply("No se ha encontrado el subcomando.");
    }
});
