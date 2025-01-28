import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { Duel } from "../../../Interfaces";
import { Sharpy } from "../../../Client";
import { Emojis } from "../../../Data/Emojis";
import { ButtonsId } from "../../Enums";

export const DuelEmbed = async (Sharpy: Sharpy, duel: Duel) => {
    const challenger = duel.challenger;
    const rival = duel.rival;
    const duelStatus = duel.currentTurn;
    let content = "";
    let embed = new EmbedBuilder();
    const components = [] as any;

    if (duelStatus === 0) {
        content = `${Emojis.Util.Loading} Esperando a que <@${rival?.id}> acepte el duelo...`;

        embed = new EmbedBuilder()
            .setTitle("🎤 Duelo de Karaoke 🎤")
            .setColor("#600604")
            .addFields(
                {
                    name: "Retador:",
                    value: `<@${challenger?.id || "N/A"}>`,
                    inline: true
                },
                { name: "Rival:", value: `<@${rival?.id || "N/A"}>`, inline: true }
            )
            .setFooter({
                iconURL: Sharpy.user?.displayAvatarURL(),
                text: "Esperando a que el rival acepte el duelo."
            });

        components.push(
            new ActionRowBuilder<ButtonBuilder>().addComponents([
                AcepetDuelButton,
                DeclineDuelButton
            ])
        );
    }
    if (duelStatus === 1) {
        content = "Esperando a que comience el duelo...";

        embed = new EmbedBuilder()
            .setTitle("🎤 Duelo de Karaoke 🎤")
            .setColor("#600604")
            .addFields(
                {
                    name: "Retador:",
                    value: `<@${challenger?.id || "N/A"}>`,
                    inline: true
                },
                { name: "Rival:", value: `<@${rival?.id || "N/A"}>`, inline: true }
            )
            .setFooter({
                iconURL: Sharpy.user?.displayAvatarURL(),
                text: "Esperando a que comience el duelo."
            });

        components.push(
            new ActionRowBuilder<ButtonBuilder>().addComponents([StartDuelButton])
        );
    }
    if (duelStatus === 2) {
        content = `Turno de <@${challenger?.id}> para cantar.`;

        embed = new EmbedBuilder()
            .setTitle("🎤 Duelo de Karaoke 🎤")
            .setColor("#600604")
            .addFields(
                {
                    name: "Retador:",
                    value: `<@${challenger?.id || "N/A"}>`,
                    inline: true
                },
                { name: "Rival:", value: `<@${rival?.id || "N/A"}>`, inline: true }
            );

        components.push(
            new ActionRowBuilder<ButtonBuilder>().addComponents([EndTurnButton])
        );
    }
    if (duelStatus === 3) {
        content = `Turno de <@${rival?.id}> para cantar.`;

        embed = new EmbedBuilder()
            .setTitle("🎤 Duelo de Karaoke 🎤")
            .setColor("#600604")
            .addFields(
                {
                    name: "Retador:",
                    value: `<@${challenger?.id || "N/A"}>`,
                    inline: true
                },
                { name: "Rival:", value: `<@${rival?.id || "N/A"}>`, inline: true }
            );

        components.push(
            new ActionRowBuilder<ButtonBuilder>().addComponents([EndTurnButton])
        );
    }
    if (duelStatus === 4) {
        const { voteBar, challengerPercentage, rivalPercentage } = GetVoteBar(duel);
        content = `${Emojis.Echo.CatShhh} Votación en proceso... ${Emojis.Echo.CatShhh}\nUsa los botones para votar por tu favorito.\n*(Recuerda que una vez votado no podrás cambiar tu voto)*`;

        embed = new EmbedBuilder()
            .setTitle("🎤 Duelo de Karaoke 🎤")
            .setColor("#600604")
            .addFields(
                {
                    name: "Retador:",
                    value: `<@${challenger?.id || "N/A"}>`,
                    inline: true
                },
                { name: "Rival:", value: `<@${rival?.id || "N/A"}>`, inline: true },
                {
                    name: "Progreso de Votaciones:",
                    value: `${voteBar}\n\n🎤 **${challengerPercentage ?? 0}%** - **${rivalPercentage ?? 0}%** 🎤`
                }
            )
            .setFooter({
                iconURL: Sharpy.user?.displayAvatarURL(),
                text: "Usa los botones para votar por tu favorito."
            });

        components.push(
            new ActionRowBuilder<ButtonBuilder>().addComponents([
                VoteButton("🟥", challenger?.username || ""),
                VoteButton("🟦", rival?.username || "")
            ])
        );
    }
    if (duelStatus === 5) {
        if (!challenger) {
            content = `🎉 El retador se ha retirado y <@${rival!.id}> gana el duelo. 🎉`;
            embed = new EmbedBuilder()
                .setTitle("🎤 Duelo de Karaoke 🎤")
                .setColor("#600604")
                .addFields(
                    { name: "Retador:", value: "N/A", inline: true },
                    {
                        name: "Rival:",
                        value: rival ? `<@${rival.id}>` : "N/A",
                        inline: true
                    }
                );
        } else if (!rival) {
            content = `🎉 El rival se ha retirado y <@${challenger!.id}> gana el duelo. 🎉`;
            embed = new EmbedBuilder()
                .setTitle("🎤 Duelo de Karaoke 🎤")
                .setColor("#600604")
                .addFields(
                    { name: "Retador:", value: `<@${challenger.id}>`, inline: true },
                    { name: "Rival:", value: "N/A", inline: true }
                );
        } else {
            const definitiveDuel = await Sharpy.SetDuelWinner(duel);
            if (!definitiveDuel.winner) {
                content = "🎉 ¡Empate! 🎉";
                embed = new EmbedBuilder()
                    .setTitle("🎤 Duelo de Karaoke 🎤")
                    .setColor("#600604")
                    .addFields(
                        { name: "Retador:", value: `<@${challenger.id}>`, inline: true },
                        { name: "Rival:", value: `<@${rival.id}>`, inline: true }
                    );
            } else {
                const { challengerPercentage, rivalPercentage } = GetVoteBar(duel);

                content = `🎉 ¡El ganador es <@${definitiveDuel.winner.id}> con el ${definitiveDuel.winner.id === challenger?.id ? challengerPercentage : rivalPercentage}% de los votos! 🎉`;
                embed = new EmbedBuilder()
                    .setTitle("🎤 Duelo de Karaoke 🎤")
                    .setColor("#600604")
                    .addFields(
                        { name: "Retador:", value: `<@${challenger.id}>`, inline: true },
                        { name: "Rival:", value: `<@${rival.id}>`, inline: true }
                    );
            }
        }
    }

    return {
        content,
        embed,
        components
    };
};

