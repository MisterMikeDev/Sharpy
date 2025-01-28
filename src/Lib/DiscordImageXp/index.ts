import { createCanvas, loadImage, SKRSContext2D } from "@napi-rs/canvas";
import fetch from "node-fetch";

type ProfileOptions = {
    avatarUrl: string; // URL del avatar del usuario
    backgroundUrl?: string; // Fondo personalizado opcional
    username: string; // Nombre del usuario
    currentXp: number; // XP actual del usuario
    requiredXp: number; // XP requerido para el siguiente nivel
    level: number; // Nivel actual del usuario
    mainColor?: `#${string}`; // Color principal opcional
};

export async function generateXpCard(options: ProfileOptions): Promise<Buffer> {
    const canvasWidth = 885;
    const canvasHeight = 303;
    const borderRadius = 25;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    // Cargar fondo
    if (options.backgroundUrl) {
        const background = await loadImage(options.backgroundUrl);
        const auxCanvas = createCanvas(canvasWidth, canvasHeight);
        const auxCtx = auxCanvas.getContext("2d");

        auxCtx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
        applyBlur(auxCtx, canvasWidth, canvasHeight, 10); // Aplicar desenfoque

        // Dibujar el fondo con esquinas redondeadas en el canvas principal
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(borderRadius, 0);
        ctx.lineTo(canvasWidth - borderRadius, 0);
        ctx.quadraticCurveTo(canvasWidth, 0, canvasWidth, borderRadius);
        ctx.lineTo(canvasWidth, canvasHeight - borderRadius);
        ctx.quadraticCurveTo(
            canvasWidth,
            canvasHeight,
            canvasWidth - borderRadius,
            canvasHeight
        );
        ctx.lineTo(borderRadius, canvasHeight);
        ctx.quadraticCurveTo(0, canvasHeight, 0, canvasHeight - borderRadius);
        ctx.lineTo(0, borderRadius);
        ctx.quadraticCurveTo(0, 0, borderRadius, 0);
        ctx.closePath();
        ctx.clip();

        ctx.globalAlpha = 0.8;
        ctx.drawImage(auxCanvas, 0, 0, canvasWidth, canvasHeight);
        ctx.globalAlpha = 1;
        ctx.restore();
    } else {
        ctx.fillStyle = "rgba(44, 47, 51, 0.8)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // Dibujar marco
    const borderColor = options.mainColor || "#7289da";
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 25;
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

    // Cargar avatar
    const avatar = await loadImage(await fetchImage(options.avatarUrl));
    const avatarSize = 200;
    const avatarX = 50;
    const avatarY = (canvasHeight - avatarSize) / 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2,
        0,
        Math.PI * 2
    );
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

    // Dibujar borde del avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2 + 10,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = `${hexToRgba(borderColor, 0.75)}`;
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    // Dibujar avatar redondeado
    ctx.save();
    ctx.beginPath();
    ctx.arc(
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2,
        0,
        Math.PI * 2
    );
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

    // Dibujar nombre y nivel
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px Helvetica";
    ctx.fillText(`${options.username}`, 280, 120);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px Helvetica";
    ctx.fillText(`Nivel: ${options.level}`, 280, 170);

    // Dibujar barra de experiencia
    const barWidth = 500;
    const barHeight = 40;
    const barX = 280;
    const barY = 200;
    const progress = options.currentXp / options.requiredXp;

    // Fondo de la barra
    ctx.fillStyle = "#444";
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Progreso de la barra
    const barColor = options.mainColor || "#7289da";
    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, barWidth * progress, barHeight);

    // Texto de progreso
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px Helvetica";
    const xpText = `${options.currentXp} / ${options.requiredXp} XP`;
    const textWidth = ctx.measureText(xpText).width;
    ctx.fillText(xpText, barX + (barWidth - textWidth) / 2, barY + barHeight - 10);

    return canvas.toBuffer("image/png");
}

function applyBlur(
    ctx: SKRSContext2D,
    width: number,
    height: number,
    blurRadius: number
) {
    ctx.filter = `blur(${blurRadius}px)`;
    ctx.drawImage(ctx.canvas, 0, 0, width, height);
    ctx.filter = "none";
}

async function fetchImage(url: string): Promise<Buffer> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    return response.buffer();
}

function hexToRgba(hex: string, alpha: number): string {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
