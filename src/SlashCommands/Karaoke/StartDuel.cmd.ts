import {
    CacheType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    Message
} from "discord.js";
import { Sharpy } from "../../Client";
import { Emojis } from "../../Data/Emojis";
import { CheckIfUserIsInKaraokeVoiceChat, DuelEmbed } from "../../Helpers";

export const StartDuelCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const id = interaction.channel!.id;
    let messageID: string | null = null;
    const challenger = interaction.user;
    const rival = (interaction.options as CommandInteractionOptionResolver).getUser(
        "rival"
    );

    if (!CheckIfUserIsInKaraokeVoiceChat(interaction.member as GuildMember))
        return await interaction.followUp({
            content: `${Emojis.Util.No} | Debes estar en un canal de Karaoke para iniciar un duelo.`,
            ephemeral: true
        });

    const currentDuel = Sharpy.duel.get(id);

    if (!rival)
        return interaction
            .followUp({
                content: `${Emojis.Util.No} | Debes mencionar a un rival para iniciar el duelo.`
            })
            .then((msg: Message) => setTimeout(() => msg.delete().catch(() => {}), 5000));
    else if (rival.id === challenger.id)
        return interaction
            .followUp({
                content: `${Emojis.Util.No} | No puedes iniciar un duelo contigo mismo.`
            })
            .then((msg: Message) => setTimeout(() => msg.delete().catch(() => {}), 5000));
    else if (rival.bot)
        return interaction
            .followUp({
                content: `${Emojis.Util.No} | No puedes iniciar un duelo con un bot.`
            })
            .then((msg: Message) => setTimeout(() => msg.delete().catch(() => {}), 5000));
    else if (currentDuel)
        return interaction
            .followUp({
                content: `${Emojis.Util.No} | Ya hay un duelo en curso en este canal.`
            })
            .then((msg: Message) => setTimeout(() => msg.delete().catch(() => {}), 5000));

    try {
        const int = await interaction.editReply({
            content: `Creando duelo entre <@${challenger.id}> y <@${rival.id}>...`
        });

        messageID = int.id;

        const duel = await Sharpy.CreateDuel(id, messageID, challenger, rival);

        const { content, embed, components } = await DuelEmbed(Sharpy, duel);

        await interaction.editReply({
            content,
            embeds: [embed],
            components
        });
    } catch (error) {
        console.error(error);
        return interaction
            .followUp({
                content: `${Emojis.Util.No} | Ha ocurrido un error al iniciar el duelo.`
            })
            .then((msg: Message) => setTimeout(() => msg.delete().catch(() => {}), 5000));
    }
};
