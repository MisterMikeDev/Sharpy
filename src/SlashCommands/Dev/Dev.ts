import { SlashCommandStructure } from "../../Interfaces";
import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver
} from "discord.js";
import { AddUserBlacklistCommand } from "./AddUser.cmd";
import { RemoveUserBlacklistCommand } from "./RemoveUser.cmd";
import { GetUserListBlacklistCommand } from "./GetUserList.cmd";
import { GetAllXpUsersCommand } from "./GetAllXpUsers.cmd";
import { GetXpUserCommand } from "./GetXpUser.cmd";
import { CreateXpUserCommand } from "./CreateXpUser.cmd";
import { DeleteXpUserCommand } from "./DeleteXpUser.cmd";
import { DeleteAllXpUsersCommand } from "./DeleteAllXpUsers.cmd";
import { AddXpToUserCommand } from "./AddXpToUser.cmd";
import { RemoveXpToUserCommand } from "./RemoveXpToUser.cmd";
import { Emojis } from "../../Data/Emojis";
import { ReportBugCommand } from "./ReportBug.cmd";
const { Subcommand } = ApplicationCommandOptionType;
export default new SlashCommandStructure({
    name: "dev",
    description: "Sub SlashCommands del Dev.",
    usage: "/dev <subcommand>",
    options: [
        {
            name: "add-blacklist",
            description: "Añade un usuario a la blacklist.",
            type: Subcommand,
            options: [
                {
                    name: "user-id",
                    description: "Usuario a añadir.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "reason",
                    description: "Razón del por qué se añade.",
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: "remove-blacklist",
            description: "Elimina un usuario de la blacklist.",
            type: Subcommand,
            options: [
                {
                    name: "user-id",
                    description: "Usuario a eliminar.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: "get-blacklist",
            description: "Obtiene la lista negra de usuarios.",
            type: Subcommand
        },
        {
            name: "get-all-xp-users",
            description: "Obtiene todos los usuarios de la base de datos de XP.",
            type: Subcommand
        },
        {
            name: "get-xp-user",
            description: "Obtiene un usuario de la base de datos de XP.",
            type: Subcommand,
            options: [
                {
                    name: "user-id",
                    description: "Usuario a obtener.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: "create-xp-user",
            description: "Crea un usuario en la base de datos de XP.",
            type: Subcommand,
            options: [
                {
                    name: "user-id",
                    description: "Usuario a añadir.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: "delete-xp-user",
            description: "Elimina un usuario de la base de datos de XP.",
            type: Subcommand,
            options: [
                {
                    name: "user-id",
                    description: "Usuario a eliminar.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: "delete-all-xp-users",
            description: "Elimina todos los usuarios de la base de datos de XP.",
            type: Subcommand
        },
        {
            name: "add-xp-to-user",
            description: "Añade XP a un usuario.",
            type: Subcommand,
            options: [
                {
                    name: "user-id",
                    description: "Usuario a añadir XP.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "xp",
                    description: "XP a añadir.",
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                },
                {
                    name: "type",
                    description: "Tipo de XP a añadir.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        {
                            name: "Texto",
                            value: "text"
                        },
                        {
                            name: "Voz",
                            value: "voice"
                        }
                    ]
                }
            ]
        },
        {
            name: "remove-xp-to-user",
            description: "Elimina XP a un usuario.",
            type: Subcommand,
            options: [
                {
                    name: "user-id",
                    description: "Usuario a eliminar XP.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "xp",
                    description: "XP a eliminar.",
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                },
                {
                    name: "type",
                    description: "Tipo de XP a eliminar.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        {
                            name: "Texto",
                            value: "text"
                        },
                        {
                            name: "Voz",
                            value: "voice"
                        }
                    ]
                }
            ]
        },
        {
            name: "report",
            description: "Reporta un bug al desarrollador.",
            type: Subcommand,
            options: [
                {
                    name: "bug",
                    description: "Bug a reportar.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    run: async ({ Sharpy, interaction }) => {
        await interaction.deferReply();
        if (!interaction.guild) return;
        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();
        if (interaction.user.id !== "437308398845952001" && subCommand === "report")
            return await interaction.followUp(
                `${Emojis.Util.No} | No tienes permiso para usar este comando.`
            );
        const IntMap = {
            "add-blacklist": async () => {
                const userId = Int.getString("user-id")!;
                const reason = Int.getString("reason") || "No especificado.";
                await AddUserBlacklistCommand({
                    Sharpy,
                    interaction,
                    userId,
                    reason
                });
            },
            "remove-blacklist": async () => {
                const userId = Int.getString("user-id")!;
                await RemoveUserBlacklistCommand({
                    Sharpy,
                    interaction,
                    userId
                });
            },
            "get-blacklist": async () =>
                GetUserListBlacklistCommand({ Sharpy, interaction }),
            "get-all-xp-users": async () => GetAllXpUsersCommand({ Sharpy, interaction }),
            "get-xp-user": async () => {
                const userId = Int.getString("user-id", true);
                await GetXpUserCommand({ Sharpy, interaction, userId });
            },
            "create-xp-user": async () => {
                const userId = Int.getString("user-id", true);
                await CreateXpUserCommand({ Sharpy, interaction, userId });
            },
            "delete-xp-user": async () => {
                const userId = Int.getString("user-id", true);
                await DeleteXpUserCommand({ Sharpy, interaction, userId });
            },
            "delete-all-xp-users": async () =>
                DeleteAllXpUsersCommand({ Sharpy, interaction }),
            "add-xp-to-user": async () => {
                const userId = Int.getString("user-id", true);
                const xp = Int.getInteger("xp", true);
                const type = Int.getString("type", true) as "text" | "voice";
                await AddXpToUserCommand({ Sharpy, interaction, userId, xp, type });
            },
            "remove-xp-to-user": async () => {
                const userId = Int.getString("user-id", true);
                const xp = Int.getInteger("xp", true);
                const type = Int.getString("type", true) as "text" | "voice";
                await RemoveXpToUserCommand({ Sharpy, interaction, userId, xp, type });
            },
            report: async () => {
                const bug = Int.getString("bug", true);
                await ReportBugCommand({ Sharpy, interaction, bug });
            }
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
