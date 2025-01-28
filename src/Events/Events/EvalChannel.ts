import { EmbedBuilder, Message } from "discord.js";
import { Event } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";

export const event: Event = {
    name: "messageCreate",
    run: async (Sharpy, message: Message) => {
        const messageOutputId = "1318782983083135010";

        if (message.channel.id !== "1318718672977789050" || message.author.bot) return;

        if (
            message.channel.id === "1318718672977789050" &&
            message.author.id !== "437308398845952001"
        )
            return message.delete().catch(() => {});

        const code = message.content.trim();

        const context = {
            Sharpy,
            message,
            Emojis,
            EmbedBuilder
        };

        try {
            const result = await new Function(
                ...Object.keys(context),
                `"use strict"; return (async () => { return ${code}; })();`
            )(...Object.values(context));

            const embed = new EmbedBuilder()
                .setTitle("Eval:")
                .setDescription(`## Output:\n\`\`\`js\n${result}\`\`\``)
                .setColor("#2167f3")
                .setFields({
                    name: "Input:",
                    value: `\`\`\`js\n${code}\`\`\``
                })
                .setFooter({
                    text: `Eval por ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL()
                });

            const messageOutput = await message.channel.messages.fetch(messageOutputId);
            await messageOutput.edit({ embeds: [embed] });
            await message.delete().catch(() => {});
        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle("Eval:")
                .setDescription(`## Error:\n\`\`\`js\n${e}\`\`\``)
                .setColor("#FF0000")
                .setFields({
                    name: "Input:",
                    value: `\`\`\`js\n${code}\`\`\``
                })
                .setFooter({
                    text: `Eval por ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL()
                });

            const messageOutput = await message.channel.messages.fetch(messageOutputId);
            await messageOutput.edit({ embeds: [embed] });
            await message.delete().catch(() => {});
        }
    }
};
