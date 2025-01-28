import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver,
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField
} from "discord.js";
import { SlashCommandStructure } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";
import { UnclaimCommand } from "./Unclaim.cmd";
import { GetTicketCommand } from "./GetTicket.cmd";
import { DeleteTicketCommand } from "./DeleteTicket.cmd";
const { Subcommand, String, User, Boolean } = ApplicationCommandOptionType;

export default new SlashCommandStructure({
    name: "tickets",
    description: "Sub SlashCommands de Tickets.",
    usage: "/tickets <subcommand>",
    options: [
        {
            name: "get",
            description: "Muestra los tickets.",
            type: Subcommand,
            options: [
                {
                    name: "all",
                    description: "Muestra todos los tickets.",
                    type: Boolean
                },
                {
                    name: "unresolved",
                    description: "Muestra los tickets sin resolver.",
                    type: Boolean
                },
                {
                    name: "claimed",
                    description: "Muestra los tickets asignados.",
                    type: Boolean
                },
                {
                    name: "by-author",
                    description: "Muestra los tickets de un autor.",
                    type: User
                },
                {
                    name: "by-id",
                    description: "Muestra un ticket por ID.",
                    type: String
                }
            ]
        },
        {
            name: "delete",
            description: "Elimina un ticket.",
            type: Subcommand,
            options: [
                {
                    name: "by-id",
                    description: "ID del ticket a eliminar.",
                    type: String
                },
                {
                    name: "by-author",
                    description: "Autor del ticket a eliminar.",
                    type: User
                },
                {
                    name: "all",
                    description: "Eliminar todos los tickets.",
                    type: Boolean
                }
            ]
        },
        {
            name: "unclaim",
            description: "Desasignate como Staff encargado de un ticket.",
            type: Subcommand
        }
    ],
    run: async ({ Sharpy, interaction }) => {
        if (!interaction.guildId)
            return await interaction.followUp(
                `${Emojis.Util.No} | No se ha encontrado el servidor.`
            );

        const memberPermissions = interaction.member?.permissions;
        const requiredPermissions = [PermissionFlagsBits.Administrator];
        const requiredRoles = [
            Config.DiscordBot.EchosOfTalent.roles.PoderesMisticos,
            Config.DiscordBot.EchosOfTalent.roles.Founder,
            Config.DiscordBot.EchosOfTalent.roles.Director,
            Config.DiscordBot.EchosOfTalent.roles.Programador,
            Config.DiscordBot.EchosOfTalent.roles.Admin,
            Config.DiscordBot.EchosOfTalent.roles.Supervisor,
            Config.DiscordBot.EchosOfTalent.roles.Moderator
        ];

        const permissions =
            memberPermissions instanceof PermissionsBitField
                ? memberPermissions
                : new PermissionsBitField(BigInt(memberPermissions as string));
        const hasRequiredPermissions = requiredPermissions.some((permission) =>
            permissions?.has(permission)
        );

        let hasRequiredRoles = false;
        if (interaction.member?.roles instanceof GuildMemberRoleManager) {
            hasRequiredRoles = interaction.member.roles.cache.some((role) =>
                requiredRoles.includes(role.id)
            );
        } else if (Array.isArray(interaction.member?.roles)) {
            hasRequiredRoles = interaction.member.roles.some((roleId) =>
                requiredRoles.includes(roleId)
            );
        }

        if (!hasRequiredPermissions && !hasRequiredRoles) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No tienes los permisos necesarios para ejecutar este comando.`
            });
        }

        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();
        const IntMap = {
            get: async () => {
                await interaction.deferReply();
                return await GetTicketCommand({
                    Sharpy,
                    interaction,
                    options: {
                        all: Int.getBoolean("all"),
                        unresolved: Int.getBoolean("unresolved"),
                        claimed: Int.getBoolean("claimed"),
                        byAuthor: Int.getUser("by-author"),
                        byId: Int.getString("by-id")
                    }
                });
            },
            delete: async () => {
                await interaction.deferReply();
                return await DeleteTicketCommand({
                    Sharpy,
                    interaction,
                    options: {
                        byId: Int.getString("by-id"),
                        byAuthor: Int.getUser("by-author"),
                        all: Int.getBoolean("all")
                    }
                });
            },
            unclaim: async () => {
                await interaction.deferReply({ ephemeral: true });
                return await UnclaimCommand({ Sharpy, interaction });
            }
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
