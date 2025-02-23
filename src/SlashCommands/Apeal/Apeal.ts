import { SlashCommandStructure } from "../../Interfaces";
import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver,
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField
} from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";
import { ShowApealsCommand } from "./ShowApeals.cmd";
import { RemoveApealCommand } from "./RemoveApeal.cmd";
import { CreatePreApealCommand } from "./CreatePreApeal.cmd";
const { Subcommand } = ApplicationCommandOptionType;
export default new SlashCommandStructure({
    name: "apeal",
    description: "Sub SlashCommands del apelaciones.",
    usage: "/apeal <subcommand>",
    options: [
        {
            name: "show-apeals",
            description: "Muestra las apelaciones pendientes.",
            type: Subcommand,
            options: [
                {
                    name: "type",
                    description: "El tipo de apelaciones que quieres ver.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        {
                            name: "Pre-Apelaciones",
                            value: "pre-apeals"
                        },
                        {
                            name: "Apelaciones",
                            value: "apeals"
                        },
                        {
                            name: "Perdonados",
                            value: "pardoned"
                        }
                    ]
                },
                {
                    name: "page",
                    description: "La página que quieres ver.",
                    type: ApplicationCommandOptionType.Integer,
                    required: false
                },
                {
                    name: "user-id",
                    description: "El ID del usuario que quieres ver.",
                    type: ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        },
        {
            name: "remove-apeal",
            description: "Elimina una apelación o pre-apelación.",
            type: Subcommand,
            options: [
                {
                    name: "id",
                    description: "El ID de la apelación o pre-apelación.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "type",
                    description: "El tipo de apelación que quieres eliminar.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        {
                            name: "Pre-Apelación",
                            value: "pre-apeal"
                        },
                        {
                            name: "Apelación",
                            value: "apeal"
                        }
                    ]
                }
            ]
        },
        {
            name: "create-pre-apeal",
            description: "Crea una pre-apelación.",
            type: Subcommand,
            options: [
                {
                    name: "user-id",
                    description: "El ID del usuario.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "time",
                    description: "El tiempo que necesita esperar el usuario.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "reason",
                    description: "La razón de la pre-apelación.",
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

        const memberPermissions = interaction.member?.permissions;
        const requiredPermissions = [PermissionFlagsBits.Administrator];
        const requiredRoles = [
            Config.DiscordBot.EchoesOfTalent.roles.PoderesMisticos,
            Config.DiscordBot.EchoesOfTalent.roles.Founder,
            Config.DiscordBot.EchoesOfTalent.roles.FounderApeal,
            Config.DiscordBot.EchoesOfTalent.roles.Director,
            Config.DiscordBot.EchoesOfTalent.roles.DirectorApeal,
            Config.DiscordBot.EchoesOfTalent.roles.Admin,
            Config.DiscordBot.EchoesOfTalent.roles.AdminApeal
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

        if (!(hasRequiredRoles || hasRequiredPermissions)) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No tienes los permisos necesarios para ejecutar este comando.`,
                ephemeral: true
            });
        }

        const IntMap = {
            "show-apeals": async () => {
                await ShowApealsCommand({ Sharpy, interaction, options: Int });
            },
            "remove-apeal": async () => {
                await RemoveApealCommand({ Sharpy, interaction, options: Int });
            },
            "create-pre-apeal": async () => {
                await CreatePreApealCommand({ Sharpy, interaction, options: Int });
            }
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
