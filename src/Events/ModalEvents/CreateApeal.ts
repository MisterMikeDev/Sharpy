import { ApealCreatedEmbed, ModalsId, ResponseEmbed } from "../../Helpers";
import { ChannelType, PermissionsBitField, TextChannel, VoiceChannel } from "discord.js";
import { Config } from "../../Data/Config";
import { Db } from "../../Helpers/Db/Apeals";
import { Emojis } from "../../Data/Emojis";
import { ModalEvent } from "../../Interfaces";

export const modalEvent: ModalEvent = {
    id: ModalsId.ApealCreate,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();
        const EOT = Config.DiscordBot.EchoesOfTalent;
        const guild = Sharpy.guilds.cache.get(EOT.apealServerId);
        const inputSituacion = interaction.fields.fields.get(ModalsId.ApealSituation);
        const inputCommitment = interaction.fields.fields.get(ModalsId.ApealCommitment);

        const rolesThatCanModerateApeals = [
            EOT.roles.FounderApeal,
            EOT.roles.DirectorApeal,
            EOT.roles.SupervisorApeal,
            EOT.roles.ModeratorApeal,
            EOT.roles.StaffApeal
        ];

        let parentId: string;
        let textChannel: TextChannel;
        let voiceChannel: VoiceChannel;

        try {
            const category = await guild!.channels.create({
                name: EOT.prefixes.category.replace("$nick$", interaction.user.username),
                type: ChannelType.GuildCategory,
                permissionOverwrites: [
                    {
                        id: guild!.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    ...rolesThatCanModerateApeals.map((roleId) => ({
                        id: roleId,
                        allow: [PermissionsBitField.Flags.ViewChannel]
                    }))
                ]
            });

            parentId = category.id;

            textChannel = await guild!.channels.create({
                name: EOT.prefixes.apealText + interaction.user.id,
                type: ChannelType.GuildText,
                parent: parentId,
                permissionOverwrites: [
                    {
                        id: guild!.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    ...rolesThatCanModerateApeals.map((roleId) => ({
                        id: roleId,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory
                        ]
                    }))
                ]
            });

            voiceChannel = await guild!.channels.create({
                name: EOT.prefixes.apealVoice + interaction.user.id,
                type: ChannelType.GuildVoice,
                parent: parentId,
                permissionOverwrites: [
                    {
                        id: guild!.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    ...rolesThatCanModerateApeals.map((roleId) => ({
                        id: roleId,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.Connect,
                            PermissionsBitField.Flags.Speak
                        ]
                    }))
                ]
            });
        } catch {
            return await interaction.followUp({
                embeds: [
                    ResponseEmbed({
                        type: "error",
                        message: "No se pudo crear los canales de apealación.",
                        emoji: Emojis.Util.No
                    })
                ],
                ephemeral: true
            });
        }

        if (!textChannel || !voiceChannel)
            return await interaction.followUp({
                embeds: [
                    ResponseEmbed({
                        type: "error",
                        message: "No se pudo crear los canales de apealación.",
                        emoji: Emojis.Util.No
                    })
                ],
                ephemeral: true
            });

        try {
            const data: {
                userId: string;
                situation: string;
                commitment: string;
                categoryId: string;
                textApealChannelId: string;
                voiceApealChannelId: string;
            } = {
                userId: interaction.user.id,
                categoryId: parentId,
                commitment: inputCommitment!.value,
                situation: inputSituacion!.value,
                textApealChannelId: textChannel.id,
                voiceApealChannelId: voiceChannel.id
            };

            const apeal = await Db.CreateApeal(Sharpy, data);

            const { embed, components } = await ApealCreatedEmbed(Sharpy, apeal.id);

            await textChannel.send({
                content: `> ### <@${interaction.user.id}> tu apealación pronto será atendida por un miembro del <@&${Config.DiscordBot.EchoesOfTalent.roles.StaffApeal}>`,
                embeds: [embed],
                components,
                allowedMentions: {
                    users: [interaction.user.id],
                    roles: [Config.DiscordBot.EchoesOfTalent.roles.StaffApeal]
                }
            });

            await voiceChannel.send({
                content: `<@${interaction.user.id}> en este canal podrás hablar con un miembro del Staff de Echos Of Talent.`,
                allowedMentions: {
                    users: [interaction.user.id]
                }
            });

            await interaction.followUp({
                embeds: [
                    ResponseEmbed({
                        type: "success",
                        message: `Tu apealación ha sido creada con éxito, puedes verla en <#${textChannel.id}>.`,
                        emoji: Emojis.Util.Yes
                    })
                ],
                ephemeral: true
            });

            const preApeal = await Db.GetPreApealByUserId(Sharpy, interaction.user.id);
            if (preApeal) await Db.RemovePreApealById(Sharpy, interaction.user.id);
        } catch {
            await textChannel.delete().catch(() => {});
            await voiceChannel.delete().catch(() => {});

            await guild!.channels
                .fetch(parentId)
                .then(async (category) => {
                    if (category) await category.delete().catch(() => {});
                })
                .catch(() => {});

            return await interaction.followUp({
                embeds: [
                    ResponseEmbed({
                        type: "error",
                        message: "No se pudo crear la apealación.",
                        emoji: Emojis.Util.No
                    })
                ],
                ephemeral: true
            });
        }
    }
};
