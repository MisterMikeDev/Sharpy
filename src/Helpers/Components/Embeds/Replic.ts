import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { Db } from "../../Db/Replic";
import { Emojis } from "../../../Data/Emojis";
import { ButtonsId } from "../../Enums";

export const ReplicEmbed = async (Sharpy: Sharpy, replicId: string) => {
    const replic = await Db.GetReplicById(Sharpy, replicId);

    let content = "";
    let embed = new EmbedBuilder();
    const components = [] as any;

    const { participants, winnerId, votes, replicStatus, currentTurn } = replic!;

    const transformVotes = votes.map((v) => ({
        vote: v.voteFor as 1 | 2 | 3 | 4,
        weight: v.weight
    }));

    const { bar: voteBar, percentages } = GetVoteBar({
        votes: transformVotes
    });

    /**
     * Replic Status
     * 0 - Esperando por participantes
     * 1 - Empezando
     *  Current Turn
     *  1 - Participante 1
     *  2 - Participante 2
     *  3 - Participante 3
     *  4 - Participante 4
     * 2 - Votación
     * 3 - Finalizado
     */

    if (replicStatus === 0) {
        const participantList = participants
            .map((p, i) => `\`${i + 1}.\` ${p ? `<@${p}>` : "Libre..."}`)
            .join("\n")
            .toString();
        const des =
            participants.filter((p) => p).length === 0
                ? "## Esperando por participantes"
                : `# Réplica\n\n### Participantes en espera:\n${participantList}`;

        content = "";
        embed = new EmbedBuilder().setDescription(des).setColor("#550000").setFooter({
            text: "Esperando por participantes",
            iconURL: Sharpy.user!.displayAvatarURL()
        });
        components.push(
            new ActionRowBuilder<ButtonBuilder>().addComponents([
                JoinReplic,
                ExitReplic,
                StartReplic
            ])
        );
    } else if (replicStatus === 1) {
        if (
            currentTurn === 1 ||
            currentTurn === 2 ||
            currentTurn === 3 ||
            currentTurn === 4
        ) {
            const participantIndex = currentTurn - 1;
            const participant = participants[participantIndex];

            const des = `# Replica\n\n### Lista de participantes:\n\n${participants
                .map((p, i) => {
                    const emojiForCurrentParticipant = "🔴";
                    return `\`${i + 1}.\` ${
                        p
                            ? replic!.currentTurn === i + 1
                                ? `<@${p}> ${emojiForCurrentParticipant}`
                                : `<@${p}>`
                            : "~~Nadie~~"
                    }`;
                })
                .join("\n")
                .toString()}`;

            content = `Es el turno de <@${participant}>`;
            embed = new EmbedBuilder().setDescription(des).setColor("#550000").setFooter({
                text: "Echoes of Talent | Réplica",
                iconURL: Sharpy.user!.displayAvatarURL()
            });
            components.push(
                new ActionRowBuilder<ButtonBuilder>().addComponents([NextTurnReplic])
            );
        }
    } else if (replicStatus === 2) {
        function GetParticipantName(index: number) {
            const participantId = participants[index];
            return participantId
                ? (Sharpy.users.resolve(participantId)?.username ?? "Nadie")
                : "Nadie";
        }

        const participantName1 = GetParticipantName(0);
        const participantName2 = GetParticipantName(1);
        const participantName3 = GetParticipantName(2);
        const participantName4 = GetParticipantName(3);

        const participantActive1 = Boolean(participants[0]);
        const participantActive2 = Boolean(participants[1]);
        const participantActive3 = Boolean(participants[2]);
        const participantActive4 = Boolean(participants[3]);

        content = "Votación en curso...\n*La votación terminará en 2 minuto.*";
        embed = new EmbedBuilder()
            .setTitle("Réplica")
            .setDescription(`Votación en curso...\n\n${voteBar}`)
            .setColor("#550000")
            .setFooter({
                text: "Echoes of Talent | Réplica",
                iconURL: Sharpy.user!.displayAvatarURL()
            });
        components.push(
            new ActionRowBuilder<ButtonBuilder>().addComponents([
                VoteFirtParticipant(participantName1, participantActive1),
                VoteSecondParticipant(participantName2, participantActive2),
                VoteThirdParticipant(participantName3, participantActive3),
                VoteFourthParticipant(participantName4, participantActive4)
            ])
        );
    } else if (replicStatus === 3) {
        if (winnerId) {
            const winner = participants.find((p) => p === winnerId);
            const winnerMsg = winner
                ? `<@${winner}>`
                : "**No se ha encontrado al ganador**";
            const winnerIndex = winner ? participants.indexOf(winner) : -1;
            const percentageWinner = winnerIndex !== -1 ? percentages[winnerIndex] : 0;
            const ifWinWithVotes =
                percentageWinner === 0
                    ? `# Réplica\n\nEl ganador de la réplica es ${winnerMsg} con un ${percentageWinner}% de los votos.\n\nMuchas felicidades!`
                    : `# Réplica\n\nEl ganador de la réplica es ${winnerMsg}\n\nMuchas felicidades!`;
            const description = winner ? ifWinWithVotes : "## No hay ganador.";

            content = `**Ganador:** ${winnerMsg}`;

            embed = new EmbedBuilder()
                .setDescription(description)
                .setColor("#550000")
                .setFooter({
                    text: "Gracias por participar",
                    iconURL: Sharpy.user!.displayAvatarURL()
                });
        } else {
            content = "No hay ganador.";
            embed = new EmbedBuilder()
                .setDescription(
                    "## No hay ganador.\n\nAl no haber participantes, se ha cancelado la réplica."
                )
                .setColor("#550000")
                .setFooter({
                    text: "Réplica cancelada",
                    iconURL: Sharpy.user!.displayAvatarURL()
                });
        }

        await Db.RemoveReplicById(Sharpy, replicId);
    }

    return { content, embed, components };
};

