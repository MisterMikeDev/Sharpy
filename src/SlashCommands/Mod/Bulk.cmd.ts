import {
    CacheType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField,
    TextChannel
} from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";
import { Sharpy } from "../../Client";

export const BulkCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    await interaction.deferReply({ ephemeral: true });
    const amount = clamp(options.getInteger("amount", true), 1, 100);
    const type = options.getString("type") as "all" | "user" | "bot" | "sharpy" | null;
    const user = options.getUser("user");

    const memberPermissions = interaction.member?.permissions;
    const requiredPermissions = [PermissionFlagsBits.Administrator];
    const requiredRoles = [
        Config.DiscordBot.EchoesOfTalent.roles.PoderesMisticos,
        Config.DiscordBot.EchoesOfTalent.roles.Founder,
        Config.DiscordBot.EchoesOfTalent.roles.Director,
        Config.DiscordBot.EchoesOfTalent.roles.Programador,
        Config.DiscordBot.EchoesOfTalent.roles.Admin,
        Config.DiscordBot.EchoesOfTalent.roles.Supervisor,
        Config.DiscordBot.EchoesOfTalent.roles.Moderator
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
        return await interaction.reply({
            content: `${Emojis.Util.No} | No tienes los permisos necesarios para ejecutar este comando.`,
            ephemeral: true
        });
    }

    const messages = await interaction.channel?.messages.fetch({
        limit: Math.min(amount, 100)
    });

    if (!messages) {
        return await interaction.editReply({
            content: `${Emojis.Util.No} | No se encontraron mensajes.`
        });
    }

    const filteredMessages = messages.filter((message) => {
        if (type === "all") return true;
        if (type === "user") return user ? message.author.id === user.id : false;
        if (type === "bot") return message.author.bot;
        if (type === "sharpy") return message.author.id === Sharpy.user!.id;
        return false;
    });

    if (filteredMessages.size > 0) {
        await (interaction.channel as TextChannel).bulkDelete(filteredMessages, true);
    }

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Se han eliminado **${filteredMessages.size}** mensajes.`,
        ephemeral: true
    });
};

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
