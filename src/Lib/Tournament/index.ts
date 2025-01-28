import { createCanvas, loadImage } from "@napi-rs/canvas";
import { User } from "discord.js";

type DuelTournament = {
    participant1: User;
    participant2: User;
    winner: 0 | 1 | 2;
};

type TournamentData = {
    preliminary: {
        duel1: DuelTournament;
        duel2: DuelTournament;
        duel3: DuelTournament;
        duel4: DuelTournament;
    };
    semifinal: {
        duel1: DuelTournament;
        duel2: DuelTournament;
    };
    final: {
        duel1: DuelTournament;
    };
    winner: User[];
};

export async function generateTournamentImage(data: TournamentData): Promise<Buffer> {
    const canvasWidth = 1280;
    const canvasHeight = 720;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    // Crear fondo
    ctx.fillStyle = "#f0f0f0"; // Color de fondo claro
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Variables para los círculos
    const radius = 60;
    const horizontalSpacing = 40;
    const rowSpacing = 170;
    const rows = [8, 4, 2, 1];

    let previousRowPositions: number[] = [];

    // Función para cargar la imagen del participante
    const loadParticipantImage = async (winner: 0 | 1 | 2, duel: DuelTournament) => {
        if (winner === 1) {
            return await loadImage(duel.participant1.displayAvatarURL());
        } else if (winner === 2) {
            return await loadImage(duel.participant2.displayAvatarURL());
        } else {
            // Color gris si no hay ganador
            const grayCircle = createCanvas(radius * 2, radius * 2);
            const grayCtx = grayCircle.getContext("2d");
            grayCtx.fillStyle = "#808080"; // Color gris
            grayCtx.beginPath();
            grayCtx.arc(radius, radius, radius, 0, Math.PI * 2);
            grayCtx.fill();
            return grayCircle;
        }
    };

    // Dibujar los círculos fila por fila
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const yPosition = rowSpacing * (rowIndex + 0.75);
        const currentRowPositions: number[] = [];

        if (rowIndex === 0) {
            // Primera fila: calcular posiciones iniciales
            const circlesInRow = rows[rowIndex];
            const totalCircleWidth =
                circlesInRow * radius * 2 + (circlesInRow - 1) * horizontalSpacing;
            const startX = (canvasWidth - totalCircleWidth) / 2 + radius;

            for (let i = 0; i < circlesInRow; i++) {
                const xPosition = startX + i * (radius * 2 + horizontalSpacing);
                currentRowPositions.push(xPosition);

                // Dibujar el círculo
                ctx.beginPath();
                ctx.arc(xPosition, yPosition, radius, 0, Math.PI * 2);
                ctx.fillStyle = "#0077ff";
                ctx.fill();
                ctx.closePath();

                // Dibujar el contorno
                ctx.lineWidth = 4;
                ctx.strokeStyle = "#000000";
                ctx.stroke();
            }
        } else {
            // Filas posteriores: calcular puntos medios entre pares consecutivos
            for (let i = 0; i < previousRowPositions.length - 1; i += 2) {
                const xPosition =
                    (previousRowPositions[i] + previousRowPositions[i + 1]) / 2;
                currentRowPositions.push(xPosition);

                // Dibujar el círculo
                ctx.beginPath();
                ctx.arc(xPosition, yPosition, radius, 0, Math.PI * 2);
                ctx.fillStyle = "#0077ff";
                ctx.fill();
                ctx.closePath();

                // Dibujar el contorno
                ctx.lineWidth = 4;
                ctx.strokeStyle = "#000000";
                ctx.stroke();
            }
        }

        // Cargar la imagen del ganador
        const duel = getDuelForRow(rowIndex, data);
        if (duel !== null) {
            const winner = duel.winner;
            const participantImage = await loadParticipantImage(winner, duel);

            // Ajustar la imagen dentro del círculo
            const imgX = currentRowPositions[0] - radius;
            const imgY = yPosition - radius;

            // Crear un recorte circular
            ctx.save();
            ctx.beginPath();
            ctx.arc(currentRowPositions[0], yPosition, radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            // Dibujar la imagen del participante
            ctx.drawImage(participantImage, imgX, imgY, radius * 2, radius * 2);

            // Restaurar el contexto
            ctx.restore();
        }

        previousRowPositions = currentRowPositions;
    }

    return canvas.toBuffer("image/png");
}

// Función para obtener el duelo basado en el rowIndex
function getDuelForRow(rowIndex: number, data: TournamentData): DuelTournament | null {
    switch (rowIndex) {
        case 0:
            return data.preliminary.duel1; // Puede ser cualquier duelo de la ronda preliminar
        case 1:
            return data.semifinal.duel1; // Primer duelo semifinal
        case 2:
            return data.final.duel1; // Último duelo
        default:
            return null;
    }
}
