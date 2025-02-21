import {
    CommandInteraction,
    CacheType,
    TextChannel,
    Message,
    CommandInteractionOptionResolver,
    User
} from "discord.js";
import { Sharpy } from "../../Client";
import { BoostMessageEmbed } from "../../Helpers";
import { Config } from "../../Data/Config";
import { Emojis } from "../../Data/Emojis";

export const SendLaggingBoostEmbedsCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    const type = options.getString("type") as "all" | "last" | "user";
    const user = options.getUser("user");

    const channel = (await Sharpy.channels.fetch(
        Config.DiscordBot.EchoesOfTalent.channels.Boost
    )) as TextChannel;

    const messages = (await channel!.messages.fetch())
        .filter((msg: Message) => msg.system)
        .reverse();

    const usersWithoutRepeat = new Set<User>();

    messages.forEach((msg: Message) => {
        const userId = msg.author.id;
        const user = Sharpy.users.cache.get(userId);
        if (!user) return;
        usersWithoutRepeat.add(user);
    });

    if (type === "last") {
        let lastUser: User | undefined;
        usersWithoutRepeat.forEach((u) => {
            lastUser = u;
        });

        if (lastUser) {
            const { content, embed } = BoostMessageEmbed(Sharpy, lastUser);

            await channel.send({
                content,
                embeds: [embed],
                allowedMentions: { parse: ["users"] }
            });
        }
    } else if (type === "user" && user) {
        const cachedUser = Sharpy.users.cache.get(user.id);
        if (cachedUser) {
            const { content, embed } = BoostMessageEmbed(Sharpy, cachedUser);

            await channel.send({
                content,
                embeds: [embed],
                allowedMentions: { parse: ["users"] }
            });
        }
    } else if (type === "all") {
        usersWithoutRepeat.forEach(async (user) => {
            const { content, embed } = BoostMessageEmbed(Sharpy, user);

            await channel.send({
                content,
                embeds: [embed],
                allowedMentions: { parse: ["users"] }
            });
        });
    }

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embeds de Boost enviados correctamente.`
    });
};
