import {
    CommandInteraction,
    CacheType,
    CommandInteractionOptionResolver,
    EmbedBuilder
} from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Apeals";
import { Emojis } from "../../Data/Emojis";

export const ShowApealsCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    const type = options.getString("type", true) as
        | "pre-appeals"
        | "appeals"
        | "pardoned";
    const page = Math.max(options.getInteger("page", false) ?? 1, 1);
    const userId = options.getString("user-id", false);

    let records: any[] = [];

    if (userId) {
        if (type === "pre-appeals") {
            const result = await Db.GetPreApealByUserId(Sharpy, userId);
            if (result) records.push(result);
        } else if (type === "appeals") {
            const result = await Db.GetApealByUserId(Sharpy, userId);
            if (result) records.push(result);
        } else if (type === "pardoned") {
            records = (await Db.GetPardonByUserId(Sharpy, userId)) ?? [];
        }
    } else {
        if (type === "pre-appeals") {
            records = (await Db.GetPreApeals(Sharpy)) ?? [];
        } else if (type === "appeals") {
            records = (await Db.GetApeals(Sharpy)) ?? [];
        } else if (type === "pardoned") {
            records = (await Db.GetPardons(Sharpy)) ?? [];
        }
    }

    if (records.length === 0) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No se encontraron apelaciones.`,
            ephemeral: true
        });
    }

    const itemsPerPage = 10;
    const totalPages = Math.ceil(records.length / itemsPerPage);
    if (page > totalPages) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | La página solicitada (${page}) no existe. Hay un total de ${totalPages} páginas.`,
            ephemeral: true
        });
    }

    const startIndex = (page - 1) * itemsPerPage;
    const paginatedRecords = records.slice(startIndex, startIndex + itemsPerPage);

    const embed = new EmbedBuilder()
        .setTitle(`📄 Lista de ${type.replace("-", " ")} (Página ${page}/${totalPages})`)
        .setColor("#0099ff");

    paginatedRecords.forEach((record, index) => {
        if (type === "pre-appeals") {
            embed.addFields({
                name: `🔹 Pre-Apelación #${startIndex + index + 1}`,
                value: `**ID:** ${record.id}\n**Razón:** ${record.reason}\n**Tiempo requerido para apelar:** ${record.timeNeededToApeal} días\n**Creado:** <t:${Math.floor(new Date(record.createdAt).getTime() / 1000)}:f>`,
                inline: false
            });
        } else if (type === "appeals") {
            embed.addFields({
                name: `🔹 Apelación #${startIndex + index + 1}`,
                value: `**ID:** ${record.id}\n**Situación:** ${record.situation}\n**Compromiso:** ${record.commitment}\n**Canales:** <#${record.textApealChannelId}> | 🔊 <#${record.voiceApealChannelId}>\n**Creado:** <t:${Math.floor(new Date(record.createdAt).getTime() / 1000)}:f>`,
                inline: false
            });
        } else if (type === "pardoned") {
            embed.addFields({
                name: `🔹 Indulto #${startIndex + index + 1}`,
                value: `**ID:** ${record.id}\n**Razón:** ${record.reason}\n**Staff Responsable:** <@${record.staffId}>\n**Fecha:** <t:${Math.floor(new Date(record.createdAt).getTime() / 1000)}:f>`,
                inline: false
            });
        }
    });

    await interaction.followUp({ embeds: [embed] });
};
