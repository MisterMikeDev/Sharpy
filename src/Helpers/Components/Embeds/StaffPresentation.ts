import { EmbedBuilder, Message } from "discord.js";
import { Emojis } from "../../../Data/Emojis";
import { Sharpy } from "../../../Client";

export async function StaffPresentation({
    Sharpy,
    message
}: {
    Sharpy: Sharpy;
    message: Message<boolean>;
}) {
    const user = message.author;
    const messageContent = message.content;
    const userMember = await message.guild!.members.fetch(user.id);
    const userRoleColor = userMember.displayHexColor;

    const embed = new EmbedBuilder()
        .setAuthor({
            name: user.globalName!,
            iconURL: user.displayAvatarURL()
        })
        .setDescription(
            `# ${Emojis.Echo.Admin} Presentación de Staff ${Emojis.Echo.Admin}\n${messageContent}`
        )
        .setColor(userRoleColor)
        .setThumbnail(
            user.displayAvatarURL({
                size: 256
            })
        )
        .setFooter({
            text: `Echoes Of Talent | ${Sharpy.user!.username}`,
            iconURL: Sharpy.user!.displayAvatarURL()
        })
        .setTimestamp();

    return { embed };
}
