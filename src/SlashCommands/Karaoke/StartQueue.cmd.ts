import { CacheType, CommandInteraction, GuildMember } from "discord.js";
import { Sharpy } from "../../Client";
import { Queue } from "../../Interfaces";
import { CheckIfUserIsInKaraokeVoiceChat, QueueEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const StartKaraokeCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const interactionChannel = interaction.channel;
    const interactionUser = interaction.user;

    if (!CheckIfUserIsInKaraokeVoiceChat(interaction.member as GuildMember))
        return await interaction.followUp({
            content: `${Emojis.Util.No} | Debes estar en un canal de Karaoke para iniciar una cola.`,
            ephemeral: true
        });

    const currentQueue = Sharpy.queue.get(interactionChannel!.id);

    if (currentQueue) {
        if (currentQueue.list.length > 0) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Ya hay una cola en curso en este canal.`
            });
        }
        try {
            Sharpy.DeleteQueue(interactionChannel!.id);

            const intMsg = await interaction.editReply({
                content: `${Emojis.Util.Loading} | Reiniciando cola para el karaoke...`
            });

            await Sharpy.CreateQueue(interactionChannel!.id, intMsg!.id, []);

            if (!currentQueue) {
                return await interaction.followUp({
                    content: `${Emojis.Util.No} | Error al reiniciar el karaoke.`
                });
            }

            const { content, components, embed } = QueueEmbed(Sharpy, currentQueue);

            return await interaction.editReply({
                content,
                embeds: [embed],
                components: components
            });
        } catch (error) {
            console.error(error);
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Error al reiniciar el karaoke por ${interactionUser.username}`
            });
        }
    }

    try {
        const intMsg = await interaction.editReply({
            content: "Creando cola para el karaoke..."
        });

        await Sharpy.CreateQueue(interactionChannel!.id, intMsg!.id, []);

        const currentQueue = Sharpy.queue.get(interactionChannel!.id) as Queue;

        if (!currentQueue) {
            return await interaction.followUp({
                content: "Error al iniciar el karaoke."
            });
        }

        const { content, components, embed } = QueueEmbed(Sharpy, currentQueue);

        await interaction.editReply({
            content,
            embeds: [embed],
            components: components
        });
    } catch (error) {
        console.error(error);
        await interaction.followUp({
            content: `Error al iniciar el karaoke por ${interactionUser.username}`
        });
    }
};
