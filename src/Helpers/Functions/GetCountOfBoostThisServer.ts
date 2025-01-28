import {
    APIInteractionGuildMember,
    GuildMember,
    GuildMemberRoleManager
} from "discord.js";

const RoleVipId = "1307762166127923263";
const RoleAltaSociedadId = "1316791399156285572";

export function GetCountOfBoostThisServer(
    user: GuildMember | APIInteractionGuildMember
): number {
    if (!user) return 0;

    let hasRoleAltaSociedad = false;
    let hasRoleVip = false;

    if (user.roles instanceof GuildMemberRoleManager) {
        hasRoleAltaSociedad = user.roles.cache.has(RoleAltaSociedadId);
        hasRoleVip = user.roles.cache.has(RoleVipId);
    } else if (Array.isArray(user.roles)) {
        hasRoleAltaSociedad = user.roles.includes(RoleAltaSociedadId);
        hasRoleVip = user.roles.includes(RoleVipId);
    } else if (typeof user.roles === "bigint") {
        hasRoleAltaSociedad =
            (BigInt(user.roles) & BigInt(RoleAltaSociedadId)) ===
            BigInt(RoleAltaSociedadId);
        hasRoleVip = (BigInt(user.roles) & BigInt(RoleVipId)) === BigInt(RoleVipId);
    }

    if (hasRoleAltaSociedad) return 2;
    if (hasRoleVip) return 1;

    return 0;
}