function GetVoteBar({ votes }: Duel) {
    const CHALLENGER_BAR_EMOJI = "🟥";
    const RIVAL_BAR_EMOJI = "🟦";
    const EMPTY_BAR_EMOJI = "⬛";
    const VOTE_BAR_LENGTH = 16;

    let challengerVotes = 0;
    let rivalVotes = 0;

    votes.forEach((v) => {
        if (v.vote === 1) challengerVotes += v.weight;
        if (v.vote === 2) rivalVotes += v.weight;
    });

    const totalVotes = challengerVotes + rivalVotes;

    if (totalVotes === 0) {
        return {
            voteBar: EMPTY_BAR_EMOJI.repeat(VOTE_BAR_LENGTH),
            challengerPercentage: 0,
            rivalPercentage: 0
        };
    }

    const challengerPercentage = Math.round((challengerVotes / totalVotes) * 100);
    const rivalPercentage = Math.round((rivalVotes / totalVotes) * 100);

    const challengerBars = Math.round((challengerPercentage / 100) * VOTE_BAR_LENGTH);
    const rivalBars = VOTE_BAR_LENGTH - challengerBars;

    const voteBar = `${CHALLENGER_BAR_EMOJI.repeat(challengerBars)}${RIVAL_BAR_EMOJI.repeat(rivalBars)}`;

    return { voteBar, challengerPercentage, rivalPercentage };
}

const AcepetDuelButton = new ButtonBuilder()
    .setCustomId(ButtonsId.AcceptDuel)
    .setLabel("Aceptar Duelo")
    .setStyle(ButtonStyle.Success);

const DeclineDuelButton = new ButtonBuilder()
    .setCustomId(ButtonsId.DeclineDuel)
    .setLabel("Rechazar Duelo")
    .setStyle(ButtonStyle.Danger);

const StartDuelButton = new ButtonBuilder()
    .setCustomId(ButtonsId.StartDuel)
    .setLabel("Iniciar Duelo")
    .setStyle(ButtonStyle.Success);

const EndTurnButton = new ButtonBuilder()
    .setCustomId(ButtonsId.EndTurn)
    .setLabel("Terminar Turno")
    .setStyle(ButtonStyle.Secondary);

const VoteButton = (emoji: string, username: string) => {
    const isChallenger = emoji === "🟥";
    const button = new ButtonBuilder();

    if (isChallenger) button.setCustomId(ButtonsId.VoteChallenger);
    else button.setCustomId(ButtonsId.VoteRival);

    if (isChallenger) button.setStyle(ButtonStyle.Danger);
    else button.setStyle(ButtonStyle.Primary);

    button.setEmoji(emoji);
    button.setLabel(username);

    return button;
};
