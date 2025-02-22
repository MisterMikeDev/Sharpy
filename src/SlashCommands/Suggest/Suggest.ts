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
import { DeleteSuggestCommand } from "./DeleteSuggest.cmd";
const { Subcommand } = ApplicationCommandOptionType;

export default new SlashCommandStructure({
    name: "suggest",
    description: "Sub SlashCommands de Suggest.",
    usage: "/suggest <subcommand>",
    options: [
        {
            name: "delete-suggest",
            description: "Eliminar una sugerencia.",
            type: Subcommand,
            options: [
                {
                    name: "message-suggest-id",
                    description: "ID del mensaje de la sugerencia.",
                    type: ApplicationCommandOptionType.String,
                    required: true
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

        const memberPermissions = interaction.member?.permissions;
        const requiredPermissions = [PermissionFlagsBits.Administrator];
        const requiredRoles = [
            Config.DiscordBot.EchoesOfTalent.roles.PoderesMisticos,
            Config.DiscordBot.EchoesOfTalent.roles.Founder,
            Config.DiscordBot.EchoesOfTalent.roles.Director,
            Config.DiscordBot.EchoesOfTalent.roles.Programador,
            Config.DiscordBot.EchoesOfTalent.roles.Admin,
            Config.DiscordBot.EchoesOfTalent.roles.Supervisor,
            Config.DiscordBot.EchoesOfTalent.roles.Moderator,
            Config.DiscordBot.EchoesOfTalent.roles.Ayudante,
            Config.DiscordBot.EchoesOfTalent.roles.Staff
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
                content: `${Emojis.Util.No} | No puedes iniciar una lista de karaoke si hay un duelo en curso.`
            });
        }

        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();
        const IntMap = {
            "delete-suggest": async () => {
                const messageSuggestId = Int.getString("message-suggest-id")!;
                await DeleteSuggestCommand({
                    Sharpy,
                    interaction,
                    messageSuggestId
                });
            }
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