function GetVoteBar({ votes }: { votes: { vote: 1 | 2 | 3 | 4; weight: number }[] }): {
    bar: string;
    percentages: number[];
} {
    const PARTICIPANT_EMOJIS = ["🟥", "🟦", "🟩", "🟨"];
    const VOTE_BAR_LENGTH = 16;

    const voteCounts = [0, 0, 0, 0];

    votes.forEach((v) => {
        if (v.vote >= 1 && v.vote <= 4) {
            voteCounts[v.vote - 1] += v.weight;
        }
    });

    const totalVotes = voteCounts.reduce((acc, count) => acc + count, 0);

    const percentages = voteCounts.map((count) =>
        totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100)
    );

    const voteBars = percentages.map((percentage, index) => {
        const barLength = Math.round((percentage / 100) * VOTE_BAR_LENGTH);

        const bar =
            PARTICIPANT_EMOJIS[index].repeat(barLength) +
            "⬛".repeat(VOTE_BAR_LENGTH - barLength);

        return `${index + 1}. ${bar} (${percentage.toString().padStart(2, " ")}%)`;
    });

    const bar = `${voteBars.join("\n")}\n`;
    return { bar, percentages };
}

const JoinReplic = new ButtonBuilder()
    .setCustomId(ButtonsId.JoinReplic)
    .setLabel("Unirse a Réplica")
    .setEmoji("➕")
    .setStyle(ButtonStyle.Secondary);

const ExitReplic = new ButtonBuilder()
    .setCustomId(ButtonsId.ExitReplic)
    .setLabel("Salir de Réplica")
    .setEmoji("➖")
    .setStyle(ButtonStyle.Secondary);

const StartReplic = new ButtonBuilder()
    .setCustomId(ButtonsId.StartReplic)
    .setLabel("Empezar Réplica")
    .setEmoji(Emojis.Util.Allow)
    .setStyle(ButtonStyle.Primary);

const NextTurnReplic = new ButtonBuilder()
    .setCustomId(ButtonsId.NextTurnReplic)
    .setLabel("Finalizar Turno")
    .setEmoji("➡️")
    .setStyle(ButtonStyle.Secondary);

const VoteFirtParticipant = (name: string, active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.VoteFirstParticipant)
        .setLabel(`${name}`)
        .setEmoji("🟥")
        .setDisabled(!active)
        .setStyle(ButtonStyle.Secondary);

const VoteSecondParticipant = (name: string, active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.VoteSecondParticipant)
        .setLabel(`${name}`)
        .setDisabled(!active)
        .setEmoji("🟦")
        .setStyle(ButtonStyle.Secondary);

const VoteThirdParticipant = (name: string, active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.VoteThirdParticipant)
        .setLabel(`${name}`)
        .setDisabled(!active)
        .setEmoji("🟩")
        .setStyle(ButtonStyle.Secondary);

const VoteFourthParticipant = (name: string, active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.VoteFourthParticipant)
        .setLabel(`${name}`)
        .setDisabled(!active)
        .setEmoji("🟨")
        .setStyle(ButtonStyle.Secondary);
