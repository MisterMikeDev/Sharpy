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
import { DefinitiveBanApealCommand } from "./DefinitiveBanApeal.cmd";
import { PardonApealCommand } from "./PardonApeal.cmd";
const { Subcommand } = ApplicationCommandOptionType;
export default new SlashCommandStructure({
    name: "apeal",
    description: "Sub SlashCommands del apelaciones.",
    usage: "/apeal <subcommand>",
    options: [
        {
            name: "pardon",
            description: "Perdona a un usuario.",
            type: Subcommand,
            options: [
                {
                    name: "user",
                    description: "Usuario a perdonar.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        },
        {
            name: "definitive-ban",
            description: "Banea a un usuario de forma definitiva.",
            type: Subcommand,
            options: [
                {
                    name: "user",
                    description: "Usuario a banear.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        }
    ],
    run: async ({ Sharpy, interaction }) => {
        await interaction.deferReply();
        if (!interaction.guild) return;
        if (interaction.guild.id !== Config.DiscordBot.EchosOfTalent.apealServerId)
            return await interaction.followUp(
                `${Emojis.Util.No} | No puedes usar este comando en este servidor.`
            );

        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();

        const memberPermissions = interaction.member?.permissions;
        const requiredPermissions = [PermissionFlagsBits.Administrator];
        const requiredRoles = [
            Config.DiscordBot.EchosOfTalent.roles.PoderesMisticos,
            Config.DiscordBot.EchosOfTalent.roles.FounderApeal,
            Config.DiscordBot.EchosOfTalent.roles.DirectorApeal,
            Config.DiscordBot.EchosOfTalent.roles.AdminApeal,
            Config.DiscordBot.EchosOfTalent.roles.SupervisorApeal,
            Config.DiscordBot.EchosOfTalent.roles.ModeratorApeal
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
                content: `${Emojis.Util.No} | No tienes los permisos necesarios para ejecutar este comando.`,
                ephemeral: true
            });
        }

        const IntMap = {
            pardon: async () => {
                const user = Int.getUser("user", true);
                await PardonApealCommand({ Sharpy, interaction, user });
            },
            "definitive-ban": async () => {
                const user = Int.getUser("user", true);
                await DefinitiveBanApealCommand({ Sharpy, interaction, user });
            }
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
